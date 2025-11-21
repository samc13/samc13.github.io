import { formatDateAsDaySinceEpoch } from "../../../utils/DateUtils";
import { convertTimeToSeconds } from "../../../utils/TimeUtils";

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
  const res = await fetch("/resources/parkRuns.json");
  const data = await res.json();
  return data as ParkRun[];
}

export function enrichParkRunData(rawData: ParkRun[]): EnrichedParkRunData[] {
  return rawData.map((d) => ({
    ...d,
    totalSeconds: convertTimeToSeconds(d.time),
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));
}
