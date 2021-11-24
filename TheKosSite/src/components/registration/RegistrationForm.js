import React, { Component } from "react";

export default class RegistrationForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="first name"
            value={this.state.first_name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="last name"
            value={this.state.last_name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="age"
            id="age"
            placeholder="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="height"
            id="height"
            placeholder="height"
            value={this.state.height}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="weight"
            id="weight"
            placeholder="weight"
            value={this.state.weight}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password2"
            id="password2"
            placeholder="password2"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
