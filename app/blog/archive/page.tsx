import { getBlogPosts } from '@/lib/mdx';

export default async function ArchivePage() {
  const posts = await getBlogPosts();

  // Group by year
  const byYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date)
        .getFullYear()
        .toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>
  );

  const years = Object.keys(byYear)
    .sort((a, b) => Number(b) - Number(a));

  return (
    <main className="px-6 sm:px-12 py-16 max-w-4xl mx-auto w-full">
      <p className="text-[10px] uppercase tracking-widest text-[var(--accent)] mb-4">// archive</p>
      <h2 className="text-3xl font-mono mb-4 text-[var(--text-primary)]">All Posts</h2>
      <p className="text-[var(--text-tertiary)] font-inter mb-12">
        {posts.length} posts and counting.
      </p>

      {years.map(year => (
        <section key={year} className="archive-year">
          <div className="archive-year-header">
            <span className="archive-year-label">
              {year}
            </span>
            <span className="archive-year-count">
              {byYear[year].length} posts
            </span>
          </div>

          <ul className="archive-list">
            {byYear[year].map((post: any) => (
              <li key={post.slug}
                  className="archive-item">
                <span className="archive-date">
                  {new Date(post.date)
                    .toLocaleDateString('en-US', {
                      month: 'short',
                      day:   'numeric',
                    })}
                </span>
                
                <a
                  href={`/blog/${post.slug}`}
                  className="archive-link"
                >
                  {post.title}
                </a>
                <span className="archive-tags">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag}
                          className="px-2 py-0.5 border border-[var(--border-accent)]/20 rounded-full text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest bg-[var(--bg-secondary)]">
                      {tag}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
