import clsx from "clsx";

type TabGroupProps = {
    title: string;
    children: React.ReactNode;
    classes?: string;
}

export default function TabGroup(props: TabGroupProps) {
    const {title, children, classes} = props;
    return <div className={clsx(classes)}>
        <span>{title}</span>
        {children}
    </div>
}