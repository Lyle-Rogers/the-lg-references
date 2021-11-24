import React, { Component } from "react";
import Axios from "axios";
import User from "./User";
import Cookies from 'js-cookie';


class UserTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: null,
    };

    this.handleUsers = this.handleUsers.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }
    
  handleUsers() {
    if(this.state.users){
      return this.state.users.map(user => {
        return <User key={user.id} user={user} />
      })
    }
  }

  componentDidMount() {
    Axios.get("http://127.0.0.1:8000/api/admin/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((response) => {
        this.setState({
          users: response.data.users,
        });
        // this.handleUsers();
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
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Shirt Size</th>
            <th>Date Joined</th>
            <th>Registration</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="table-body">{this.handleUsers()}</tbody>
      </table>
    );
  }
}

export default UserTable;
