import Card from "../scaffolding/Card";
import Divider from "../scaffolding/Divider";
import fonts from "../scaffolding/fonts.module.scss";
import Socials from "./Socials";
import classes from "./summary.module.scss";

import clsx from "clsx";

const Summary = () => {
  return (
    <Card classes={clsx(classes.section)}>
      <p className={clsx(fonts.code, classes.title)}>Sam Clarke</p>
      <p className={clsx(classes.subtitle)}>Software Engineer & Engineering Manager</p>
      <p className={clsx(fonts.code)}>Java · Postgres · AWS</p>
      <Socials />
    </Card>
  );
};

export default Summary;
