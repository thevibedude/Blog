import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import { ChevronLeft, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { getPostBySlug, getBlogPosts } from '@/lib/mdx';
import { MDXRenderer } from '@/components/MDXRenderer';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { TableOfContents } from '@/components/TableOfContents';
import { BlogJsonLd } from '@/components/BlogJsonLd';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/siteConfig';

export const runtime = 'nodejs';
export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('blog', slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.data.title,
    description: post.data.excerpt,
    openGraph: {
      title: post.data.title,
      description: post.data.excerpt,
      type: 'article',
      images: [post.data.coverImage || ''],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug('blog', slug);
  if (!post) notFound();

  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeShiki, { theme: 'github-dark' }],
      ],
    },
  };

  const allPosts = await getBlogPosts();
  const currentIndex = allPosts.findIndex((p: any) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="min-h-screen pb-20">
      <BlogJsonLd post={{ ...post.data, slug: slug }} />
      <ReadingProgressBar />
      
      {/* Hero Section */}
      <header className="py-20 px-6 sm:px-12 max-w-4xl mx-auto text-center border-b border-border/10 mb-16">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent mb-12 transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          back to blog
        </Link>
        
        <div className="flex items-center justify-center space-x-4 mb-6 text-xs font-mono uppercase tracking-[0.2em] text-text-muted">
          <span>{formatDate(post.data.date)}</span>
          <span className="text-accent">•</span>
          <span>{post.data.readTime}</span>
        </div>

        <h1 className="mb-8 leading-tight">{post.data.title}</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {post.data.tags?.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono border border-border/50 py-1 px-3 rounded-full uppercase tracking-widest text-text-muted">
              #{tag}
            </span>
          ))}
        </div>

        {post.data.coverImage && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-2xl">
            <Image 
              src={post.data.coverImage} 
              alt={post.data.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      {/* Content Layout */}
      <div className="px-6 sm:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <TableOfContents />
            
            <div className="mt-12 pt-12 border-t border-border/10">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.data.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
              >
                <Share2 className="h-4 w-4 mr-3" />
                Share on X
              </a>
            </div>
          </div>
        </aside>

        {/* MDX Body */}
        <div className="flex-grow max-w-3xl">
          <MDXRenderer source={post.content} options={mdxOptions} />
          
          {/* Post Nav */}
          <div className="mt-20 pt-10 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col items-start space-y-2 max-w-[250px]">
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono flex items-center">
                  <ArrowLeft className="h-3 w-3 mr-2" /> Previous
                </span>
                <span className="text-sm font-mono text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end space-y-2 max-w-[250px] text-right">
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono flex items-center">
                  Next <ArrowRight className="h-3 w-3 ml-2" />
                </span>
                <span className="text-sm font-mono text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </article>
  );
}
