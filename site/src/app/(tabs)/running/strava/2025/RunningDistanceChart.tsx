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
import classes from "./../../rechart.module.scss";
import { EnrichedStravaRun } from "./page";

type RunningDistanceChartProps = {
  data: EnrichedStravaRun[];
};

type CumulativeRunData = {
  dayRelativeToEpoch: number;
  cumulativeDistance: number;
};

function createCumulativeDistanceData(
  data: EnrichedStravaRun[]
): CumulativeRunData[] {
  const sortedData = [...data].sort(
    (a, b) => a.dayRelativeToEpoch - b.dayRelativeToEpoch
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

const RunningDistanceChart = (props: RunningDistanceChartProps) => {
  const chartData: CumulativeRunData[] = createCumulativeDistanceData(
    props.data
  );
  const startDateFromEpoch: number = formatDateAsDaySinceEpoch("2025-01-01");
  const endDateFromEpoch: number = formatDateAsDaySinceEpoch("2025-12-31");
  const returnFromInjuryFromEpoch: number =
    formatDateAsDaySinceEpoch("2025-06-23");
  return (
    <Fragment>
      <div className={clsx(classes["chart-container"])}>
        <ResponsiveContainer width="100%" height={600}>
          <ComposedChart
            title="2025"
            data={chartData}
            margin={{ top: 25, bottom: 25, left: 0, right: 25 }}
          >
            <DefaultRechartTooltip
              labelFormatter={(label: number) => formatDate(label)}
            />
            <YAxis
              {...YAxisDefaults}
              dataKey={"cumulativeDistance"}
              domain={[0, 1200]}
              tickCount={13}
            />
            <XAxis
              {...XAxisDefault}
              dataKey={"dayRelativeToEpoch"}
              domain={[startDateFromEpoch, endDateFromEpoch]}
              type="number"
              tickFormatter={formatDate}
            />
            <ReferenceLine
              label="Requirement"
              stroke="green"
              strokeDasharray="3 3"
              segment={[
                { x: startDateFromEpoch, y: 0 },
                { x: endDateFromEpoch, y: 1000 },
              ]}
            />
            <ReferenceLine
              label="Injury adjusted requirement"
              stroke="red"
              strokeDasharray="3 3"
              segment={[
                { x: returnFromInjuryFromEpoch, y: 305 },
                { x: endDateFromEpoch, y: 1000 },
              ]}
            />
            <ReferenceLine
              label="Target"
              stroke="green"
              strokeDasharray="3 3"
              y={1000}
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
