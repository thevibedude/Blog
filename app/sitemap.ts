import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { getBlogPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const baseUrl = siteConfig.url;

  const blogPosts = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Exclude API routes and internal pages
  // Do NOT include /api/* in sitemap
  const routes = [
    '',
    '/blog',
    '/build-log',
    '/projects',
    '/challenges',
    '/now',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogPosts];
}
