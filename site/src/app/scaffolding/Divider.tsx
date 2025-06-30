import classnames from "./divider.module.scss";

export type DividerType = "section" | "subsection";

type DividerProps = {
  width?: number;
  dividerType?: DividerType;
};

const Divider = (props: DividerProps) => {
  const dividerType = props.dividerType ?? "subsection";
  const width = props.width ?? 80;
  return (
    <>
      <div
        className={classnames["divider"]}
        style={{ width: `${width}%` }}
      />
      {dividerType === "section" && (
        <div
          className={classnames["section-divider"]}
          style={{ width: `${width - 20}%` }}
        />
      )}
    </>
  );
};

export default Divider;
