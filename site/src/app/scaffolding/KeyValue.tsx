import { Fragment } from "react";
import classes from "./keyvalue.module.scss";
import clsx from "clsx";

export type KeyValueContent = {
  key: string;
  value: string | number;
  unit?: string;
};

type KeyValueProps = {
  items: KeyValueContent[];
};

export default function KeyValue(props: KeyValueProps) {
  return (
    <Fragment>
      <div className={classes.list}>
        {props.items.map((kv, i) => {
          const unit = kv.unit === undefined ? "" : ` ${kv.unit}`;
          return (
            <div key={i} className={clsx(classes.wrapper)}>
              <div className={clsx(classes.key)}>
                <label>{kv.key}: </label>
              </div>
              <div className={clsx(classes.value)}>
                <span>
                  {kv.value}
                  {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
