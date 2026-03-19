import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMdxFiles(fullPath);
    }
    if (entry.name.endsWith('.mdx')) {
      return [fullPath];
    }
    return [];
  });
}

export async function getBlogPosts() {
  const dirPath = path.join(CONTENT_PATH, 'blog');
  const files = getMdxFiles(dirPath);

  const posts = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const fileName = path.basename(filePath, '.mdx');

    return {
      ...data,
      slug: fileName,
      content,
    } as any;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBuildLogs() {
  const dirPath = path.join(CONTENT_PATH, 'build-log');
  const files = getMdxFiles(dirPath);
  const logs = files.map((filePath) => {
    const fileName = path.basename(filePath, '.mdx');
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
      ...data,
      slug: fileName,
      content,
    } as any;
  });

  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getChallenges() {
  const dirPath = path.join(CONTENT_PATH, 'challenges');
  const files = getMdxFiles(dirPath);
  const challenges = files.map((filePath) => {
    const fileName = path.basename(filePath, '.mdx');
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
      ...data,
      slug: fileName,
      content,
    } as any;
  });

  return challenges;
}

export async function getNowPage() {
  const fullPath = path.join(CONTENT_PATH, 'now.mdx');
  if (!fs.existsSync(fullPath)) return null;
  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);
  return { data, content };
}

export async function getPostBySlug(type: string, slug: string) {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');
  if (safeSlug !== slug) return null;

  const typeDir = path.join(CONTENT_PATH, type);
  // It could be nested, so we find it dynamically
  const files = getMdxFiles(typeDir);
  const file = files.find(f => path.basename(f, '.mdx') === safeSlug);

  if (!file || !fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(source);
  return { data, content };
}
