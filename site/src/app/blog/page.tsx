"use client";

import { Fragment, useState } from "react";
import BlogPost from "./BlogPost";
import BlogList from "./BlogList";

import classes from "./blogpage.module.scss";
import clsx from "clsx";
import Divider from "../scaffolding/Divider";
import Content from "../scaffolding/Content";
import Footer from "../scaffolding/Footer";

import pageStyle from '../scaffolding/page.module.scss';

export default function Blog() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  return (
    <Fragment>
      <div className={clsx(classes["page-content"], pageStyle["margin-page"])}>
        <Content>
          Don&apos;t get too excited. These are short and low-effort. You could
          almost accuse it of being filler content to make this static site
          appear more maintained.
        </Content>
        <Divider />
        <BlogList onSelect={setSelectedFile} />
        <Divider />
        <BlogPost filename={selectedFile} />
      </div>
      <Footer />
    </Fragment>
  );
}
