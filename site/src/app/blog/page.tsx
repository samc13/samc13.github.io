"use client";

import { Fragment, useEffect, useState } from "react";
import Card from "../scaffolding/Card";
import BlogPost from "./BlogPost";
import { formatBlogPostDate } from "../utils/DateUtils";
import fonts from "./../core/fonts.module.scss";

const BLOG_API_URL =
  "https://api.github.com/repos/samc13/public-blog/contents/blogs"; // Hardcoded? Woof 🐶

const BlogList = ({ onSelect }: { onSelect: (filename: string) => void }) => {
  const [files, setFiles] = useState<string[]>([]);
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
            (item: any) =>
              item.type === "file" && /^[0-9]{8}\.md$/.test(item.name)
          )
          .map((item: any) => item.name);
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
    <div>
      {loading && (
        <div style={{ padding: "1em" }}>
          <span role="status" aria-live="polite">
            Waiting on your WiFi...
          </span>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {files.map((file) => (
          <li key={file}>
            <button onClick={() => onSelect(file)}>
              <p className={fonts["code"]}>{formatBlogPostDate(file)}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Blog() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  return (
    <Fragment>
      <Card>
        <div>
          Don't get too excited. These are short and low-effort. You could
          almost accuse it of being filler content to make this static site
          appear more maintained.
        </div>
      </Card>
      <BlogList onSelect={setSelectedFile} />
      <BlogPost filename={selectedFile} />
    </Fragment>
  );
}
