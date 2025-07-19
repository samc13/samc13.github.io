export function convertTimeToSeconds(rawTime: string): number {
  const [mm, ss] = rawTime.split(":").map(Number);
  return mm * 60 + ss;
}

export function formatTotalSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${m}m ${sec}s`;
}
