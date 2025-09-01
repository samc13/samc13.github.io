"use client";

import { Fragment, useEffect, useState } from "react";
import { formatBlogPostDate } from "../../utils/DateUtils";
import fonts from "./../../core/fonts.module.scss";

import classes from './bloglist.module.scss';
import clsx from "clsx";

const BLOG_API_URL =
  "https://api.github.com/repos/samc13/public-blog/contents/blogs"; // Hardcoded? Woof 🐶

  type GithubContentItem = { 
    name: string;
    type: 'file' | 'dir' | 'symlink' | 'submodule';
    // It has other stuff too but we don't care about any of that (yet)
  }

const BlogList = ({ onSelect }: { onSelect: (filename: string) => void }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(BLOG_API_URL)
      .then((res) => {
        if (!res.ok) {
          // Log error and set error state
          setError(`GitHub API error: ${res.status} ${res.statusText}`);
          console.error("GitHub API error:", res.status, res.statusText);
          setLoading(false);
          return Promise.reject(new Error(`GitHub API error: ${res.status}`));
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setError("Unexpected response format from GitHub API.");
          console.error("Unexpected data format:", data);
          setLoading(false);
          return;
        }
        // Only include markdown files
        const mdFiles = data
          .filter(
            (item: GithubContentItem) =>
              item.type === "file" && /^[0-9]{8}\.md$/.test(item.name)
          )
          .map((item: GithubContentItem) => item.name);
        setFiles(mdFiles);
        setLoading(false);
      })
      .catch((err) => {
        // Catch network/other errors
        setError("Failed to fetch blog posts: " + err.message);
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <div className={clsx(classes["blog-list"])}>
        {loading && (
          <div style={{ padding: "1em" }}>
            <span role="status" aria-live="polite">
              Waiting on your WiFi...
            </span>
          </div>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
          {files.map((file, i) => (
            <div key={i} className={clsx(classes["blog-item"])}>
              <button onClick={() => {
                onSelect(file);
                setActiveItem(file);
                }}>
                <p className={clsx(fonts["code"], file == activeItem ? classes["active-item"] : "")}>{formatBlogPostDate(file)}</p>
              </button>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default BlogList;