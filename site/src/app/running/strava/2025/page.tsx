"use client";
import { Fragment } from "react"
import RunningDistanceChart from "./RunningDistanceChart"
import stravaData from "./stravaData"
import SectionTitle from "@/app/scaffolding/SectionTitle";

export default function Year2025Page() {
    return (
        <Fragment>
            <SectionTitle text="2025 Running Distance" />
            <div>
            <RunningDistanceChart data={stravaData} />
            </div>
        </Fragment>
    )
}