import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-continuity.vercel.app'
const siteName = 'The Continuity'
const siteDescription = 'A Global Collaborative Novel - Join thousands of writers worldwide in creating an ever-evolving story. Write the next sentence and become part of literary history.'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#d4af37',
}

export const metadata: Metadata = {
    title: {
        default: siteName,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
        'collaborative writing',
        'global novel',
        'creative writing',
        'storytelling',
        'community writing',
        'collaborative storytelling',
        'online writing',
        'shared story',
        'collective narrative',
        'multilingual story',
    ],
    authors: [{ name: 'The Continuity Community' }],
    creator: 'The Continuity',
    publisher: 'The Continuity',
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
        languages: {
            'en': '/en',
            'ko': '/ko',
            'es': '/es',
            'fr': '/fr',
            'de': '/de',
            'ja': '/ja',
            'zh': '/zh',
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: siteName,
        title: siteName,
        description: siteDescription,
        images: [
            {
                url: `${siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'The Continuity - A Global Collaborative Novel',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: siteDescription,
        images: [`${siteUrl}/og-image.png`],
        creator: '@thecontinuity',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    verification: {
        google: 'OAv4N25-_EylIfm5Jo5lZ5ldSv2O8fp0g8ipHl3tulQ',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        description: siteDescription,
        url: siteUrl,
        potentialAction: {
            '@type': 'WriteAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: siteUrl,
            },
        },
        author: {
            '@type': 'Organization',
            name: 'The Continuity Community',
        },
        inLanguage: ['en', 'ko', 'es', 'fr', 'de', 'ja', 'zh'],
    }

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        </html>
    )
}
