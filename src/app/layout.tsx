import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import AppProviders from '@/providers/AppProviders';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'LexAI — AI Legal Assistant for India',
  description:
    'AI-powered legal research, contract drafting, compliance analysis, and case analysis for Indian law. Built for advocates, businesses, and law students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-bg-primary text-text-primary">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
