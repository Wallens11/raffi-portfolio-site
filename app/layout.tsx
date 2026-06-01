import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getSiteUrl, siteDescription, siteName, siteTitle } from '@/lib/site-config'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-code',
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteTitle,
    template: '%s | Raffi',
  },
  description: siteDescription,
  keywords: ['software engineer', 'internal tools', 'workflow automation', 'AI operations', 'system integrations'],
  authors: [{ name: 'Raffi' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Raffi portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/twitter-image'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
