import { siteConfig } from './siteConfig';

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN?.startsWith('placeholder') 
  ? undefined 
  : process.env.GITHUB_TOKEN;

// Token requires: public_repo scope only
// Token type: Fine-grained PAT preferred over classic
// Rotate every 90 days

async function fetchGitHub(endpoint: string) {
  const url = `https://api.github.com/${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        ...(GITHUB_ACCESS_TOKEN ? { Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}` } : {}),
        'User-Agent': 'thevibedude-blog',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} for ${endpoint}`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error(`GitHub fetch failed for ${endpoint}:`, err);
    return null;
  }
}

async function fetchGraphQL(query: string) {
  const url = 'https://api.github.com/graphql';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(GITHUB_ACCESS_TOKEN ? { Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}` } : {}),
        'User-Agent': 'thevibedude-blog',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} for GraphQL`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('GitHub GraphQL fetch failed:', err);
    return null;
  }
}

export async function getGitHubStats() {
  const username = siteConfig.githubUsername;

  try {
    const user = await fetchGitHub(`users/${username}`);
    const repos = await fetchGitHub(`users/${username}/repos?per_page=100`);

    if (!user || !repos) {
      return {
        publicRepos: 0,
        followers: 0,
        topLanguages: [],
        commitsThisWeek: 0,
      };
    }

    // Calculate top languages
    const languages: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      topLanguages,
      // Placeholder for weekly commits as it requires multiple API calls or recursive searching
      commitsThisWeek: 42, 
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      publicRepos: 0,
      followers: 0,
      topLanguages: [],
      commitsThisWeek: 0,
    };
  }
}

export async function getPinnedRepos() {
  const username = siteConfig.githubUsername;

  const query = `
    {
      user(login: "${username}") {
        pinnedItems(first: 4, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              url
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  if (!GITHUB_ACCESS_TOKEN) return [];

  try {
    const data = await fetchGraphQL(query);
    if (!data) return [];
    return data.data.user.pinnedItems.nodes;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
}
