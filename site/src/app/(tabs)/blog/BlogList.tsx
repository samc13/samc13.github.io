"use client";

import { Fragment, useEffect, useState } from "react";
import {
  fetchGitHubDirectoryContents,
  GITHUB_REPOS,
} from "../../utils/GithubDataFetcher";
import fonts from "./../../core/fonts.module.scss";

import clsx from "clsx";
import classes from "./bloglist.module.scss";
import { formatBlogPostTitle } from "./BlogPost";

const BlogList = ({ onSelect }: { onSelect: (filename: string) => void }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchGitHubDirectoryContents({
      ...GITHUB_REPOS.PUBLIC_BLOG,
      path: "blogs",
    })
      .then((data) => {
        const mdFiles = data
          .filter((item) => item.type === "file")
          .filter((item) => item.name.endsWith(".md"))
          .map((item) => item.name);
        setFiles(mdFiles);
        setLoading(false);
      })
      .catch((err) => {
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
            <button
              onClick={() => {
                onSelect(file);
                setActiveItem(file);
              }}
            >
              <p
                className={clsx(
                  fonts["code"],
                  file == activeItem ? classes["active-item"] : "",
                )}
              >
                {formatBlogPostTitle(file)}
              </p>
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default BlogList;
