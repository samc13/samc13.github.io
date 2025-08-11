export type StravaRun = {
    date: string,
    distance: number,
    time: string,
    pace: string
};

export async function fetchStravaRunData(): Promise<StravaRun[]> {
  const res = await fetch('/resources/stravaData.json');
  const data = await res.json();
  return data as StravaRun[];
}
