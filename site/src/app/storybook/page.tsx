import Link from "../core/Link";
import Divider from "../scaffolding/Divider";


export default function Storybook() {
    return (<>
        <div className="heading">
            <h1>Heading</h1>
        </div>
        <div className="subheading">
            <h1>Subheading</h1>
        </div>
        <div className="content">
            <p>Some content</p>
            <p>Another paragraph</p>
        </div>
        <Divider />
        <div className="content">
            <p>Some more content</p>
            <p>Yet another paragraph</p>
        </div>
        <Divider />
        <div className="content">
            <p>Some more content contaning a <Link href="google.com" text="link" /> within a sentence.</p>
            <p>
            <Link href="google.com" text="A link"/> at the start of some text
            </p>
            <p>
                Some text with a link at the 
                <Link href="google.com" text="end"/>.
            </p>
        </div>
    </>)
}