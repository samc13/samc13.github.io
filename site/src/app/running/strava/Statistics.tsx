import { Fragment } from "react";
import { StravaRun } from "./2025/stravaData";
import KeyValue from "@/app/scaffolding/KeyValue";

function twoDecimals(input: number) {
    return Math.round(input * 100)/100;
}

function getRemainingWeeksInYear() {
    const now = new Date();
    // Last day of the current year (December 31)
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    // Calculate difference in milliseconds
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const remainingMs = endOfYear.getTime() - now.getTime();
    // Divide and round up
    return Math.ceil(remainingMs / msPerWeek);
  }

export default function Statistics({data}: {data: StravaRun[]}) {
    const totalDistance = twoDecimals(data.reduce((sum, run) => sum + run.distance, 0));
    const averageDistance = twoDecimals(totalDistance / data.length);
    const remainingWeeks = getRemainingWeeksInYear();
    const weeklyDistanceRequired = twoDecimals((1000 - totalDistance) / remainingWeeks);

    const stats = [
        { key: "Total distance", value: totalDistance, unit: "km"},
        { key: "Average distance", value: averageDistance, unit: "km"},
        { key: "Weekly distance required", value: weeklyDistanceRequired, unit: "km"},
    ];
    return (
        <Fragment>
            <KeyValue items={stats} />
        </Fragment>
    )
}