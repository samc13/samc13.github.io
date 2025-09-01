import clsx from 'clsx';
import classes from './link.module.scss';
import NextLink from 'next/link';

type LinkProps = {
    href: string,
    text?: string,
    className?: string
    newTab?: boolean
}

function isExternal(link: string) {
    return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('www.');
}

const Link = (props: LinkProps) => {
    const text = props.text ?? props.href;
    const newTab = props.newTab ?? true;
    const className = clsx(classes['custom-link'], props.className);
    return isExternal(props.href) ? (
            <a href={props.href} className={className} target={newTab ? "_blank" : ""}>{text}</a>
        ) : (
            <NextLink href={props.href} className={className}>
                {props.text}
            </NextLink>
        )
}

export default Link;