export interface User {
  userId: string;
  farcasterId?: string;
  skills: string[];
  interests: string[];
  capitalRange: string;
  premiumStatus: boolean;
  createdAt: Date;
}

export interface GeneratedIdea {
  ideaId: string;
  userId: string;
  title: string;
  description: string;
  skillsRequired: string[];
  marketTrendAnalysis: string;
  marketViabilityScore: number;
  businessModelCanvas: BusinessModelCanvas;
  goMarketStrategy: string;
  createdAt: Date;
  votes: CommunityVote[];
  comments: Comment[];
}

export interface BusinessModelCanvas {
  valueProposition: string;
  customerSegments: string[];
  channels: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartnerships: string[];
  costStructure: string[];
}

export interface CommunityVote {
  voteId: string;
  ideaId: string;
  userId: string;
  voteType: 'up' | 'down';
  createdAt: Date;
}

export interface Comment {
  commentId: string;
  ideaId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface UserProfile {
  skills: string[];
  interests: string[];
  capitalRange: string;
}

export interface IdeaGenerationRequest {
  profile: UserProfile;
  previousIdeas?: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
