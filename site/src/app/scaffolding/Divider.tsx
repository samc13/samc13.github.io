import classnames from './divider.module.scss';

export type DividerColor = 'grey' | 'dark';

type DividerProps = {
  width: number;
  dividerColor: DividerColor;
};

const Divider = (props: DividerProps) => {
  return (
    <>
      <div className={classnames.divider} style={{ width: `${props.width}%` }}></div>
    </>
  );
};

export default Divider;
