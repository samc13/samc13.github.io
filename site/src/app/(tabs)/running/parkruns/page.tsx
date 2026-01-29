import Content from "@/app/scaffolding/Content";
import SectionTitle from "@/app/scaffolding/SectionTitle";
import { Fragment } from "react";
import ParkRunChart from "./ParkRunChart";
import ParkRunStats from "./ParkRunStats";

export default function ParkRunsPage() {
  return (
    <Fragment>
      <Content>
        <SectionTitle text="Park Runs" />
        <div>
          <ParkRunChart />
        </div>
        <SectionTitle text="Statistics" />
        <div>
          <ParkRunStats />
        </div>
      </Content>
    </Fragment>
  );
}
