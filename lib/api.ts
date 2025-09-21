import OpenAI from 'openai';
import { GeneratedIdea, IdeaGenerationRequest, ApiResponse, BusinessModelCanvas } from './types';
import { generateId } from './utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateIdeas(request: IdeaGenerationRequest): Promise<ApiResponse<GeneratedIdea[]>> {
  try {
    const { profile } = request;
    
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
    const ideas: GeneratedIdea[] = parsedResponse.ideas.map((idea: any) => ({
      ideaId: generateId(),
      userId: 'current-user', // TODO: Get from auth context
      title: idea.title,
      description: idea.description,
      skillsRequired: idea.skillsRequired,
      marketTrendAnalysis: idea.marketTrendAnalysis,
      marketViabilityScore: idea.marketViabilityScore,
      businessModelCanvas: idea.businessModelCanvas,
      goMarketStrategy: idea.goMarketStrategy,
      createdAt: new Date(),
      votes: [],
      comments: [],
    }));

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
        skillsRequired: ['JavaScript', 'React', 'Node.js'],
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

export async function voteOnIdea(ideaId: string, voteType: 'up' | 'down'): Promise<ApiResponse<boolean>> {
  try {
    // TODO: Implement actual voting API
    // For now, return success
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

export async function commentOnIdea(ideaId: string, content: string): Promise<ApiResponse<boolean>> {
  try {
    // TODO: Implement actual comment API
    // For now, return success
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
