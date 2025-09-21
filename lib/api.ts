import OpenAI from 'openai';
import { GeneratedIdea, IdeaGenerationRequest, ApiResponse, BusinessModelCanvas, UserProfile } from './types';
import { generateId } from './utils';
import { prisma } from './db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateIdeas(request: IdeaGenerationRequest): Promise<ApiResponse<GeneratedIdea[]>> {
  try {
    const { profile } = request;

    // Create or update user profile
    const user = await prisma.user.upsert({
      where: { userId: 'current-user' }, // TODO: Use actual user ID from auth
      update: {
        skills: JSON.stringify(profile.skills),
        interests: JSON.stringify(profile.interests),
        capitalRange: profile.capitalRange,
      },
      create: {
        userId: 'current-user', // TODO: Use actual user ID from auth
        skills: JSON.stringify(profile.skills),
        interests: JSON.stringify(profile.interests),
        capitalRange: profile.capitalRange,
      },
    });
    
    const prompt = `
You are an expert startup advisor and market analyst. Generate 3 unique, actionable startup ideas based on the following user profile:

Skills: ${profile.skills.join(', ')}
Interests: ${profile.interests.join(', ')}
Capital Range: ${profile.capitalRange}

For each idea, provide:
1. A compelling title (max 60 characters)
2. A detailed description (200-300 words)
3. Required skills from the user's skillset
4. Market trend analysis (100-150 words)
5. Market viability score (0-100)
6. Business model canvas components
7. Go-to-market strategy (100-150 words)

Focus on ideas that:
- Leverage the user's existing skills
- Align with their interests
- Are feasible within their capital constraints
- Have genuine market potential
- Can be started as a lean startup

Format your response as a JSON array of ideas with the following structure:
{
  "ideas": [
    {
      "title": "Idea Title",
      "description": "Detailed description...",
      "skillsRequired": ["skill1", "skill2"],
      "marketTrendAnalysis": "Market analysis...",
      "marketViabilityScore": 75,
      "businessModelCanvas": {
        "valueProposition": "Value prop...",
        "customerSegments": ["segment1", "segment2"],
        "channels": ["channel1", "channel2"],
        "revenueStreams": ["stream1", "stream2"],
        "keyResources": ["resource1", "resource2"],
        "keyActivities": ["activity1", "activity2"],
        "keyPartnerships": ["partner1", "partner2"],
        "costStructure": ["cost1", "cost2"]
      },
      "goMarketStrategy": "GTM strategy..."
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are an expert startup advisor who generates personalized, actionable business ideas based on user profiles. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(response);
    const ideas: GeneratedIdea[] = [];

    // Save ideas to database
    for (const idea of parsedResponse.ideas) {
      const savedIdea = await prisma.generatedIdea.create({
        data: {
          userId: user.userId,
          title: idea.title,
          description: idea.description,
          skillsRequired: JSON.stringify(idea.skillsRequired),
          marketTrendAnalysis: idea.marketTrendAnalysis,
          marketViabilityScore: idea.marketViabilityScore,
          businessModelCanvas: JSON.stringify(idea.businessModelCanvas),
          goMarketStrategy: idea.goMarketStrategy,
        },
        include: {
          votes: true,
          comments: true,
        },
      });

      ideas.push({
        ideaId: savedIdea.ideaId,
        userId: savedIdea.userId,
        title: savedIdea.title,
        description: savedIdea.description,
        skillsRequired: JSON.parse(savedIdea.skillsRequired),
        marketTrendAnalysis: savedIdea.marketTrendAnalysis,
        marketViabilityScore: savedIdea.marketViabilityScore,
        businessModelCanvas: JSON.parse(savedIdea.businessModelCanvas),
        goMarketStrategy: savedIdea.goMarketStrategy,
        createdAt: savedIdea.createdAt,
        votes: savedIdea.votes.map(vote => ({
          voteId: vote.voteId,
          ideaId: vote.ideaId,
          userId: vote.userId,
          voteType: vote.voteType as 'up' | 'down',
          createdAt: vote.createdAt,
        })),
        comments: savedIdea.comments.map(comment => ({
          commentId: comment.commentId,
          ideaId: comment.ideaId,
          userId: comment.userId,
          content: comment.content,
          createdAt: comment.createdAt,
        })),
      });
    }

    return {
      data: ideas,
      success: true,
      message: 'Ideas generated successfully',
    };
  } catch (error) {
    console.error('Error generating ideas:', error);
    
    // Fallback to mock data if API fails
    const mockIdeas: GeneratedIdea[] = [
      {
        ideaId: generateId(),
        userId: 'current-user',
        title: 'AI-Powered Code Review Assistant',
        description: 'A developer tool that uses AI to automatically review code, suggest improvements, and catch potential bugs before they reach production. Integrates with popular IDEs and version control systems.',
        skillsRequired: profile.skills.slice(0, 3),
        marketTrendAnalysis: 'The developer tools market is growing rapidly with increasing demand for AI-powered solutions. Code quality and security are top priorities for development teams.',
        marketViabilityScore: 82,
        businessModelCanvas: {
          valueProposition: 'Automated code review that improves code quality and reduces bugs',
          customerSegments: ['Software development teams', 'Individual developers', 'Tech companies'],
          channels: ['Developer communities', 'IDE marketplaces', 'Direct sales'],
          revenueStreams: ['Subscription fees', 'Enterprise licenses', 'API usage'],
          keyResources: ['AI models', 'Development team', 'Integration partnerships'],
          keyActivities: ['AI model training', 'Product development', 'Customer support'],
          keyPartnerships: ['IDE providers', 'Version control platforms', 'Cloud providers'],
          costStructure: ['AI infrastructure', 'Development costs', 'Sales and marketing'],
        },
        goMarketStrategy: 'Start with open-source version to build community, then offer premium features for teams and enterprises.',
        createdAt: new Date(),
        votes: [],
        comments: [],
      },
    ];

    return {
      data: mockIdeas,
      success: true,
      message: 'Generated fallback ideas (API unavailable)',
    };
  }
}

export async function voteOnIdea(ideaId: string, voteType: 'up' | 'down', userId: string = 'current-user'): Promise<ApiResponse<boolean>> {
  try {
    // Check if user already voted on this idea
    const existingVote = await prisma.communityVote.findUnique({
      where: {
        ideaId_userId: {
          ideaId,
          userId,
        },
      },
    });

    if (existingVote) {
      // Update existing vote
      await prisma.communityVote.update({
        where: { voteId: existingVote.voteId },
        data: { voteType },
      });
    } else {
      // Create new vote
      await prisma.communityVote.create({
        data: {
          ideaId,
          userId,
          voteType,
        },
      });
    }

    return {
      data: true,
      success: true,
      message: 'Vote recorded successfully',
    };
  } catch (error) {
    console.error('Error voting on idea:', error);
    return {
      data: false,
      success: false,
      error: 'Failed to record vote',
    };
  }
}

export async function commentOnIdea(ideaId: string, content: string, userId: string = 'current-user'): Promise<ApiResponse<boolean>> {
  try {
    await prisma.comment.create({
      data: {
        ideaId,
        userId,
        content,
      },
    });

    return {
      data: true,
      success: true,
      message: 'Comment added successfully',
    };
  } catch (error) {
    console.error('Error commenting on idea:', error);
    return {
      data: false,
      success: false,
      error: 'Failed to add comment',
    };
  }
}

export async function getCommunityIdeas(sortBy: 'recent' | 'popular' | 'viability' = 'popular', limit: number = 20): Promise<ApiResponse<GeneratedIdea[]>> {
  try {
    let orderBy: any = { createdAt: 'desc' };

    switch (sortBy) {
      case 'recent':
        orderBy = { createdAt: 'desc' };
        break;
      case 'popular':
        // This is complex to do in Prisma, so we'll sort in memory for now
        break;
      case 'viability':
        orderBy = { marketViabilityScore: 'desc' };
        break;
    }

    const ideas = await prisma.generatedIdea.findMany({
      take: limit,
      orderBy,
      include: {
        votes: true,
        comments: true,
        user: true,
      },
    });

    // Sort by popularity if requested (upvotes - downvotes)
    if (sortBy === 'popular') {
      ideas.sort((a, b) => {
        const aScore = a.votes.filter(v => v.voteType === 'up').length - a.votes.filter(v => v.voteType === 'down').length;
        const bScore = b.votes.filter(v => v.voteType === 'up').length - b.votes.filter(v => v.voteType === 'down').length;
        return bScore - aScore;
      });
    }

    const formattedIdeas: GeneratedIdea[] = ideas.map(idea => ({
      ideaId: idea.ideaId,
      userId: idea.userId,
      title: idea.title,
      description: idea.description,
      skillsRequired: JSON.parse(idea.skillsRequired),
      marketTrendAnalysis: idea.marketTrendAnalysis,
      marketViabilityScore: idea.marketViabilityScore,
      businessModelCanvas: JSON.parse(idea.businessModelCanvas),
      goMarketStrategy: idea.goMarketStrategy,
      createdAt: idea.createdAt,
      votes: idea.votes.map(vote => ({
        voteId: vote.voteId,
        ideaId: vote.ideaId,
        userId: vote.userId,
        voteType: vote.voteType as 'up' | 'down',
        createdAt: vote.createdAt,
      })),
      comments: idea.comments.map(comment => ({
        commentId: comment.commentId,
        ideaId: comment.ideaId,
        userId: comment.userId,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    }));

    return {
      data: formattedIdeas,
      success: true,
      message: 'Community ideas retrieved successfully',
    };
  } catch (error) {
    console.error('Error getting community ideas:', error);
    return {
      data: [],
      success: false,
      error: 'Failed to retrieve community ideas',
    };
  }
}
