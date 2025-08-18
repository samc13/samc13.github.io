import clsx from 'clsx';
import classes from './content.module.scss';

type ContentProps = {
    children: React.ReactNode;
    classes?: string;
}

const Content = (props: ContentProps) => {
    const {children} = props;
    return (
        <>
            <div className={clsx(classes.content, props.classes && props.classes)}>
                {children}
            </div>
        </>
    )
}

export default Content;