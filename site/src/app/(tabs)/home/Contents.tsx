import { Fragment } from "react";
import Link from "../../core/Link";

import clsx from "clsx";
import fonts from "./../../core/fonts.module.scss";
import classes from "./contents.module.scss";
import TabGroup from "./TabGroup";

export default function Contents() {
  return (
    <Fragment>
      <div className={clsx(classes["contents"], fonts["code"])}>
        <Link href="/career" text="Career." newTab={false} />
        <TabGroup title="&#9662; Running." classes={clsx(classes["tabgroup"])}>
          <Link href="/running/parkruns" text="Parkruns." newTab={false} />
          <Link href="/running/strava" text="Strava." newTab={false} />
          <Link href="/running/benchmarks" text="Benchmarks." newTab={false} />
        </TabGroup>
        <Link href="/blog" text="Blog." newTab={false} />
        <Link href="/about" text="About." newTab={false} />
      </div>
    </Fragment>
  );
}
