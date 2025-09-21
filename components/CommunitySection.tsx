'use client';

import { useState, useEffect } from 'react';
import { Users, TrendingUp, MessageCircle, Filter, Loader2 } from 'lucide-react';
import { IdeaCard } from './IdeaCard';
import { GeneratedIdea } from '@/lib/types';
import { getCommunityIdeas } from '@/lib/api';

// Mock data for demonstration
const mockCommunityIdeas: GeneratedIdea[] = [
  {
    ideaId: '1',
    userId: 'user1',
    title: 'AI-Powered Fitness Coach',
    description: 'A personalized fitness coaching app that uses AI to create custom workout plans based on user goals, available equipment, and physical limitations.',
    skillsRequired: ['Mobile Development', 'AI/ML', 'UI/UX Design'],
    marketTrendAnalysis: 'Fitness app market is growing at 14.7% CAGR. AI integration is a key differentiator.',
    marketViabilityScore: 78,
    businessModelCanvas: {
      valueProposition: 'Personalized AI fitness coaching accessible to everyone',
      customerSegments: ['Fitness enthusiasts', 'Busy professionals', 'Home workout users'],
      channels: ['App stores', 'Social media', 'Fitness influencers'],
      revenueStreams: ['Subscription fees', 'Premium features', 'Corporate wellness'],
      keyResources: ['AI algorithms', 'Fitness expertise', 'User data'],
      keyActivities: ['App development', 'AI training', 'Content creation'],
      keyPartnerships: ['Fitness equipment brands', 'Nutritionists', 'Gyms'],
      costStructure: ['Development costs', 'AI infrastructure', 'Marketing'],
    },
    goMarketStrategy: 'Launch with free tier, target fitness communities on social media',
    createdAt: new Date('2024-01-15'),
    votes: [
      { voteId: '1', ideaId: '1', userId: 'user2', voteType: 'up', createdAt: new Date() },
      { voteId: '2', ideaId: '1', userId: 'user3', voteType: 'up', createdAt: new Date() },
      { voteId: '3', ideaId: '1', userId: 'user4', voteType: 'up', createdAt: new Date() },
    ],
    comments: [
      { commentId: '1', ideaId: '1', userId: 'user2', content: 'Great idea! I would definitely use this.', createdAt: new Date() },
    ],
  },
  {
    ideaId: '2',
    userId: 'user2',
    title: 'Sustainable Food Delivery',
    description: 'A food delivery platform focused on local, sustainable restaurants with zero-waste packaging and carbon-neutral delivery.',
    skillsRequired: ['Backend Development', 'Operations', 'Marketing'],
    marketTrendAnalysis: 'Sustainable food market growing 8.5% annually. Consumer demand for eco-friendly options increasing.',
    marketViabilityScore: 65,
    businessModelCanvas: {
      valueProposition: 'Guilt-free food delivery with environmental impact tracking',
      customerSegments: ['Eco-conscious consumers', 'Urban millennials', 'Corporate catering'],
      channels: ['Mobile app', 'Website', 'Corporate partnerships'],
      revenueStreams: ['Delivery fees', 'Restaurant commissions', 'Subscription plans'],
      keyResources: ['Delivery network', 'Restaurant partnerships', 'Sustainable packaging'],
      keyActivities: ['Platform operations', 'Partnership management', 'Sustainability tracking'],
      keyPartnerships: ['Local restaurants', 'Packaging suppliers', 'Delivery drivers'],
      costStructure: ['Platform development', 'Delivery operations', 'Sustainable packaging'],
    },
    goMarketStrategy: 'Start in eco-conscious neighborhoods, partner with green restaurants',
    createdAt: new Date('2024-01-14'),
    votes: [
      { voteId: '4', ideaId: '2', userId: 'user1', voteType: 'up', createdAt: new Date() },
      { voteId: '5', ideaId: '2', userId: 'user3', voteType: 'up', createdAt: new Date() },
    ],
    comments: [],
  },
];

export function CommunitySection() {
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'viability'>('popular');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommunityIdeas();
  }, [sortBy]);

  const loadCommunityIdeas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCommunityIdeas(sortBy, 20);
      if (response.success && response.data) {
        setIdeas(response.data);
      } else {
        setError(response.error || 'Failed to load community ideas');
        // Fallback to mock data
        setIdeas([]);
      }
    } catch (err) {
      console.error('Error loading community ideas:', err);
      setError('Failed to load community ideas');
      setIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = (ideaId: string, voteType: 'up' | 'down') => {
    // Update local state optimistically
    setIdeas(prevIdeas =>
      prevIdeas.map(idea => {
        if (idea.ideaId === ideaId) {
          const existingVote = idea.votes.find(v => v.userId === 'current-user');
          let newVotes = [...idea.votes];

          if (existingVote) {
            // Update existing vote
            if (existingVote.voteType === voteType) {
              // Remove vote if same type
              newVotes = newVotes.filter(v => v.userId !== 'current-user');
            } else {
              // Change vote type
              newVotes = newVotes.map(v =>
                v.userId === 'current-user' ? { ...v, voteType } : v
              );
            }
          } else {
            // Add new vote
            newVotes.push({
              voteId: `temp-${Date.now()}`,
              ideaId,
              userId: 'current-user',
              voteType,
              createdAt: new Date(),
            });
          }

          return { ...idea, votes: newVotes };
        }
        return idea;
      })
    );
  };



  return (
    <section id="community" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Community Ideas
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Discover and validate startup ideas from our community of builders.
          Vote, comment, and collaborate on the next big thing.
        </p>
      </div>

      {/* Stats */}
      <div className="glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-accent/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">2.5K</div>
              <div className="text-white/60">Active Members</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-primary/20 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-white/60">Ideas Shared</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-green-500/20 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">25K</div>
              <div className="text-white/60">Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-white/60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field"
            >
              <option value="popular" className="bg-gray-800">Most Popular</option>
              <option value="recent" className="bg-gray-800">Most Recent</option>
              <option value="viability" className="bg-gray-800">Highest Viability</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-white/60 text-sm">
              Showing {ideas.length} ideas
            </span>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-white/60">Loading community ideas...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={loadCommunityIdeas}
            className="btn-secondary"
          >
            Try Again
          </button>
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <div className="text-white/60">No community ideas found yet.</div>
          <div className="text-white/40 text-sm">Be the first to generate and share an idea!</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.ideaId} idea={idea} onVote={handleVote} />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="btn-secondary">
          Load More Ideas
        </button>
      </div>
    </section>
  );
}
