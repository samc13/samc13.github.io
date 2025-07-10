import clsx from "clsx";
import Link from "../core/Link";
import Card from "../scaffolding/Card";

import iconClasses from "./../core/icons.module.scss";
import flexClasses from "../scaffolding/flex.module.scss";
import { RiGithubFill, RiLinkedinBoxFill, RiLinkedinBoxLine } from "@remixicon/react";

const Socials = () => {
  return (
    <Card>
      <div className={clsx(flexClasses["spread-row-content"])}>
        <p>
          <RiGithubFill className={clsx(iconClasses['inline-icon'])} />
          GitHub:
          <Link href="https://github.com/samc13" text="@samc13" />
        </p>
        <p>
          <RiLinkedinBoxFill className={clsx(iconClasses['inline-icon'])} />
          LinkedIn:
          <Link
            href="https://www.linkedin.com/in/samclarke13"
            text="samclarke13"
          />
        </p>
      </div>
    </Card>
  );
};

export default Socials;
