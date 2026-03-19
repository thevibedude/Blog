export type ProjectStatus = 'active' | 'in-progress' | 'shipped' | 'coming-soon';

export interface Project {
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  completion: number;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  previewType: 'none' | 'iframe' | 'video' | 'screenshot' | 'loom';
  previewUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "SnapSense AI",
    slug: "snapsense-ai",
    description: "Something is coming. Building starts soon.",
    status: "coming-soon",
    completion: 0,
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    previewType: "none",
  }
];
