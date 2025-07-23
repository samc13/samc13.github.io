import { Fragment } from "react";
import Link from "../core/Link";

import classes from './contents.module.scss';
import fonts from './../core/fonts.module.scss'
import clsx from "clsx";

export default function Contents() {
  return (
    <Fragment>
      <div className={clsx(classes['contents'], fonts['code'])}>
        <Link href="/career" text="Career." newTab={false} />
        <Link href="/running/parkruns" text="Parkruns." newTab={false} />
        <Link href="/running/strava/2025" text="Strava." newTab={false} />
      </div>
    </Fragment>
  );
}
