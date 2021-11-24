import React, { Component } from "react";
import Axios from "axios";
import Cookies from 'js-cookie';


export default class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      Axios.post(
        "http://127.0.0.1:8000/api/get-user/",
        {},
        {
          headers: {
            Authorization: `Token ${id}`,
          },
        }
      )
        .then((response) => {
          this.setState({
            user: response.data.user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    const { user } = this.state;
    if (user) {
      return (
        <div>
          {user.first_name} {user.last_name} Your Account Has Been Activated!
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
