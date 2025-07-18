"use client";
import moment from "moment";
import { Fragment, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import RunningData, { ParkRunData } from "./runningData";
import LocationColorMap from "./seriesColours";

const epoch: moment.Moment = moment("1970-01-01", "YYYY-MM-DD");

type EnrichedParkRunData = ParkRunData & {
  totalSeconds: number;
  dayRelativeToEpoch: number;
};

const events = [...new Set(RunningData.map((d) => d.eventName))];
const all = "All";

function convertTimeToSeconds(rawTime: string): number {
  const [mm, ss] = rawTime.split(":").map(Number);
  return mm * 60 + ss;
}

function formatTotalSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${m}m ${sec}s`;
}

function formatDateAsDaySinceEpoch(rawDate: string): number {
  const date = moment(rawDate, "YYYY-MM-DD");
  return Math.floor(date.diff(epoch, "days"));
}

function formatDate(daysSinceEpoch: number): string {
  const e = epoch.clone();
  const date = e.add(daysSinceEpoch, "days");
  return date.format("DD MMM YY");
}

const tooltipStyle = {
  backgroundColor: "#364156",
  border: "1px solid #333",
  color: "#ededed",
};

function formatDataAsSeries(parkRunData: EnrichedParkRunData[]) {
  // get all unique dates
  const dates = Array.from(
    new Set(parkRunData.map((d) => d.dayRelativeToEpoch))
  ).sort();
  // get all unique event names
  const eventNames = Array.from(new Set(parkRunData.map((d) => d.eventName)));

  // Loop across all dates:
  const output = dates.map((dayRelativeToEpoch) => {
    const row: {
      dayRelativeToEpoch: number;
      [eventName: string]: number | string | undefined;
    } = { dayRelativeToEpoch };
    for (const event of eventNames) {
      const entry = parkRunData.find(
        (d) =>
          d.dayRelativeToEpoch === dayRelativeToEpoch && d.eventName === event
      );
      row[event] = entry ? convertTimeToSeconds(entry.time) : undefined;
    }
    return row;
  });
  return output;
}

const ParkRunYAxis = () => {
  return (
    <YAxis
      width={100}
      tickFormatter={formatTotalSeconds}
      tickCount={15}
      domain={[18 * 60, 29 * 60]}
      stroke="#dbdbdb"
    />
  );
};

const ParkRunXAxis = () => {
  return (
    <XAxis
      dataKey="dayRelativeToEpoch"
      type="number"
      domain={["auto", "auto"]}
      tickCount={6}
      tickFormatter={formatDate}
      stroke="#dbdbdb"
    />
  );
};

const ParkRunTooltip = () => {
  return (
    <Tooltip
      labelFormatter={(label) => formatDate(label)}
      formatter={(value) => formatTotalSeconds(value as number)}
      contentStyle={tooltipStyle}
      itemStyle={{ color: "#dbdbdb" }}
      labelStyle={{ color: "#dbdbdb" }}
    />
  );
};

function enrichParkRunData(rawData: ParkRunData[]): EnrichedParkRunData[] {
  return rawData.map((d) => ({
    ...d,
    totalSeconds: convertTimeToSeconds(d.time),
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));
}

const RunningChart = () => {
  const [selectedEventName, setSelectedEventName] = useState(all);

  const enrichedData = enrichParkRunData(RunningData).sort(
    ({ dayRelativeToEpoch: a }, { dayRelativeToEpoch: b }) => a - b
  );

  const chartData =
    selectedEventName == all
      ? formatDataAsSeries(enrichedData)
      : enrichedData.filter((d) => d.eventName === selectedEventName);

  const bestTime: number = [...enrichedData].sort(
    ({ totalSeconds: a }, { totalSeconds: b }) => a - b
  )[0].totalSeconds;

  return (
    <Fragment>
      <label>
        Select location:{" "}
        <select
          value={selectedEventName}
          onChange={(e) => setSelectedEventName(e.target.value)}
        >
          {events.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
          <option value={all}>All</option>
        </select>
      </label>
      <LineChart
        width={700}
        height={600}
        data={chartData}
        margin={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <ParkRunXAxis />
        <ParkRunYAxis />
        <Legend />
        <ReferenceLine y={bestTime} strokeDasharray="3 3" />
        <ParkRunTooltip />
        {selectedEventName === all ? (
          events.map((event) => (
            <Line
              key={event}
              dataKey={event}
              stroke={LocationColorMap[event]}
              connectNulls
              name={event}
              type="monotone"
              strokeWidth={2}
            />
          ))
        ) : (
          <Line
            dataKey="totalSeconds"
            type="monotone"
            strokeWidth={2}
            stroke={LocationColorMap[selectedEventName]}
          />
        )}
      </LineChart>
    </Fragment>
  );
}

export default RunningChart;