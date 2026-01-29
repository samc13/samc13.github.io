"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Content from "../../scaffolding/Content";
import {
  formatBlogPostDate,
  matchesFormatYYYYMMDD,
} from "../../utils/DateUtils";
import markdown from "./../../core/markdown.module.scss";

const BLOG_RAW_URL =
  "https://raw.githubusercontent.com/samc13/public-blog/refs/heads/main/blogs/";

export function formatBlogPostTitle(filename: string): string {
  return matchesFormatYYYYMMDD(filename)
    ? formatBlogPostDate(filename)
    : filename;
}

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
        <h1>{formatBlogPostTitle(filename)}</h1>
        <Markdown>{content}</Markdown>
      </Content>
    </div>
  ) : (
    <></>
  );
}
