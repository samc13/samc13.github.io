"use client";
import { Fragment, useState } from "react";
import { Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import LocationColorMap from "./seriesColours";
import DefaultRechartTooltip from "../../rechart/DefaultRechartTooltip";
import {
  convertTimeToSeconds,
  formatTotalSeconds,
} from "../../utils/TimeUtils";
import { formatDate, formatDateAsDaySinceEpoch } from "../../utils/DateUtils";
import parkRunData, { ParkRun } from "./parkRunData";
import { XAxisDefault, YAxisDefaults } from "@/app/rechart/AxisDefaults";
import clsx from "clsx";

import classes from './../rechart.module.scss';

type EnrichedParkRunData = ParkRun & {
  totalSeconds: number;
  dayRelativeToEpoch: number;
};

const events = [...new Set(parkRunData.map((d) => d.eventName))];
const all = "All";

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
      {...YAxisDefaults}
      tickFormatter={formatTotalSeconds}
      tickCount={15}
      domain={[18 * 60, 29 * 60]}
    />
  );
};

const ParkRunXAxis = () => {
  return (
    <XAxis
      {...XAxisDefault}
      dataKey="dayRelativeToEpoch"
      tickCount={6}
      tickFormatter={formatDate}
      type="number"
    />
  );
};

function enrichParkRunData(rawData: ParkRun[]): EnrichedParkRunData[] {
  return rawData.map((d) => ({
    ...d,
    totalSeconds: convertTimeToSeconds(d.time),
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));
}

const ParkRunChart = () => {
  const [selectedEventName, setSelectedEventName] = useState(all);

  const enrichedData = enrichParkRunData(parkRunData).sort(
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
      <div className={clsx(classes["chart-container"])}>
        <ResponsiveContainer
          width="100%"
          height={400}
        >
      <LineChart
        width={700}
        height={600}
        data={chartData}
        margin={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <ParkRunXAxis />
        <ParkRunYAxis />
        <Legend />
        <ReferenceLine label="Park Run PR" y={bestTime} strokeDasharray="3 3" />
        <DefaultRechartTooltip
          labelFormatter={(label: number) => formatDate(label)}
          formatter={(value: string) =>
            formatTotalSeconds(value as unknown as number)
          }
        />
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
      </ResponsiveContainer>
      </div>
    </Fragment>
  );
};

export default ParkRunChart;
