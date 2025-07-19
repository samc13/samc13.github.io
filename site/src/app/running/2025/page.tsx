"use client";
import { Fragment } from "react"
import RunningDistanceChart from "./RunningDistanceChart"
import stravaData from "./stravaData"

export default function Year2025Page() {
    return (
        <Fragment>
            <h1>2025</h1>
            <div>
            <RunningDistanceChart data={stravaData} />
            </div>
        </Fragment>
    )
}