'use client';

import { useState } from 'react';
import { Users, TrendingUp, MessageCircle, Filter } from 'lucide-react';
import { IdeaCard } from './IdeaCard';
import { GeneratedIdea } from '@/lib/types';

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
  const [ideas] = useState<GeneratedIdea[]>(mockCommunityIdeas);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'viability'>('popular');
  const [filterBy, setFilterBy] = useState<string>('all');

  const sortedIdeas = [...ideas].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        const aVotes = (a.votes?.filter(v => v.voteType === 'up').length || 0) - 
                      (a.votes?.filter(v => v.voteType === 'down').length || 0);
        const bVotes = (b.votes?.filter(v => v.voteType === 'up').length || 0) - 
                      (b.votes?.filter(v => v.voteType === 'down').length || 0);
        return bVotes - aVotes;
      case 'viability':
        return b.marketViabilityScore - a.marketViabilityScore;
      default:
        return 0;
    }
  });

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
              Showing {sortedIdeas.length} ideas
            </span>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedIdeas.map((idea) => (
          <IdeaCard key={idea.ideaId} idea={idea} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="btn-secondary">
          Load More Ideas
        </button>
      </div>
    </section>
  );
}
