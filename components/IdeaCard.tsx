'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Users,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  DollarSign
} from 'lucide-react';
import { GeneratedIdea } from '@/lib/types';
import { calculateViabilityColor, formatDate, truncateText } from '@/lib/utils';
import { VoteButton } from './VoteButton';

interface IdeaCardProps {
  idea: GeneratedIdea;
  variant?: 'default' | 'compact';
  onVote?: (ideaId: string, voteType: 'up' | 'down') => void;
}

export function IdeaCard({ idea, variant = 'default', onVote }: IdeaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBusinessModel, setShowBusinessModel] = useState(false);

  const upvotes = idea.votes?.filter(vote => vote.voteType === 'up').length || 0;
  const downvotes = idea.votes?.filter(vote => vote.voteType === 'down').length || 0;
  const totalVotes = upvotes + downvotes;
  const voteRatio = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;

  if (variant === 'compact') {
    return (
      <div className="glass-card p-4 hover:bg-white/15 transition-colors duration-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{idea.title}</h3>
          <div className={`text-sm font-bold ${calculateViabilityColor(idea.marketViabilityScore)}`}>
            {idea.marketViabilityScore}%
          </div>
        </div>
        <p className="text-white/70 text-sm mb-3">
          {truncateText(idea.description, 120)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{upvotes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{idea.comments?.length || 0}</span>
            </span>
          </div>
          <span className="text-xs text-white/50">
            {formatDate(idea.createdAt)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <span>Generated {formatDate(idea.createdAt)}</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className={calculateViabilityColor(idea.marketViabilityScore)}>
                {idea.marketViabilityScore}% viable
              </span>
            </div>
          </div>
        </div>
        <div className="bg-accent/20 p-2 rounded-lg">
          <Lightbulb className="h-6 w-6 text-accent" />
        </div>
      </div>

      {/* Description */}
      <p className="text-white/80 mb-4 leading-relaxed">
        {isExpanded ? idea.description : truncateText(idea.description, 200)}
        {idea.description.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent hover:text-accent/80 ml-2"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>

      {/* Skills Required */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Target className="h-4 w-4" />
          <span>Skills Required</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {idea.skillsRequired.map((skill) => (
            <span
              key={skill}
              className="bg-accent/20 text-accent px-2 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Market Analysis */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">Market Analysis</h4>
        <p className="text-white/70 text-sm">
          {truncateText(idea.marketTrendAnalysis, 150)}
        </p>
      </div>

      {/* Business Model Toggle */}
      <button
        onClick={() => setShowBusinessModel(!showBusinessModel)}
        className="w-full mb-4 p-3 bg-white/5 hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center justify-between"
      >
        <span className="text-white font-medium flex items-center space-x-2">
          <DollarSign className="h-4 w-4" />
          <span>Business Model Canvas</span>
        </span>
        {showBusinessModel ? (
          <ChevronUp className="h-4 w-4 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" />
        )}
      </button>

      {/* Business Model Details */}
      {showBusinessModel && (
        <div className="mb-4 p-4 bg-white/5 rounded-md space-y-3">
          <div>
            <h5 className="text-white font-medium mb-1">Value Proposition</h5>
            <p className="text-white/70 text-sm">{idea.businessModelCanvas.valueProposition}</p>
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Customer Segments</h5>
            <div className="flex flex-wrap gap-1">
              {idea.businessModelCanvas.customerSegments.map((segment, index) => (
                <span key={index} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                  {segment}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Revenue Streams</h5>
            <div className="flex flex-wrap gap-1">
              {idea.businessModelCanvas.revenueStreams.map((stream, index) => (
                <span key={index} className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                  {stream}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voting and Comments */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <VoteButton
            ideaId={idea.ideaId}
            voteType="up"
            count={upvotes}
            isActive={false} // TODO: Implement user vote tracking
            onVote={onVote}
          />
          <VoteButton
            ideaId={idea.ideaId}
            voteType="down"
            count={downvotes}
            isActive={false} // TODO: Implement user vote tracking
            onVote={onVote}
          />
          <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-200">
            <MessageCircle className="h-4 w-4" />
            <span>{idea.comments?.length || 0}</span>
          </button>
        </div>

        {/* Vote Ratio Bar */}
        {totalVotes > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{ width: `${voteRatio}%` }}
              />
            </div>
            <span className="text-xs text-white/60">{Math.round(voteRatio)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
