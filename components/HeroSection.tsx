'use client';

import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
          Ignite Your Next
          <span className="text-accent block">Big Idea</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          AI-powered startup idea generation and validation platform that turns
          your skills and interests into actionable business opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Generate Ideas</span>
          </button>
          <button className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Join Community</span>
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="glass-card p-6 text-center animate-fade-in">
          <div className="bg-accent/20 p-3 rounded-full w-fit mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Personalized Ideas
          </h3>
          <p className="text-white/70">
            AI generates startup ideas tailored to your unique skills,
            interests, and capital constraints.
          </p>
        </div>

        <div className="glass-card p-6 text-center animate-fade-in">
          <div className="bg-accent/20 p-3 rounded-full w-fit mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Market Viability
          </h3>
          <p className="text-white/70">
            Real-time market analysis and viability scoring to validate your
            ideas before you invest time and resources.
          </p>
        </div>

        <div className="glass-card p-6 text-center animate-fade-in">
          <div className="bg-accent/20 p-3 rounded-full w-fit mx-auto mb-4">
            <Users className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Community Validation
          </h3>
          <p className="text-white/70">
            Get feedback from a community of builders and validate your ideas
            with real users.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="glass-card p-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-accent mb-2">10K+</div>
            <div className="text-white/70">Ideas Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">2.5K</div>
            <div className="text-white/70">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">85%</div>
            <div className="text-white/70">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <div className="text-white/70">Launched Startups</div>
          </div>
        </div>
      </div>
    </section>
  );
}
