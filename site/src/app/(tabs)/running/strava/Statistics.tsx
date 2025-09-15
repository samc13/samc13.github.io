import KeyValue, { KeyValueContent } from "@/app/scaffolding/KeyValue";
import { Fragment } from "react";
import { StravaRun } from "./2025/stravaData";

import clsx from "clsx";
import flex from "./../../../scaffolding/flex.module.scss";

type DistanceBucketDefinition = { min: number; max?: number };

type DistanceBucket = {
  min: number;
  max?: number;
  runs: StravaRun[];
  averagePace: string;
};

const runningDistanceBuckets: DistanceBucketDefinition[] = [
  { min: 0, max: 5 },
  { min: 5, max: 6 },
  { min: 6, max: 7 },
  { min: 7, max: 8 },
  { min: 8, max: 10 },
  { min: 10, max: 12 },
  { min: 12, max: 15 },
  { min: 15 },
];

function parsePaceToSeconds(pace: string): number {
  const [min, sec] = pace.split(":").map(Number);
  return min * 60 + sec;
}

function formatSecondsToPace(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function groupRunsByCustomBuckets(
  runs: StravaRun[],
  buckets: DistanceBucketDefinition[]
): DistanceBucket[] {
  return buckets.map(({ min, max }) => {
    const bucketRuns = runs.filter(
      (run) => run.distance >= min && (max === undefined || run.distance < max)
    );

    let averagePace = "";
    if (bucketRuns.length > 0) {
      const totalSeconds = bucketRuns.reduce(
        (sum, run) => sum + parsePaceToSeconds(run.pace),
        0
      );
      const avgSeconds = totalSeconds / bucketRuns.length;
      averagePace = formatSecondsToPace(avgSeconds);
    }

    return {
      min,
      max,
      runs: bucketRuns,
      averagePace,
    };
  });
}

function twoDecimals(input: number): number {
  return Math.round(input * 100) / 100;
}

function getRemainingWeeksInYear(): number {
  const now = new Date();
  // Last day of the current year (December 31)
  const endOfYear = new Date(now.getFullYear(), 11, 31);
  // Calculate difference in milliseconds
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const remainingMs = endOfYear.getTime() - now.getTime();
  // Divide and round up
  return Math.ceil(remainingMs / msPerWeek);
}

function formatBucketAsKeyValueContent(
  bucketData: DistanceBucket
): KeyValueContent {
  const max = bucketData.max ? `-${bucketData.max} km` : "+ km";
  return {
    key: `${bucketData.min}${max} (${bucketData.runs.length} runs)`,
    value: bucketData.averagePace,
    unit: "/km",
  };
}

export default function Statistics({ data }: { data: StravaRun[] }) {
  const totalDistance = twoDecimals(
    data.reduce((sum, run) => sum + run.distance, 0)
  );
  const averageDistance = twoDecimals(totalDistance / data.length);
  const remainingWeeks = getRemainingWeeksInYear();
  const weeksSoFar = 52 - remainingWeeks;
  const totalRuns = data.length;
  const runsPerWeek = twoDecimals(data.length / weeksSoFar);
  const weeklyDistanceRequired = twoDecimals(
    (1000 - totalDistance) / remainingWeeks
  );
  const bucketedData: DistanceBucket[] = groupRunsByCustomBuckets(
    data,
    runningDistanceBuckets
  );

  const stats: KeyValueContent[] = [
    { key: "Total distance", value: totalDistance, unit: "km" },
    { key: "Total runs", value: totalRuns },
    { key: "Runs per week", value: runsPerWeek },
    { key: "Average distance per run", value: averageDistance, unit: "km" },
    {
      key: "Weekly distance required for goal",
      value: weeklyDistanceRequired,
      unit: "km",
    },
  ];

  const bucketedStats: KeyValueContent[] = bucketedData.map((d) => {
    return formatBucketAsKeyValueContent(d);
  });
  return (
    <Fragment>
      <div className={clsx(flex["flexboxwrapper"])}>
        <KeyValue items={stats} />
        <KeyValue items={bucketedStats} />
      </div>
    </Fragment>
  );
}
