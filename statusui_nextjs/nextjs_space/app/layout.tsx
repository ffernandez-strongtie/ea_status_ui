import type { Metadata } from 'next';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'SuperAdmin StatusUI',
  description: 'Simpson Strong-Tie Engineering Status Service',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'SuperAdmin StatusUI',
    description: 'Simpson Strong-Tie Engineering Status Service',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
        <style dangerouslySetInnerHTML={{ __html: '[data-hydration-error] { display: none !important; }' }} />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
