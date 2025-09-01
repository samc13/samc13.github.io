"use client";
import classes from "./navbar.module.scss";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import fonts from "./../core/fonts.module.scss";
import Link from "next/link";

const NAV_LINKS = [{ href: "/home", label: "back" }];

export default function Navbar() {
  const pathname = usePathname();

  // Show empty navbar on homepage
  if (pathname.startsWith("/home/")) {
    return <nav className={classes.navbar} />;
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.navContent}>
        <div className={classes.links}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(classes.link, fonts.code)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
