import React, { Component } from "react";

import Axios from "axios";
import Cookies from "js-cookie";

export default class ChallengeSubmissionList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.getList = this.getList.bind(this);
  }

  getList = () => {
    Axios.get("http://127.0.0.1:8000/api/submitted-challenges/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((response) => {
        this.setState({ list: response.data });
      })
      .catch((error) => console.log(error));
  };

  handleSubmissions = () => {
    if (this.state.list) {
      return this.state.list.map((submission) => {
        return (
          <div className="challenge submission" key={submission.id}>
            <div className="challenge-title">{submission.title}</div>
            <div className="challenge-value">{submission.value}</div>
          </div>
        );
      });
    }
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <div className="challengesDone">
        <div className="header">Submitted Challenges</div>
        {this.handleSubmissions()}
      </div>
    );
  }
}
