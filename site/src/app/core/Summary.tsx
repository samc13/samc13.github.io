import { RiAmazonLine, RiDatabase2Line, RiJavaLine } from "@remixicon/react";
import Card from "../scaffolding/Card";
import fonts from "../core/fonts.module.scss";
import Socials from "./Socials";
import classes from "./summary.module.scss";
import iconClasses from "./../core/icons.module.scss";

import clsx from "clsx";
import SeparatorDot from "../scaffolding/SeparatorDot";

const Summary = () => {
  return (
    <Card classes={clsx(classes.section)}>
      <p className={clsx(fonts.code, classes.title)}>Sam Clarke</p>
      <p className={clsx(classes.subtitle)}>
        Software Engineer & Engineering Manager
      </p>
      <p className={clsx(fonts.code)}>
        <RiJavaLine className={clsx(iconClasses["inline-icon"])} />Java
        <SeparatorDot />
        <RiDatabase2Line className={clsx(iconClasses["inline-icon"])} />Postgres
        <SeparatorDot />
        <RiAmazonLine className={clsx(iconClasses["inline-icon"])} />AWS
      </p>
      <Socials />
    </Card>
  );
};

export default Summary;
