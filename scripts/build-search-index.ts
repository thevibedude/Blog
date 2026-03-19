import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

function getMdxFiles(dir: string): string[] {
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

async function buildIndex() {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  const ObjectFiles = getMdxFiles(contentDir);

  const index: SearchEntry[] = ObjectFiles.map((file) => {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    return {
      slug: path.basename(file, '.mdx'),
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      date: data.date ?? '',
    };
  });

  // Sort by date descending
  index.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Write to public so it's accessible at runtime
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'search-index.json'),
    JSON.stringify(index)
  );

  console.log(`Built search index: ${index.length} posts`);
}

buildIndex();
