import React from "react";
import { ReactComponent as GithubIcon } from "./GithubIcon.svg";
import "./index.css";

export default function GithubCorner() {
  return (
    <div className="github-corner">
      <a
        href="https://github.com/just-boris/hasreactpassedvueyet"
        className="github-corner"
        target="_blank"
        aria-label="View source on Github"
      >
        <GithubIcon />
      </a>
    </div>
  );
}
