import clsx from "clsx";
import Link from "../core/Link";
import Card from "../scaffolding/Card";

import flexClasses from "../scaffolding/flex.module.scss";

const Socials = () => {
  return (
    <Card>
      <div className={clsx(flexClasses["spread-row-content"])}>
        <p>
          🧑‍💻 GitHub:
          <Link href="https://github.com/samc13" text="@samc13" />
        </p>
        <p>
          🌍 LinkedIn:
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
