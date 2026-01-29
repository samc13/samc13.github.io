import { XAxisDefault, YAxisDefaults } from "@/app/rechart/AxisDefaults";
import DefaultRechartTooltip from "@/app/rechart/DefaultRechartTooltip";
import { formatDate, formatDateAsDaySinceEpoch } from "@/app/utils/DateUtils";
import clsx from "clsx";
import { Fragment } from "react";
import {
  Area,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { twoDecimals } from "@/app/utils/NumberUtils";
import classes from "./../rechart.module.scss";
import { EnrichedStravaRun } from "./page";

type RunningDistanceChartProps = {
  data: EnrichedStravaRun[];
  year: number;
  distanceGoal: number;
};

type CumulativeRunData = {
  dayRelativeToEpoch: number;
  cumulativeDistance: number;
};

function createCumulativeDistanceData(
  data: EnrichedStravaRun[],
): CumulativeRunData[] {
  const sortedData = [...data].sort(
    (a, b) => a.dayRelativeToEpoch - b.dayRelativeToEpoch,
  );
  let cumulativeDistance = 0;

  return sortedData.map((run) => {
    cumulativeDistance += run.distance;
    cumulativeDistance = twoDecimals(cumulativeDistance);
    return {
      dayRelativeToEpoch: run.dayRelativeToEpoch,
      cumulativeDistance: cumulativeDistance,
    };
  });
}

function getStartOfYear(year: number) {
  return `${year}-01-01`;
}

function getEndOfYear(year: number) {
  return `${year}-12-31`;
}

const RunningDistanceChart = (props: RunningDistanceChartProps) => {
  const chartData: CumulativeRunData[] = createCumulativeDistanceData(
    props.data,
  );
  const startDateFromEpoch: number = formatDateAsDaySinceEpoch(
    getStartOfYear(props.year),
  );
  const endDateFromEpoch: number = formatDateAsDaySinceEpoch(
    getEndOfYear(props.year),
  );
  return (
    <Fragment>
      <div className={clsx(classes["chart-container"])}>
        <ResponsiveContainer width={"100%"} height={500}>
          <ComposedChart
            title="2025"
            data={chartData}
            margin={{ top: 25, bottom: 25, left: 0, right: 25 }}
          >
            <DefaultRechartTooltip
              labelFormatter={(label) => formatDate(label as number)}
            />
            <YAxis
              {...YAxisDefaults}
              dataKey={"cumulativeDistance"}
              label={{ value: "Distance (km)", angle: -90 }}
              domain={[
                0,
                props.distanceGoal >= 1000 ? props.distanceGoal + 200 : 1000,
              ]}
              tickCount={15}
            />
            <XAxis
              {...XAxisDefault}
              dataKey={"dayRelativeToEpoch"}
              domain={[startDateFromEpoch, endDateFromEpoch]}
              type="number"
              tickFormatter={formatDate}
            />
            <ReferenceLine
              label="Target"
              stroke="green"
              strokeDasharray="3 3"
              segment={[
                { x: startDateFromEpoch, y: 0 },
                { x: endDateFromEpoch, y: props.distanceGoal },
              ]}
            />
            {props.distanceGoal !== 1000 && (
              <ReferenceLine
                label="1000 km"
                stroke="darkgreen"
                strokeDasharray="3 3"
                segment={[
                  { x: startDateFromEpoch, y: 0 },
                  { x: endDateFromEpoch, y: 1000 },
                ]}
              />
            )}
            <ReferenceLine
              label={"Goal: " + props.distanceGoal + " km"}
              stroke="grey"
              strokeDasharray="3 3"
              y={props.distanceGoal}
            />
            <Area
              dataKey={"cumulativeDistance"}
              type="monotone"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
};

export default RunningDistanceChart;
