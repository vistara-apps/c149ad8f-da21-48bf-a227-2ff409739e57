'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { SKILL_OPTIONS, INTEREST_OPTIONS, CAPITAL_RANGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProfileFormProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

export function ProfileForm({ profile, onProfileChange }: ProfileFormProps) {
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      onProfileChange({
        ...profile,
        skills: [...profile.skills, skill],
      });
    }
    setSkillInput('');
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skillToRemove: string) => {
    onProfileChange({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      onProfileChange({
        ...profile,
        interests: [...profile.interests, interest],
      });
    }
    setInterestInput('');
    setShowInterestSuggestions(false);
  };

  const removeInterest = (interestToRemove: string) => {
    onProfileChange({
      ...profile,
      interests: profile.interests.filter(interest => interest !== interestToRemove),
    });
  };

  const filteredSkills = SKILL_OPTIONS.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !profile.skills.includes(skill)
  );

  const filteredInterests = INTEREST_OPTIONS.filter(interest =>
    interest.toLowerCase().includes(interestInput.toLowerCase()) &&
    !profile.interests.includes(interest)
  );

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Build Your Profile</h3>
      
      <div className="space-y-6">
        {/* Skills Section */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Your Skills
          </label>
          
          {/* Selected Skills */}
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-accent/30 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Skill Input */}
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onFocus={() => setShowSkillSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
              placeholder="Type or select your skills..."
              className="input-field w-full"
            />
            
            {/* Skill Suggestions */}
            {showSkillSuggestions && filteredSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md max-h-48 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Custom Skill */}
          {skillInput && !SKILL_OPTIONS.includes(skillInput) && (
            <button
              onClick={() => addSkill(skillInput)}
              className="mt-2 text-accent hover:text-accent/80 text-sm flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add "{skillInput}" as custom skill</span>
            </button>
          )}
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Your Interests
          </label>
          
          {/* Selected Interests */}
          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => removeInterest(interest)}
                    className="hover:bg-primary/30 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Interest Input */}
          <div className="relative">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onFocus={() => setShowInterestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowInterestSuggestions(false), 200)}
              placeholder="Type or select your interests..."
              className="input-field w-full"
            />
            
            {/* Interest Suggestions */}
            {showInterestSuggestions && filteredInterests.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md max-h-48 overflow-y-auto">
                {filteredInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => addInterest(interest)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Custom Interest */}
          {interestInput && !INTEREST_OPTIONS.includes(interestInput) && (
            <button
              onClick={() => addInterest(interestInput)}
              className="mt-2 text-primary hover:text-primary/80 text-sm flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add "{interestInput}" as custom interest</span>
            </button>
          )}
        </div>

        {/* Capital Range Section */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Available Capital
          </label>
          <select
            value={profile.capitalRange}
            onChange={(e) => onProfileChange({ ...profile, capitalRange: e.target.value })}
            className="input-field w-full"
          >
            <option value="">Select your budget range...</option>
            {CAPITAL_RANGES.map((range) => (
              <option key={range} value={range} className="bg-gray-800">
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Profile Completion Indicator */}
      <div className="mt-6 p-4 bg-white/5 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Profile Completion</span>
          <span className="text-accent">
            {Math.round(
              ((profile.skills.length > 0 ? 1 : 0) +
                (profile.interests.length > 0 ? 1 : 0) +
                (profile.capitalRange ? 1 : 0)) / 3 * 100
            )}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.round(
                ((profile.skills.length > 0 ? 1 : 0) +
                  (profile.interests.length > 0 ? 1 : 0) +
                  (profile.capitalRange ? 1 : 0)) / 3 * 100
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
