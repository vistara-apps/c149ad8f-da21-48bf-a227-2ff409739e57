import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeaSpark AI - Ignite Your Next Big Idea',
  description: 'AI-powered startup idea generation and validation platform on Base',
  keywords: ['startup', 'ideas', 'AI', 'validation', 'Base', 'blockchain'],
  authors: [{ name: 'IdeaSpark AI' }],
  openGraph: {
    title: 'IdeaSpark AI',
    description: 'Ignite Your Next Big Idea with AI-Powered Curation & Validation',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
