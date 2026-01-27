import { formatDateAsDaySinceEpoch } from "../../../utils/DateUtils";
import { convertTimeToSeconds } from "../../../utils/TimeUtils";
import { fetchFromGitHub, GITHUB_REPOS } from "../../../utils/GithubDataFetcher";

export type ParkRun = {
  eventName: string;
  date: string; // Format "YYYY-MM-DD"
  position: number;
  time: string; // Format "MM:SS"
};

export type EnrichedParkRunData = ParkRun & {
  totalSeconds: number;
  dayRelativeToEpoch: number;
};

export async function fetchParkRunData(): Promise<ParkRun[]> {
  // Fetch from public-data repository
  return fetchFromGitHub<ParkRun[]>({
    ...GITHUB_REPOS.PUBLIC_DATA,
    path: "parkRuns.json",
  });
}

export function enrichParkRunData(rawData: ParkRun[]): EnrichedParkRunData[] {
  return rawData.map((d) => ({
    ...d,
    totalSeconds: convertTimeToSeconds(d.time),
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));
}
