import React from "react";
import { VueIcon, ReactIcon, StarIcon } from "../icons";

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export default class Content extends React.Component {
  vueStars() {
    return this.props.repos.vue.stargazers.totalCount;
  }

  reactStars() {
    return this.props.repos.react.stargazers.totalCount;
  }

  render() {
    const { repos } = this.props;
    const vueStars = this.vueStars();
    const reactStars = this.reactStars();
    const vueHasPassedReact = vueStars > reactStars;
    const reactPassedVue = vueStars < reactStars;
    const tie = vueStars === reactStars;
    return (
      <React.Fragment>
        {!tie ? <h1>{reactPassedVue ? "YES" : "NO"}</h1> : <h1 className="pad">TIE!</h1>}
        <p>
          {reactPassedVue && (
            <small className="away">
              Ahead by {formatNumber(reactStars - vueStars)}{" "}
              {reactStars - vueStars === 1 ? "star" : "stars"}!
            </small>
          )}
          {vueHasPassedReact && (
            <small className="ahead">
              Only {formatNumber(vueStars - reactStars)}{" "}
              {vueStars - reactStars === 1 ? "star" : "stars"} away!
            </small>
          )}
        </p>
        <ul>
          <li>
            <a href={repos.react.url} target="_blank">
              <ReactIcon />
              <span>{formatNumber(reactStars)}</span>
              <StarIcon />
            </a>
          </li>
          <li>
            <a href={repos.vue.url} target="_blank">
              <VueIcon />
              <span>{formatNumber(vueStars)}</span>
              <StarIcon />
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
