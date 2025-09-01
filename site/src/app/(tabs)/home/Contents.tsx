import { Fragment } from "react";
import Link from "../../core/Link";

import classes from './contents.module.scss';
import fonts from './../../core/fonts.module.scss'
import clsx from "clsx";
import TabGroup from "./TabGroup";

export default function Contents() {
  return (
    <Fragment>
      <div className={clsx(classes['contents'], fonts['code'])}>
        <Link href="/career" text="Career." newTab={false} />
        <TabGroup title="&#9662; Running." classes={clsx(classes["tabgroup"])}>
            <Link href="/running/parkruns" text="Parkruns." newTab={false} />
            <Link href="/running/strava/2025" text="Strava." newTab={false} />
        </TabGroup>
        <Link href="/blog" text="Blog." newTab={false} />
        <Link href="/about" text="About." newTab={false} />
      </div>
    </Fragment>
  );
}
