"use client";

import { Fragment, useState } from "react";
import Card from "../scaffolding/Card";
import BlogPost from "./BlogPost";
import BlogList from "./BlogList";

import classes from './blogpage.module.scss';
import clsx from "clsx";
import Divider from "../scaffolding/Divider";

export default function Blog() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  return (
    <Fragment>
      <div className={clsx(classes["page-content"])}>
        <div>
          Don't get too excited. These are short and low-effort. You could
          almost accuse it of being filler content to make this static site
          appear more maintained.
        </div>
        <Divider />
      <BlogList onSelect={setSelectedFile} />
      <Divider />
      <BlogPost filename={selectedFile} />
      </div>
    </Fragment>
  );
}
