import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
  title: 'LexAI - Legal Intelligence',
  description: 'AI Legal Assistant for India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0..1,0,24&display=block"
          rel="stylesheet"
        />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
      </head>
      <body
        className="bg-bg-primary text-text-primary flex min-h-full flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
