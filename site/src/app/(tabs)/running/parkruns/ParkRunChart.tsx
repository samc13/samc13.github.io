"use client";
import { XAxisDefault, YAxisDefaults } from "@/app/rechart/AxisDefaults";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import DefaultRechartTooltip from "../../../rechart/DefaultRechartTooltip";
import { formatAsDaySinceEpoch, formatDate } from "../../../utils/DateUtils";
import { formatTotalSeconds } from "../../../utils/TimeUtils";
import {
  EnrichedParkRunData,
  enrichParkRunData,
  fetchParkRunData,
  ParkRun,
} from "./parkRunData";
import LocationColorMap from "./seriesColours";

import Select from "react-select";
import styles from "../../../scaffolding/dropdown.module.scss";
import classes from "./../rechart.module.scss";

const backgroundColor = "var(--background)";

const all = "All";
const lastSixMonths = "lastSixMonths";

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
      row[event] = entry ? entry.totalSeconds : undefined;
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

const ParkRunChart = () => {
  const [selectedEventName, setSelectedEventName] = useState(all);
  const [selectedYear, setSelectedYear] = useState(lastSixMonths);
  const [parkRuns, setParkRuns] = useState<ParkRun[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchParkRunData().then(setParkRuns);
  }, []);

  const events = [...new Set(parkRuns.map((d) => d.eventName))];
  const eventOptions = [
    { value: all, label: all },
    ...events.map((e) => ({ value: e, label: e })),
  ];
  const years = [...new Set(parkRuns.map((r) => r.date.slice(0, 4)))];
  const yearOptions = [
    { value: all, label: all },
    { value: lastSixMonths, label: "Last Six Months" },
    ...years.map((y) => ({ value: y, label: y })),
  ];

  const enrichedData = enrichParkRunData(parkRuns).sort(
    ({ dayRelativeToEpoch: a }, { dayRelativeToEpoch: b }) => a - b
  );

  const filteredData = enrichedData.filter((d) => {
    if (selectedYear == all) {
      return true;
    }
    if (selectedYear == lastSixMonths) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const sixMonthsAgoDay = formatAsDaySinceEpoch(sixMonthsAgo);
      return d.dayRelativeToEpoch > sixMonthsAgoDay;
    }
    return selectedYear == all || d.date.slice(0, 4) === selectedYear;
  });

  // If there are many series, we must reformat the data for Rechart
  const chartData =
    selectedEventName == all
      ? formatDataAsSeries(filteredData)
      : filteredData.filter((d) => d.eventName === selectedEventName);

  const bestTime: number = [...filteredData]
    .filter(
      (e) => selectedEventName === all || e.eventName === selectedEventName
    )
    .sort(({ totalSeconds: a }, { totalSeconds: b }) => a - b)[0]?.totalSeconds;

  return (
    <Fragment>
      {isClient && (
        <>
          <Select
            inputId="location-select"
            className={styles["my-select"]}
            options={eventOptions}
            value={eventOptions.find((opt) => opt.value === selectedEventName)}
            onChange={(opt) => setSelectedEventName(opt ? opt.value : all)}
            isSearchable
            styles={{
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: backgroundColor,
                color: "white",
              }),
              container: (provided) => ({ ...provided, minWidth: 220 }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#222", // <-- dropdown background
                color: "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#333" : "#222",
                color: LocationColorMap[state.data.label] || "white",
              }),
            }}
          />
          <Select
            inputId="year-select"
            className={styles["my-select"]}
            options={yearOptions}
            value={yearOptions.find((opt) => opt.value === selectedYear)}
            onChange={(opt) => setSelectedYear(opt ? opt.value : all)}
            isSearchable
            styles={{
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: backgroundColor,
                color: "white",
              }),
              container: (provided) => ({ ...provided, minWidth: 220 }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#222", // <-- dropdown background
                color: "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#333" : "#222",
                color: "white",
              }),
            }}
          />
        </>
      )}
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
            <ReferenceLine label="Best" y={bestTime} strokeDasharray="3 3" />
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
