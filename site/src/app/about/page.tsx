"use client"

import { Fragment, useEffect, useState } from "react";
import Content from "../scaffolding/Content";
import clsx from "clsx";
import { RiGhost2Fill } from "@remixicon/react";

import iconClasses from "./../core/icons.module.scss";
import Markdown from "react-markdown";
import markdown from "./../core/markdown.module.scss";
import Footer from "../scaffolding/Footer";

import pageStyle from '../scaffolding/page.module.scss';

export default function About() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/resources/aboutme.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);
  return (
    <Fragment>
      <div className={clsx(markdown["markdown-content"], pageStyle["margin-page"])}>
        <Content>
          <Markdown>{content}</Markdown>
          <RiGhost2Fill className={clsx(iconClasses["inline-icon"])} />
        </Content>
      </div>
      <Footer />
    </Fragment>
  );
}
