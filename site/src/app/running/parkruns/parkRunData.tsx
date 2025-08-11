export type ParkRun = {
  eventName: string;
  date: string; // Format "YYYY-MM-DD"
  position: number;
  time: string; // Format "MM:SS"
};

export async function fetchParkRunData(): Promise<ParkRun[]> {
  const res = await fetch('/resources/parkRuns.json');
  const data = await res.json();
  return data as ParkRun[];
}
