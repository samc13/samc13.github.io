"use client";
import { Fragment, useEffect, useState } from "react";
import RunningDistanceChart from "./RunningDistanceChart";
import SectionTitle from "@/app/scaffolding/SectionTitle";
import { fetchStravaRunData, StravaRun } from "./stravaData";
import Statistics from "../Statistics";
import Divider from "@/app/scaffolding/Divider";
import Footer from "@/app/structure/Footer";

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
        <RunningDistanceChart data={runData} />
      </div>
      <Footer />
    </Fragment>
  );
}
