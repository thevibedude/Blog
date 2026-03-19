export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'announcing-snapsense-ai',
    title: 'Announcing SnapSense AI: The Future of Vision',
    date: '2026-03-19',
    excerpt: 'Introducing our new core product. Building starts today.',
    tags: ['AI', 'Vision', 'Product'],
    readTime: '3 min read',
  },
];
