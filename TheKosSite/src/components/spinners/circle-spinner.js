import React, { Component } from "react";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
// Can be a string as well. Need to ensure each key-value pair ends with ;

const bar = css`

`;

export default class CircleSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={bar}
          size={100}
          margin={10}
          color={"#36D7B7"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
