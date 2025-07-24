import { Fragment } from "react";
import {
  Area,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { StravaRun } from "./stravaData";
import { formatDate, formatDateAsDaySinceEpoch } from "@/app/utils/DateUtils";
import DefaultRechartTooltip from "@/app/rechart/DefaultRechartTooltip";
import { XAxisDefault, YAxisDefaults } from "@/app/rechart/AxisDefaults";
import clsx from "clsx";

import classes from "./../../rechart.module.scss";

type RunningDistanceChartProps = {
  data: StravaRun[];
};

type EnrichedStravaRun = StravaRun & {
  dayRelativeToEpoch: number;
};

type CumulativeRunData = {
  dayRelativeToEpoch: number;
  cumulativeDistance: number;
};

function createCumulativeDistanceData(data: StravaRun[]): CumulativeRunData[] {
  const enrichedData: EnrichedStravaRun[] = data.map((d) => ({
    ...d,
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));

  const sortedData = [...enrichedData].sort(
    (a, b) => a.dayRelativeToEpoch - b.dayRelativeToEpoch
  );
  let cumulativeDistance = 0;

  return sortedData.map((run) => {
    cumulativeDistance += run.distance;
    cumulativeDistance = Math.round(cumulativeDistance * 100) / 100;
    return {
      dayRelativeToEpoch: run.dayRelativeToEpoch,
      cumulativeDistance: cumulativeDistance,
    };
  });
}

const RunningDistanceChart = (props: RunningDistanceChartProps) => {
  const chartData = createCumulativeDistanceData(props.data);
  const startDateFromEpoch = formatDateAsDaySinceEpoch("2025-01-01");
  const endDateFromEpoch = formatDateAsDaySinceEpoch("2025-12-31");
  const returnFromInjuryFromEpoch = formatDateAsDaySinceEpoch("2025-06-23");
  return (
    <Fragment>
      <div className={clsx(classes["chart-container"])}>
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <ComposedChart
            title="2025"
            // width={700}
            // height={600}
            data={chartData}
            margin={{ top: 25, bottom: 25, left: 0, right: 25 }}
          >
            <DefaultRechartTooltip
              labelFormatter={(label: number) => formatDate(label)}
            />
            <YAxis
              {...YAxisDefaults}
              dataKey={"cumulativeDistance"}
              domain={[0, 1000]}
              tickCount={11}
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
                { x: endDateFromEpoch, y: 1000 },
              ]}
            />
            <ReferenceLine
              label="Requirement"
              stroke="red"
              strokeDasharray="3 3"
              segment={[
                { x: returnFromInjuryFromEpoch, y: 305 },
                { x: endDateFromEpoch, y: 1000 },
              ]}
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
