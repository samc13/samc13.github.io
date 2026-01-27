// Helper function to convert "MM:SS" or "HH:MM:SS" format to total seconds
export function convertTimeToSeconds(rawTime: string): number {
  const parts = rawTime.split(":").map(Number);
  if (parts.length === 2) {
    // MM:SS
    const [mm, ss] = parts;
    return mm * 60 + ss;
  } else if (parts.length === 3) {
    // HH:MM:SS
    const [hh, mm, ss] = parts;
    return hh * 3600 + mm * 60 + ss;
  }
  return 0;
}

// Helper function to format total seconds into "Xm Ys"
export function formatTotalSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${m}m ${sec}s`;
}

// Helper function to convert seconds back to time format (MM:SS or HH:MM:SS)
export function convertSecondsToTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
