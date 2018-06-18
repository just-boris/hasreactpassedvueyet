import React from "react";
import axios from "axios";
import Content from "./components/Content/index";
import GithubCorner from "./components/GithubCorner";

const FUNCTIONS_ENDPOINT =
  "https://wt-13e53fa81a1f88b8fd161c9e57aeaac4-0.sandbox.auth0-extend.com/fetchGithubStars";

function Loading() {
  return <p>Loading...</p>;
}

function Error() {
  return (
    <React.Fragment>
      <h1 class="error">Error</h1>
      <p>
        Couldn't retrieve any data. The API rate limits might have kicked in. Just wait a bit and
        try again.
      </p>
    </React.Fragment>
  );
}

function Reload({ reloading, onClick }) {
  return (
    <span className="reload" onClick={onClick}>
      <svg
        className={reloading ? "reloading" : undefined}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path
          fill="#333333"
          d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </span>
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: null,
      error: false,
      reloading: false
    };
  }

  async fetchRepos() {
    try {
      const { data: res } = await axios.get(FUNCTIONS_ENDPOINT);
      if (res.errors && res.errors.length) {
        this.setState({
          error: true,
          repos: null
        });
        console.log(res.errors);
      } else {
        this.setState({
          error: false,
          repos: res.data
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async reload() {
    if (this.state.reloading) return;
    this.setState({
      reloading: true
    });
    await this.fetchRepos();
    setTimeout(() => {
      this.setState({
        reloading: false
      });
    }, 900);
  }

  componentDidMount() {
    this.fetchRepos();
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
      document.body.classList.remove("no-touch");
    }
  }

  render() {
    const { reloading, repos, error } = this.state;
    return (
      <React.Fragment>
        <GithubCorner />
        <p>Has Vue passed React yet?</p>
        {repos && <Content repos={repos} reloading={reloading} />}
        {repos && <Reload onClick={this.reload.bind(this)} reloading={reloading} />}
        {error && <Error />}
        {!repos && <Loading />}
      </React.Fragment>
    );
  }
}
