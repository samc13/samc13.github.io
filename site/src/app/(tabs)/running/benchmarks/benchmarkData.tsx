import {
  fetchFromGitHub,
  GITHUB_REPOS,
} from "../../../utils/GithubDataFetcher";

/**
 * Individual effort for a specific date
 */
export type BenchmarkEffort = {
  date: string; // Format: "YYYY-MM-DD"
  time: string; // Format: "mm:ss" or "hh:mm:ss" e.g., "21:04" or "01:35:14"
};

/**
 * All efforts for a specific year
 */
export type YearlyBestEfforts = {
  year: number;
  efforts: BenchmarkEffort[];
};

/**
 * Benchmark data for a specific distance
 */
export type DistanceBenchmark = {
  distance: number; // Distance in meters (e.g., 400, 1000, 5000)
  yearlyBestEfforts: YearlyBestEfforts[];
};

/**
 * Root type - array of distance benchmarks
 */
export type BenchmarksData = DistanceBenchmark[];

/**
 * Fetches benchmark data from the public-data repository
 */
export async function fetchBenchmarkData(): Promise<BenchmarksData> {
  return fetchFromGitHub<BenchmarksData>({
    ...GITHUB_REPOS.PUBLIC_DATA,
    path: "benchmarks.json",
  });
}
