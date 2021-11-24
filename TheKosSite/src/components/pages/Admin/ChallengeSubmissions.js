import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

class ChallengeSubmissions extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };

    this.handleData = this.handleData.bind(this);
  }

  handleData() {
    if (this.state.data) {
      return this.state.data.map((item) => {
        const {id, user, challenge, time, amount} = item
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{challenge ? challenge.title : null}</td>
            <td>{time ? "Time: " + time : "Amount: " + amount}</td>
          </tr>
        );
      });
    }
  }

  componentDidMount() {
    Axios.get("http://127.0.0.1:8000/api/admin/challengeSubmissions/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => {
        this.setState({
          data: res.data.challenges
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr className="table-head">
            <th>ID</th>
            <th>User</th>
            <th>Challenge</th>
            <th>Attempt</th>
          </tr>
        </thead>
        <tbody className="table-body">{this.handleData()}</tbody>
      </table>
    );
  }
}

export default ChallengeSubmissions;