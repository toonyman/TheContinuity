
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecontinuity.app'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    ko: `${baseUrl}/ko`,
                    es: `${baseUrl}/es`,
                    fr: `${baseUrl}/fr`,
                    de: `${baseUrl}/de`,
                    ja: `${baseUrl}/ja`,
                    zh: `${baseUrl}/zh`,
                },
            },
        },
    ]
}
