/**
 * Configuration for fetching data from GitHub repositories
 */
export interface GitHubFetchConfig {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
}

/**
 * GitHub API response types
 */
export type GitHubContentItem = {
  name: string;
  type: "file" | "dir" | "symlink" | "submodule";
  download_url?: string;
  path: string;
  sha: string;
  size: number;
};

/**
 * Predefined repository configurations
 */
export const GITHUB_REPOS = {
  SITE: {
    owner: "samc13",
    repo: "samc13.github.io",
    branch: "main",
  },
  PUBLIC_DATA: {
    owner: "samc13",
    repo: "public-data",
    branch: "main",
  },
  PUBLIC_BLOG: {
    owner: "samc13",
    repo: "public-blog",
    branch: "main",
  },
} as const;

/**
 * Base function to fetch from GitHub (raw content or API)
 */
async function fetchFromGitHubBase(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from GitHub: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error(`Error fetching from GitHub (${url}):`, error);
    throw error;
  }
}

/**
 * Fetches JSON data from a GitHub repository (raw content)
 * 
 * @param config Repository configuration with path to the file
 * @returns Parsed JSON data
 * 
 * @example
 * // Using predefined repo
 * const data = await fetchFromGitHub<ParkRun[]>({
 *   ...GITHUB_REPOS.PUBLIC_DATA,
 *   path: 'parkRuns.json'
 * });
 * 
 * @example
 * // Custom repo
 * const data = await fetchFromGitHub<Data>({
 *   owner: 'user',
 *   repo: 'data-repo',
 *   branch: 'main',
 *   path: 'data/file.json'
 * });
 */
export async function fetchFromGitHub<T = unknown>(
  config: GitHubFetchConfig
): Promise<T> {
  const { owner, repo, branch = "main", path } = config;

  if (!path) {
    throw new Error("Path is required for fetchFromGitHub");
  }

  // GitHub raw content URL
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

  const response = await fetchFromGitHubBase(url);
  const data = await response.json();
  return data as T;
}

/**
 * Fetches text/markdown content from a GitHub repository (raw content)
 * 
 * @param config Repository configuration with path to the file
 * @returns Raw text content
 * 
 * @example
 * const markdown = await fetchTextFromGitHub({
 *   ...GITHUB_REPOS.SITE,
 *   path: 'site/public/resources/aboutme.md'
 * });
 */
export async function fetchTextFromGitHub(
  config: GitHubFetchConfig
): Promise<string> {
  const { owner, repo, branch = "main", path } = config;

  if (!path) {
    throw new Error("Path is required for fetchTextFromGitHub");
  }

  // GitHub raw content URL
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

  const response = await fetchFromGitHubBase(url);
  return await response.text();
}

/**
 * Fetches directory contents from GitHub API
 * 
 * @param config Repository configuration with path to directory
 * @returns Array of GitHub content items
 * 
 * @example
 * const files = await fetchGitHubDirectoryContents({
 *   ...GITHUB_REPOS.PUBLIC_BLOG,
 *   path: 'blogs'
 * });
 */
export async function fetchGitHubDirectoryContents(
  config: GitHubFetchConfig
): Promise<GitHubContentItem[]> {
  const { owner, repo, path = "" } = config;

  // GitHub API URL for directory contents
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetchFromGitHubBase(url);
  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response format from GitHub API");
  }

  return data as GitHubContentItem[];
}

/**
 * Creates a typed fetcher function for a specific repository and path
 * 
 * @example
 * const fetchParkRuns = createGitHubFetcher<ParkRun[]>({
 *   ...GITHUB_REPOS.PUBLIC_DATA,
 *   path: 'parkRuns.json'
 * });
 * const data = await fetchParkRuns();
 */
export function createGitHubFetcher<T>(
  config: GitHubFetchConfig
): () => Promise<T> {
  return () => fetchFromGitHub<T>(config);
}

