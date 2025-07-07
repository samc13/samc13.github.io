import classes from './sectiontitle.module.scss';

type SectionProps = {
    text: String
}

const SectionTitle = (props: SectionProps) => {
    return <div className={classes['section']}>
        <h2 className={classes['section-title']}>
            <span>{props.text}</span>
        </h2>
    </div>
}

export default SectionTitle;