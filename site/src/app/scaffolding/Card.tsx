import clsx from 'clsx';
import classnames from './card.module.scss';

type CardProps = {
    children: React.ReactNode;
    classes?: String;
}

const Card = (props: CardProps) => {
    const {children} = props;
    return (
        <>
            <div className={clsx(classnames.card, props.classes && props.classes)}>
                {children}
            </div>
        </>
    )
}

export default Card;