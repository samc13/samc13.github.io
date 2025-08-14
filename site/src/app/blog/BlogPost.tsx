"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

const BLOG_RAW_URL = "https://raw.githubusercontent.com/samc13/public-blog/refs/heads/main/blogs/";

export default function BlogPost({ filename }: { filename: string }) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!filename) return;
    fetch(BLOG_RAW_URL + filename)
      .then(res => res.text())
      .then(setContent);
  }, [filename]);

  return (
    <div>
      {filename ? <ReactMarkdown>{content}</ReactMarkdown> : <></>}
    </div>
  );
}