import React, { Component } from "react";
import moment from "moment";


export default class User extends Component {
  constructor(props) {
    super(props);
  }

  handleHeight(height){
    let inches = height % 12
    let feet = (height - inches)/12

    return(feet+"'"+inches+'"');
  }

  render() {
    const { username, first_name, last_name, email, profile, date_joined} = this.props.user
    console.log(this.props.user)
    return (
      <tr>
        <td>{username}</td>
        <td>{first_name} {last_name}</td>
        <td>{email}</td>
        <td>{moment(profile.age).format("MM/DD/YYYY")}</td>
        <td>{profile.gender}</td>
        <td>{this.handleHeight(profile.height)}</td>
        <td>{profile.weight} lbs</td>
        <td>{profile.shirt_size}</td>
        <td>{moment(date_joined).format("MM/DD/YYYY")}</td>
        <td>{profile.registration ? "True" : "False"}</td>
        <td>{profile.roles}</td>
      </tr>
    );
  }
}
