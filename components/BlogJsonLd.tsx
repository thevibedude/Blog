import { BlogPost } from '@/lib/blog';
import { siteConfig } from '@/lib/siteConfig';

export function BlogJsonLd({ post }: { post: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: '@thevibedude',
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
