import { Fragment } from "react";
import Summary from "../career/Summary";
import Contents from "./Contents";

export default function Home() {
  return (
    <Fragment>
      <Summary />
      <Contents />
    </Fragment>
  );
}
