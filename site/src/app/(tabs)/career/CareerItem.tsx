
import clsx from 'clsx';
import Card from '../../scaffolding/Card';

import classes from './careeritem.module.scss';

type CareerItemProps = {
    title: React.ReactNode,
    subtitle?: React.ReactNode,
    items: React.ReactNode
}

const CareerItem = (props: CareerItemProps) => {
    return (
        <Card>
            <h2 className={clsx(classes.title)}>{props.title}</h2>
            {props.subtitle && (<p className={clsx(classes.subtitle)}>{props.subtitle}</p>)}
            {props.items && (props.items)}
        </Card>
    )
}

export default CareerItem;