import Link from 'next/link';
import { ArrowRight, BookOpen, PenTool } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { CurrentlyBuilding } from '@/components/CurrentlyBuilding';
import { ActiveChallengeBanner } from '@/components/ChallengeCard';
import { BlogCard } from '@/components/BlogCard';
import { BuildLogCard } from '@/components/BuildLogCard';
import { GitHubStats } from '@/components/GitHubStats';
import { getBlogPosts, getBuildLogs } from '@/lib/mdx';
import { getGitHubStats } from '@/lib/github';
import { RoadTo1M } from '@/components/RoadTo1M';

export default async function Home() {
  const statsPromise = getGitHubStats();
  const allPosts = await getBlogPosts();
  const allLogs = await getBuildLogs();
  const latestPosts = allPosts.slice(0, 3);
  const latestLogs = allLogs.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      <div className="section-divider"><span className="divider-label">[thevibedude@localhost ~]</span></div>
      <CurrentlyBuilding />
      
      <div className="section-divider"><span className="divider-label">[thevibedude@localhost ~]</span></div>
      {/* Latest Blog Posts Section */}
      <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col mb-12">
          <p className="section-label">// latest thoughts</p>
          <div className="flex items-center justify-between">
            <h2 className="text-foreground tracking-tighter text-xl sm:text-2xl font-mono">Latest Thoughts</h2>
            <Link href="/blog" className="group flex items-center space-x-2 text-text-muted hover:text-accent font-mono text-sm transition-colors">
              <span>view all</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      <div className="section-divider"><span className="divider-label">[thevibedude@localhost ~]</span></div>
      {/* Latest Build Logs Section */}
      <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col mb-12">
          <p className="section-label">// build log</p>
          <div className="flex items-center justify-between">
            <h2 className="text-foreground tracking-tighter text-xl sm:text-2xl font-mono">Build Logs</h2>
            <Link href="/build-log" className="group flex items-center space-x-2 text-text-muted hover:text-accent font-mono text-sm transition-colors">
              <span>view timeline</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="max-w-3xl">
          {latestLogs.map((entry) => (
            <BuildLogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <div className="section-divider"><span className="divider-label">[thevibedude@localhost ~]</span></div>
      <ActiveChallengeBanner />

      <RoadTo1M />

      <div className="section-divider"><span className="divider-label">[thevibedude@localhost ~]</span></div>
      <GitHubStats statsPromise={statsPromise} />
    </div>
  );
}
