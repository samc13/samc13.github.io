import { Fragment } from "react"
import ParkRunChart from "./ParkRunChart"
import SectionTitle from "@/app/scaffolding/SectionTitle"

export default function ParkRunsPage() {
    return (
        <Fragment>
            <SectionTitle text="Park Runs" />
            <div>
            <ParkRunChart />
            </div>
        </Fragment>
    )
}