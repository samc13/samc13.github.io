"use client";
import { Fragment, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
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

import classes from "./../rechart.module.scss";
import styles from "./parkrun.module.scss";
import Select from "react-select";

const backgroundColor = 'var(--background)'

type EnrichedParkRunData = ParkRun & {
  totalSeconds: number;
  dayRelativeToEpoch: number;
};

const events = [...new Set(parkRunData.map((d) => d.eventName))];
const all = "All";

const eventOptions = [
  { value: all, label: all},
  ...events.map(e => ({value: e, label: e}))
];

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

  const bestTime: number = [...enrichedData]
  .filter(e => selectedEventName === all || e.eventName === selectedEventName)
  .sort(
    ({ totalSeconds: a }, { totalSeconds: b }) => a - b
  )[0].totalSeconds;

  return (
    <Fragment>
      <Select
        inputId="location-select"
        className={styles["my-select"]}
        options={eventOptions}
        value={eventOptions.find(opt => opt.value === selectedEventName)}
        onChange={opt => setSelectedEventName(opt ? opt.value : all)}
        isSearchable
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: "#fff", // <-- set your desired color here
          }),
          control: (provided) => ({ ...provided, backgroundColor: backgroundColor, color: "white" }),
          container: (provided) => ({ ...provided, minWidth: 220 }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#222",      // <-- dropdown background
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#333" : "#222",
            color: LocationColorMap[state.data.label] || "white",
          }),
        }}
      />
      <div className={clsx(classes["chart-container"])}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={700}
            height={600}
            data={chartData}
            margin={{ top: 25, bottom: 25, left: 25, right: 25 }}
          >
            <ParkRunXAxis />
            <ParkRunYAxis />
            <Legend />
            <ReferenceLine
              label="Park Run PR"
              y={bestTime}
              strokeDasharray="3 3"
            />
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
                name={selectedEventName}
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
