import React, { Component } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

class BlogDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    Axios.get(`https://www.lebarongaleana-api.com/api/blog/id:${this.props.match.params.blogId}`)
      .then((res) => {
        this.setState({
          post: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="blogDetail-container">
        {this.state.isLoaded ? (
          <div className="blogDetail">
            <div className="header-wrapper">
              <div className="header">
                <div className="img-wrapper">
                  <img src={this.state.post.thumb_nail} alt="" />
                </div>
                <p className="title">{this.state.post.title}</p>
                <p className="summary">{this.state.post.summary}</p>
              </div>
            </div>
            <div className="body">
              <div className="content-wrapper">
                <p className="author">
                  Written By: {this.state.post.createdBy.first_name}{" "}
                  {this.state.post.createdBy.last_name}
                </p>
                <div className="text-body">
                  {ReactHtmlParser(this.state.post.content)}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BlogDetails;
