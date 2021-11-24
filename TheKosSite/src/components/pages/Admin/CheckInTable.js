import React, { Component } from "react";
import Axios from "axios";
import Cookies from 'js-cookie';

class CheckInTable extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };

    this.handleCheckIn = this.handleCheckIn.bind(this);
  }

  handleCheckIn() {
    if (this.state.data) {
      return this.state.data.map((item) => {
        const { id, user, date, workoutLength, workoutType, picture } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{user.username}</td>
            <td>{date}</td>
            <td>{workoutLength}</td>
            <td>{workoutType}</td>
            <td>
              <a href={picture}>Click</a>
            </td>
          </tr>
        );
      });
    }
  }

  componentDidMount() {
    Axios.get("http://127.0.0.1:8000/api/checkIn/Details/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((response) => {
        this.setState({
          data: response.data.checkIns,
        });
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
            <th>Date</th>
            <th>Workout Length</th>
            <th>Workout Type</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody className="table-body">{this.handleCheckIn()}</tbody>
      </table>
    );
  }
}

export default CheckInTable;
