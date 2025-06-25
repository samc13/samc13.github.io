import clsx from 'clsx';
import classes from './link.module.scss';

type LinkProps = {
    href: string,
    text?: String,
    className?: string
}

const Link = (props: LinkProps) => {
    const text = props.text ?? props.href;
    const className = clsx(classes.link, props.className);
    return (
        <a href={props.href} className={className} target='_blank'>{text}</a>
    )
}

export default Link;