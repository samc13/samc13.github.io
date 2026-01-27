import {
  fetchFromGitHub,
  GITHUB_REPOS,
} from "../../../utils/GithubDataFetcher";

export type StravaRun = {
  date: string;
  distance: number;
  time: string;
  pace: string;
};

export async function fetchStravaRunData(): Promise<StravaRun[]> {
  return fetchFromGitHub<StravaRun[]>({
    ...GITHUB_REPOS.PUBLIC_DATA,
    path: "stravaData.json",
  });
}
