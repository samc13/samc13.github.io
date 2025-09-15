"use client";
import Divider from "@/app/scaffolding/Divider";
import SectionTitle from "@/app/scaffolding/SectionTitle";
import { formatDateAsDaySinceEpoch } from "@/app/utils/DateUtils";
import { Fragment, useEffect, useState } from "react";
import Statistics from "../Statistics";
import MonthlyDistanceChart from "./MonthlyDistanceChart";
import RunningDistanceChart from "./RunningDistanceChart";
import { fetchStravaRunData, StravaRun } from "./stravaData";

export type EnrichedStravaRun = StravaRun & {
  dayRelativeToEpoch: number;
};

function enrich(data: StravaRun[]): EnrichedStravaRun[] {
  return data.map((d) => ({
    ...d,
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
  }));
}

export default function Year2025Page() {
  const [runData, setRunData] = useState<StravaRun[]>([]);
  useEffect(() => {
    fetchStravaRunData().then(setRunData);
  }, []);
  return (
    <Fragment>
      <SectionTitle text="2025 Running Distance" />
      <Statistics data={runData} />
      <Divider />
      <div>
        <RunningDistanceChart data={enrich(runData)} />
      </div>
      <Divider />
      <div>
        <MonthlyDistanceChart data={enrich(runData)} />
      </div>
    </Fragment>
  );
}
