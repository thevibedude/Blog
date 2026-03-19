import { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Github, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with @thevibedude.',
};

export default function ContactPage() {
  const socialLinks = [
    { label: 'GitHub', href: siteConfig.githubUrl, icon: Github, handle: siteConfig.githubUsername },
    { label: 'Twitter', href: siteConfig.twitterUrl, icon: Twitter, handle: siteConfig.handle },
    { label: 'LinkedIn', href: siteConfig.linkedinUrl, icon: Linkedin, handle: siteConfig.handle },
    { label: 'Instagram', href: siteConfig.instagramUrl, icon: Instagram, handle: '@the_vibedude' },
    { label: 'YouTube', href: siteConfig.youtubeUrl, icon: Youtube, handle: '@thevibedude01' },
    { label: 'Email', href: `mailto:${siteConfig.email}`, icon: Mail, handle: siteConfig.email },
  ];

  return (
    <div className="px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-20">
        <h1 className="mb-4 tracking-tighter">Get in touch</h1>
        <p className="text-text-muted font-inter max-w-2xl text-lg">
          I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-6">
            <h2 className="text-xl font-mono uppercase tracking-widest text-foreground">Socials</h2>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 bg-surface border border-border/50 rounded-2xl hover:border-accent/30 transition-all hover:translate-x-1"
                >
                  <div className="p-2 bg-card border border-border/50 rounded-lg mr-4 text-text-muted group-hover:text-accent transition-colors">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">{link.label}</span>
                    <span className="text-sm font-inter text-foreground">{link.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="p-8 bg-accent/5 border border-accent/10 rounded-3xl">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-3">Quick Note</h3>
            <p className="text-text-muted text-xs leading-relaxed font-inter">
              If you’re reaching out about a specific project, please include a brief description or a link to the repo. It helps me prepare for our chat!
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
