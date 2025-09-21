'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonProps {
  ideaId: string;
  voteType: 'up' | 'down';
  count: number;
  isActive: boolean;
  onVote?: (ideaId: string, voteType: 'up' | 'down') => void;
}

export function VoteButton({ 
  ideaId, 
  voteType, 
  count, 
  isActive, 
  onVote 
}: VoteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual voting API call
      onVote?.(ideaId, voteType);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = voteType === 'up' ? ThumbsUp : ThumbsDown;
  const activeColor = voteType === 'up' ? 'text-green-400' : 'text-red-400';
  const hoverColor = voteType === 'up' ? 'hover:text-green-400' : 'hover:text-red-400';

  return (
    <button
      onClick={handleVote}
      disabled={isLoading}
      className={cn(
        'flex items-center space-x-2 transition-colors duration-200 disabled:opacity-50',
        isActive ? activeColor : 'text-white/60',
        !isActive && hoverColor
      )}
    >
      <Icon className={cn(
        'h-4 w-4',
        isLoading && 'animate-pulse'
      )} />
      <span className="text-sm">{count}</span>
    </button>
  );
}
