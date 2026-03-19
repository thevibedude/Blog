import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-bg-tertiary border border-border/50 text-text-secondary hover:text-accent hover:border-border-accent transition-all duration-300"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </a>
);

export function Footer() {
  return (
    <footer className="w-full py-16 px-6 sm:px-12 border-t border-border-accent/20 bg-bg-secondary flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mb-12 space-y-8 md:space-y-0 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link href="/" className="font-mono text-2xl font-bold tracking-tighter text-accent group" aria-label="thevibedude home">
            tvd_
          </Link>
          <p className="text-text-tertiary text-sm font-sans">{siteConfig.tagline}</p>
        </div>

        <div className="flex space-x-4 text-center justify-center flex-wrap">
          <SocialLink href={siteConfig.githubUrl}    icon={Github}    label="Github" />
          <SocialLink href={siteConfig.twitterUrl}   icon={Twitter}   label="Twitter" />
          <SocialLink href={siteConfig.linkedinUrl}  icon={Linkedin}  label="LinkedIn" />
          <SocialLink href={siteConfig.instagramUrl} icon={Instagram} label="Instagram" />
          <SocialLink href={siteConfig.youtubeUrl}   icon={Youtube}   label="YouTube" />
          <SocialLink href={`mailto:${siteConfig.email}`} icon={Mail} label="Email" />
        </div>
      </div>

      <div className="w-full max-w-7xl pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-tertiary">
          building in public <span className="text-accent mx-2 text-base">•</span> one commit at a time
        </p>
        <p className="text-xs font-sans text-text-tertiary/60">
          © {new Date().getFullYear()} {siteConfig.name}. all rights reserved.
        </p>
      </div>
    </footer>
  );
}
