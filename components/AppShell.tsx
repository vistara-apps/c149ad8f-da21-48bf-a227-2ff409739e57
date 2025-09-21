'use client';

import { useState } from 'react';
import { Lightbulb, Menu, X, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass-card m-4 mb-0 rounded-b-none md:rounded-b-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-accent p-2 rounded-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">IdeaSpark AI</h1>
                <p className="text-sm text-white/70 hidden sm:block">
                  Ignite Your Next Big Idea
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#generate"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Generate Ideas
              </a>
              <a
                href="#community"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Community
              </a>
              <a
                href="#pricing"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Pricing
              </a>
              <button className="btn-secondary flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              'md:hidden mt-4 space-y-2 transition-all duration-200',
              isMobileMenuOpen ? 'block' : 'hidden'
            )}
          >
            <a
              href="#generate"
              className="block text-white/80 hover:text-white py-2 px-4 rounded-md hover:bg-white/10 transition-colors duration-200"
            >
              Generate Ideas
            </a>
            <a
              href="#community"
              className="block text-white/80 hover:text-white py-2 px-4 rounded-md hover:bg-white/10 transition-colors duration-200"
            >
              Community
            </a>
            <a
              href="#pricing"
              className="block text-white/80 hover:text-white py-2 px-4 rounded-md hover:bg-white/10 transition-colors duration-200"
            >
              Pricing
            </a>
            <button className="w-full text-left text-white/80 hover:text-white py-2 px-4 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-card m-4 mt-8 rounded-t-none md:rounded-t-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white/60">
            <p>&copy; 2024 IdeaSpark AI. Built on Base.</p>
            <p className="text-sm mt-2">
              Empowering entrepreneurs with AI-driven insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
