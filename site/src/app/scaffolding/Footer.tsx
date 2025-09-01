import clsx from "clsx";
import { Fragment } from "react";

import classes from './footer.module.scss';
import Link from "../core/Link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Fragment>
      <div className={clsx(classes.footer)}>
      <p>&copy; {currentYear} Sam Clarke</p>
      <p className={clsx(classes['subtext'])}>Hosted in GitHub pages. If you&apos;d like to see how novice my TypeScript/React is, you can browse the repo in <Link href="https://github.com/samc13/samc13.github.io" text="GitHub" />.</p>
      </div>
    </Fragment>
  );
};

export default Footer;