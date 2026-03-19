import { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/projects';
import { Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'AI-native products and tools I am building.',
};

export default function ProjectsPage() {
  return (
    <div className="px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-20">
        <div className="flex items-center space-x-3 text-accent mb-4">
          <Rocket className="h-5 w-5" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Labs</span>
        </div>
        <h1 className="mb-4 tracking-tighter">My Builds</h1>
        <p className="text-text-muted font-inter max-w-2xl text-lg mb-12">
          Experimenting with AI, Rust, and high-fidelity interaction design. Each project is a step towards AI-native software.
        </p>

        <p className="section-label">// projects</p>
        <h2 className="text-foreground tracking-tighter text-2xl font-mono mb-2">Projects</h2>
        <p className="projects-subtext">
          one project in the pipeline. more when they're real.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 480px))',
        justifyContent: 'start'
      }}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
