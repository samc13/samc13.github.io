import classnames from "./divider.module.scss";

export type DividerColor = "grey" | "dark";
export type DividerType = "section" | "subsection";

type DividerProps = {
  width: number;
  dividerColor: DividerColor;
  dividerType?: DividerType;
};

const Divider = (props: DividerProps) => {
  const dividerType = props.dividerType ?? "subsection";
  return (
    <>
      <div
        className={classnames["divider"]}
        style={{ width: `${props.width}%` }}
      />
      {dividerType === "section" && (
        <div
          className={classnames["section-divider"]}
          style={{ width: `${props.width - 20}%` }}
        />
      )}
    </>
  );
};

export default Divider;
