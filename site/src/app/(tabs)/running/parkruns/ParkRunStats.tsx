"use client";
import { convertTimeToSeconds } from "@/app/utils/TimeUtils";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchParkRunData, ParkRun } from "./parkRunData";
import { getColorForPlace } from "./seriesColours";

type LocationStats = {
  eventName: string;
  bestTime: string;
  bestPosition: number;
  bestRunDate: string;
  formattedDate: string;
  averageTime: string;
  numberOfVisits: number;
};

// Format date from YYYY-MM-DD to DD MMM YY
function formatDateString(dateString: string): string {
  return moment(dateString, "YYYY-MM-DD").format("DD MMM YY");
}

function calculateLocationStats(parkRuns: ParkRun[]): LocationStats[] {
  const locationMap = new Map<string, ParkRun[]>();

  // Group runs by location
  parkRuns.forEach((run) => {
    if (!locationMap.has(run.eventName)) {
      locationMap.set(run.eventName, []);
    }
    locationMap.get(run.eventName)!.push(run);
  });

  // Calculate best time for each location
  const stats: LocationStats[] = [];

  locationMap.forEach((runs, eventName) => {
    // Find the run with the best (lowest) time
    const bestRun = runs.reduce((best, current) => {
      // Convert MM:SS to seconds for comparison
      const currentSeconds = convertTimeToSeconds(current.time);
      const bestSeconds = convertTimeToSeconds(best.time);

      return currentSeconds < bestSeconds ? current : best;
    });

    // Calculate average time
    const totalSeconds = runs.reduce((sum, run) => {
      return sum + convertTimeToSeconds(run.time);
    }, 0);
    const averageSeconds = totalSeconds / runs.length;
    const averageTime = formatSecondsToTime(averageSeconds);

    stats.push({
      eventName,
      bestTime: bestRun.time,
      bestPosition: bestRun.position,
      bestRunDate: bestRun.date,
      formattedDate: formatDateString(bestRun.date),
      averageTime,
      numberOfVisits: runs.length,
    });
  });

  // Sort by event name alphabetically
  return stats.sort((a, b) => a.eventName.localeCompare(b.eventName));
}

// Helper function to convert seconds back to MM:SS format
function formatSecondsToTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const ParkRunStats = () => {
  const [parkRuns, setParkRuns] = useState<ParkRun[]>([]);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);

  useEffect(() => {
    fetchParkRunData().then((data) => {
      setParkRuns(data);
      setLocationStats(calculateLocationStats(data));
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "var(--background)",
            color: "var(--text-color)",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #333" }}>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Location
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Best Time
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Avg Time
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Position
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Visits
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                PB Date
              </th>
            </tr>
          </thead>
          <tbody>
            {locationStats.map((stat) => (
              <tr
                key={stat.eventName}
                style={{
                  borderBottom: "1px solid #444",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color: getColorForPlace(stat.eventName),
                  }}
                >
                  {stat.eventName}
                </td>
                <td style={{ padding: "12px" }}>{stat.bestTime}</td>
                <td style={{ padding: "12px" }}>{stat.averageTime}</td>
                <td style={{ padding: "12px" }}>{stat.bestPosition}</td>
                <td style={{ padding: "12px" }}>{stat.numberOfVisits}</td>
                <td style={{ padding: "12px" }}>{stat.formattedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {locationStats.length === 0 && (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          Loading park run data...
        </p>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
        <p>Total locations visited: {locationStats.length}</p>
        <p>Total park runs completed: {parkRuns.length}</p>
      </div>
    </div>
  );
};

export default ParkRunStats;
