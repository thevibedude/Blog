import { Metadata } from 'next';
import { BlogList } from '@/components/BlogList';
import { getBlogPosts } from '@/lib/mdx';

import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on building AI-native products, indie hacking, and life.',
};

const POSTS_PER_PAGE = 12;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const allPosts = await getBlogPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-16">
        <h1 className="mb-4 tracking-tighter">Blog</h1>
        <p className="text-text-muted font-inter max-w-2xl">
          Writing about code, shipping products, and the chaos of being an indie developer.
        </p>
      </header>
      
      <BlogList posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
      
      <div className="mt-12 text-center">
         <a href="/blog/archive" className="archive-cta text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
           browse all {allPosts.length} posts →
         </a>
      </div>
    </div>
  );
}
