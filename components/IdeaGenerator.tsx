'use client';

import { useState } from 'react';
import { Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { ProfileForm } from './ProfileForm';
import { IdeaCard } from './IdeaCard';
import { generateIdeas } from '@/lib/api';
import { GeneratedIdea, UserProfile } from '@/lib/types';

export function IdeaGenerator() {
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    interests: [],
    capitalRange: '',
  });
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleGenerateIdeas = async () => {
    if (profile.skills.length === 0 || profile.interests.length === 0 || !profile.capitalRange) {
      alert('Please complete your profile first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateIdeas({ profile });
      if (response.success && response.data) {
        setIdeas(response.data);
        setShowForm(false);
      } else {
        alert(response.error || 'Failed to generate ideas');
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      alert('Failed to generate ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generate" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Generate Your Ideas
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Tell us about your skills, interests, and budget to get personalized
          startup ideas powered by AI.
        </p>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto">
          <ProfileForm
            profile={profile}
            onProfileChange={setProfile}
          />
          
          <div className="text-center mt-8">
            <button
              onClick={handleGenerateIdeas}
              disabled={isGenerating}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating Ideas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Ideas</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Toggle to show form again */}
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="btn-secondary flex items-center space-x-2 mx-auto"
            >
              <ChevronDown className="h-4 w-4" />
              <span>Modify Profile</span>
            </button>
          </div>

          {/* Generated Ideas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea.ideaId} idea={idea} />
            ))}
          </div>

          {/* Generate More Button */}
          <div className="text-center">
            <button
              onClick={handleGenerateIdeas}
              disabled={isGenerating}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating More Ideas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate More Ideas</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
