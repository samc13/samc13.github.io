"use client";
import { convertTimeToSeconds } from "@/app/utils/TimeUtils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchParkRunData, ParkRun } from "./parkRunData";
import styles from "./ParkRunStats.module.scss";
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

// Define table columns
const columnHelper = createColumnHelper<LocationStats>();

const columns = [
  columnHelper.accessor("eventName", {
    header: "Location",
    cell: (info) => (
      <span
        style={{
          fontWeight: "bold",
          color: getColorForPlace(info.getValue()),
        }}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("bestTime", {
    header: "Best Time",
  }),
  columnHelper.accessor("averageTime", {
    header: "Avg Time",
  }),
  columnHelper.accessor("bestPosition", {
    header: "Position",
  }),
  columnHelper.accessor("numberOfVisits", {
    header: "Visits",
  }),
  columnHelper.accessor("formattedDate", {
    header: "PB Date",
  }),
];

const ParkRunStats = () => {
  const [parkRuns, setParkRuns] = useState<ParkRun[]>([]);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);

  useEffect(() => {
    fetchParkRunData().then((data) => {
      setParkRuns(data);
      setLocationStats(calculateLocationStats(data));
    });
  }, []);

  const table = useReactTable({
    data: locationStats,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.tableHeader}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeaderCell}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? styles.sortableHeader
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {locationStats.length === 0 && (
        <p className={styles.loadingMessage}>Loading park run data...</p>
      )}

      <div className={styles.summary}>
        <p>Total locations visited: {locationStats.length}</p>
        <p>Total park runs completed: {parkRuns.length}</p>
      </div>
    </div>
  );
};

export default ParkRunStats;
