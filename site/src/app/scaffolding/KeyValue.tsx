import { Fragment } from "react";
import classes from './keyvalue.module.scss'
import clsx from "clsx";

type KeyValue = {
  key: string;
  value: string | number;
  unit?: string;
};

type KeyValueProps = {
  items: KeyValue[];
};

export default function KeyValue(props: KeyValueProps) {
  return (
    <Fragment>
      {props.items.map((kv, i) => {
        const unit = kv.unit === undefined ? '' : ` ${kv.unit}`;
        return (
          <div key={i} className={clsx(classes.wrapper)}>
            <div className={clsx(classes.key)}>
            <label>{kv.key}: </label>
            </div>
            <div className={clsx(classes.value)}>
            <span>{kv.value}{unit}</span>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
