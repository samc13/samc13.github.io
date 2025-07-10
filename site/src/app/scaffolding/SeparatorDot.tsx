import clsx from 'clsx';
import classes from './separatordot.module.scss';

const SeparatorDot = () => {
    return <span className={clsx(classes['dot'])}>·</span>
}

export default SeparatorDot;