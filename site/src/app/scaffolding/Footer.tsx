import clsx from "clsx";
import { Fragment } from "react";

import classes from './footer.module.scss';

const Footer = () => {
  var currentYear = new Date().getFullYear();
  return (
    <Fragment>
      <div className={clsx(classes.footer)}>
      <p>&copy; {currentYear} Sam Clarke</p>
      </div>
    </Fragment>
  );
};

export default Footer;