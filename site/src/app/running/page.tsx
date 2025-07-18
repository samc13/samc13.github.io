"use client";
import moment from "moment";
import { Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";

const epoch: moment.Moment = moment("1970-01-01", "YYYY-MM-DD");

const runningData = [
  {
    eventName: "Roundhay",
    date: "2025-06-28",
    position: 102,
    time: "26:17",
  },
  {
    eventName: "Roundhay",
    date: "2025-03-15",
    position: 54,
    time: "23:56",
  },
  {
    eventName: "Roundhay",
    date: "2024-11-02",
    position: 57,
    time: "23:08",
  },
  {
    eventName: "Roundhay",
    date: "2024-10-12",
    position: 166,
    time: "28:23",
  },
  {
    eventName: "Roundhay",
    date: "2023-11-18",
    position: 46,
    time: "23:40",
  },
];

function convertTimeToSeconds(rawTime: string): number {
    const [mm, ss] = rawTime.split(":").map(Number);
  return mm * 60 + ss;
}

function formatTotalSeconds(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${m}m ${sec}s`;
}

function formatTimeForDisplay(rawTime: string): string {
    const [mm, ss] = rawTime.split(":").map(Number);
    return `${mm}m ${ss}s`;
}

function formatDateAsDaySinceEpoch(rawDate: string): number {
    const date = moment(rawDate, "YYYY-MM-DD");
    return Math.floor(date.diff(epoch, "days"));
}

function formatDate(tick: number): string {
    const e = epoch.clone();
    const date = e.add(tick, "days");
    return date.format("DD MMM YY");
}

const tooltipStyle = {
    backgroundColor: "#364156",
    border: "1px solid #333",
    color: "#ededed"
};

export default function Running() {

    const formattedData = runningData.map(d => ({
        ...d,
        totalSeconds: convertTimeToSeconds(d.time),
        timeLabel: {value: formatTimeForDisplay(d.time)},
        numericDays: formatDateAsDaySinceEpoch(d.date)
    }));
    const bestTime:number = [...formattedData].sort(({totalSeconds:a}, {totalSeconds:b}) => a - b)[0].totalSeconds;

  return (
    <LineChart width={800} height={750} data={formattedData} margin={{top: 25, bottom: 25, left: 25, right: 25}}>
      <Line dataKey="totalSeconds" type="monotone" strokeWidth={2} stroke="#42f5cb" />
      <XAxis dataKey="numericDays" type="number" domain={["auto", "auto"]} tickCount={6} tickFormatter={formatDate} stroke="#CCC9DC" />
      <YAxis dataKey="totalSeconds" width={100} tickFormatter={formatTotalSeconds} tickCount={15} domain={[15*60, 30*60]} stroke="#CCC9DC" />
      <ReferenceLine y={bestTime} strokeDasharray="3 3" />
      <Tooltip 
        labelFormatter={(label) => formatDate(label)}
        formatter={(value) => formatTotalSeconds(value as number)} contentStyle={tooltipStyle} itemStyle={{color: "#CCC9DC"}} labelStyle={{color: "#CCC9DC"}} />
    </LineChart>
  );
}
