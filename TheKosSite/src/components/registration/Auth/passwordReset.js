import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router";

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password_1: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:8000/api/password-reset/", {
      password: this.state.password_1,
      token: this.props.match.params.token,
    })
      .then((response) => {
        this.setState({ response: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.response === "success") {
      return <Redirect to="/login" />;
    } else {
      return (
        <form className="forgotPassword" onSubmit={(e) => this.handleSubmit(e)}>
          <label> Please put in your new password.</label>

          <input
            name="password_1"
            type="password"
            required
            onChange={(e) => this.handleChange(e)}
          />

          <label> Confirm your new password.</label>

          <input
            name="password_2"
            type="password"
            required
            onChange={(e) => this.handleChange(e)}
          />

          <button
            type="submit"
            disabled={
              !(
                this.state.password_1 === this.state.password_2 &&
                this.state.password_1.length > 0
              )
            }
          >
            Submit
          </button>

          {this.state.response === "token not found" ? (
            <span>
              It looks like that link has already been used or expired.
            </span>
          ) : (
            <span>Your password must match in both boxes to submit</span>
          )}
        </form>
      );
    }
  }
}
