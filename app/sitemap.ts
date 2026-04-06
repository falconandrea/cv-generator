import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://craftcv.online'
    const lastModified = new Date()

    const routes = [
        '',
        '/dashboard',
        '/editor',
        '/ats-score',
        '/privacy',
        '/cookies',
        '/llms.txt',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}
