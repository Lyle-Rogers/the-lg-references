import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      error: null,

      username: "",
      password: "",
      remember_me: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextType = UserContext;

  handleSubmit() {
    axios
      .post("http://127.0.0.1:8000/api/login/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        var token = res.data.token;
        if (token) {
          if (this.state.remember_me) {
            Cookies.set("access_token", token, { expires: 15 });
          } else {
            Cookies.set("access_token", token, { expires: 1 / 24 });
          }
          this.context.setUser(res.data.user);
          this.props.handleSuccessfulLogin();
          setTimeout(() => {
            this.setState({
              token: true,
            });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true,
        });
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    this.setState({
      remember_me: !this.state.remember_me,
    });
  }

  render() {
    const { token } = this.state;
    if (token) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
          }}
        />
      );
    } else {
      return (
        <div className="login-form-wrapper">
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-form-header">
              <p>Sign In</p>
            </div>
            {this.state.error ? <h4>Username or Password Incorrect</h4> : null}

            <div className="form-input-wrapper">
              <input
                className="form-input bottom-border-animation"
                type="text"
                name="username"
                placeholder="Your Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input-wrapper">
              <input
                className="form-input bottom-border-animation"
                type="password"
                name="password"
                placeholder="Your Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-checkbox-wrapper">
              <label>Remember Me</label>
              <input
                type="checkbox"
                onClick={this.handleClick}
                checked={this.state.remember_me}
              />
            </div>
            <div className="btn-wrapper">
              <button className="btn" type="submit">
                Sign In
              </button>
            </div>

            <Link to="/forgot-password">Did you forget your password?</Link>
          </form>
        </div>
      );
    }
  }
}
