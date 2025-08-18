"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import markdown from "./../core/markdown.module.scss";
import Markdown from "react-markdown";
import Card from "../scaffolding/Card";
import Content from "../scaffolding/Content";
import { formatBlogPostDate } from "../utils/DateUtils";

const BLOG_RAW_URL =
  "https://raw.githubusercontent.com/samc13/public-blog/refs/heads/main/blogs/";

export default function BlogPost({ filename }: { filename: string }) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!filename) return;
    fetch(BLOG_RAW_URL + filename)
      .then((res) => res.text())
      .then(setContent);
  }, [filename]);

  return filename ? (
    <div className={clsx(markdown["markdown-content"])}>
      <Content>
        <h1>{formatBlogPostDate(filename)}</h1>
        <Markdown>{content}</Markdown>
      </Content>
    </div>
  ) : (
    <></>
  );
}
