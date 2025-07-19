"use client";
import { Fragment, useState } from "react";
import { Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import LocationColorMap from "./seriesColours";
import DefaultRechartTooltip from "../../rechart/DefaultRechartTooltip";
import { convertTimeToSeconds, formatTotalSeconds } from "../../utils/TimeUtils";
import { formatDate, formatDateAsDaySinceEpoch } from "../../utils/DateUtils";
import parkRunData, { ParkRun } from "./parkRunData";

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
        <DefaultRechartTooltip
          labelFormatter={(label: number) => formatDate(label)}
          formatter={(value: string) => formatTotalSeconds(value as unknown as number)}
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
    </Fragment>
  );
};

export default ParkRunChart;
