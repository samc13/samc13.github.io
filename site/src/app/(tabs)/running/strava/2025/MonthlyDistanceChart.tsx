import DefaultRechartTooltip from "@/app/rechart/DefaultRechartTooltip";
import { Fragment } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { XAxisDefault, YAxisDefaults } from "@/app/rechart/AxisDefaults";
import { twoDecimals } from "@/app/utils/NumberUtils";
import clsx from "clsx";
import classes from "./../../rechart.module.scss";
import { EnrichedStravaRun } from "./page";

type MonthlyDistanceChartProps = {
  data: EnrichedStravaRun[];
};

/**
 * Buckets runs by calendar month for a given year. It first initializes all 12 months
 * with a total distance of 0, using abbreviated month names ("Jan", "Feb", etc.), then adds
 * run distances to the corresponding bucket if the run's date is within the specified year.
 *
 * @param runs The array of EnrichedStravaRun objects.
 * @param year The year for which the buckets should be initialized (e.g., 2025).
 * @returns An array of objects with a 'month' (abbreviated) and 'totalDistance' property.
 */
export function bucketRunsByMonth(runs: EnrichedStravaRun[], year: number) {
    // Array of month abbreviations for display in order.
    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Initialize buckets for all 12 months with 0.
    const buckets: { month: string; totalDistance: number }[] = [];
    for (let month = 1; month <= 12; month++) {
      buckets.push({
        month: monthAbbreviations[month - 1],
        totalDistance: 0,
      });
    }
  
    // Process the runs and add to the corresponding bucket if the run is in the specified year.
    runs.forEach((run) => {
      const date = new Date(run.date);
      const runYear = date.getFullYear();
      if (runYear === year) {
        const monthIndex = date.getMonth(); // 0-indexed month
        buckets[monthIndex].totalDistance += run.distance;
        buckets[monthIndex].totalDistance = twoDecimals(buckets[monthIndex].totalDistance);
      }
    });
  
    return buckets;
  }

const MonthlyDistanceChart = ({data}: MonthlyDistanceChartProps) => {
    const bucketedData = bucketRunsByMonth(data, 2025);
    return (
      <Fragment>
        <div className={clsx(classes["chart-container"])}>
          <ResponsiveContainer
            width="100%"
            height={600}
          >
            <BarChart
              title="2025"
              data={bucketedData}
              margin={{ top: 25, bottom: 25, left: 0, right: 25 }}
            >
              <DefaultRechartTooltip
                labelFormatter={(label: number) => label}
              />
              <YAxis
                {...YAxisDefaults}
                label={{value: "Distance", angle: "-90"}}
                domain={[0, 200]}
                tickCount={11}
              />
              <XAxis
                {...XAxisDefault}
                dataKey={"month"}
                label={{value: "Month", position: "bottom"}}
              />
            <Bar dataKey="totalDistance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Fragment>
    );
  };
  
  export default MonthlyDistanceChart;