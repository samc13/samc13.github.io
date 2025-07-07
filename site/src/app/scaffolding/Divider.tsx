import classnames from "./divider.module.scss";

type DividerProps = {
  width?: number;
};

const Divider = (props: DividerProps) => {
  const width = props.width ?? 60;
  return (
    <>
      <div
        className={classnames["divider"]}
        style={{ width: `${width}%` }}
      />
    </>
  );
};

export default Divider;
