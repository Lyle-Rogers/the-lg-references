import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import ReactCrop from 'react-image-crop';
import Axios from "axios";

import ProfilePicture from "./ProfileImageUpload";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionStatus: this.props.subscriptionStatus,
      editData: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone_number: "",
        image: "",
      },
      uploadImageTemplate: "rowAddPhoto",
      TopCardToggle: "topCard",
      crop: {
        aspect: 1/1,
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.manageSubscription = this.manageSubscription.bind(this)
    this.toggleUploadImageTemplate = this.toggleUploadImageTemplate.bind(this)
  }

  manageSubscription() {
    Axios.post(
      "https://www.lebarongaleana-api.com/api/create-customer-portal-session/",
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    ).then((res) => {
      window.location.href = res.data.sessionURL;
    });
  };

  handleChange(e) {
    console.log("Input Changed", e.target.value, e.target.name);
    this.setState({
      editData: {
        ...this.state.editData,
        [e.target.name]: e.target.value,
      }
    })
  }

  toggleUploadImageTemplate() {
    if (this.state.uploadImageTemplate == "rowAddPhoto") {
      this.setState({
        uploadImageTemplate: "rowAddPhotoShow",
        TopCardToggle: "topCardHide",
      })
    } else {
      this.setState({
        uploadImageTemplate: "rowAddPhoto",
        TopCardToggle: "topCard",
      })
    }
  }

  handleSubmit() {
    Axios.put(
      `https://www.lebarongaleana-api.com/api/edit-user/`,
      {
        first_name: this.state.editData.first_name,
        last_name: this.state.editData.last_name,
        username: this.state.editData.username,
        email: this.state.editData.email,
        phone_number: this.state.editData.phone_number,
        image: this.state.editData.image
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
      ).catch((error) => {
        console.warn('Not good man :(', error);
      })
  }

  componentDidMount() {
    const user = this.props.user
    this.setState({
      editData: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone_number: user.profile.phone_number,
        image: user.profile.image
      }
    })
  }

  render () {
    const user = this.props.user;
    return (
      <div className="profileContainer">
        <div className="profileWrapper">
          <div className={this.state.uploadImageTemplate}>    
            <div className="UPP">      
              <button className="ClosePictureUpload" onClick={this.toggleUploadImageTemplate}><i className="fas fa-window-close"></i></button>
              <div className="">

                <ProfilePicture user={user} />

              </div>       
            </div>        
          </div>

          <div className={this.state.TopCardToggle}>
            <div className="banner">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBgK5cH3qeoFP_q_T_HP9x9lUzqTR7A19A6A&usqp=CAU" />{" "}
            </div>
            <div className="profileInfo">
              <div className="row">
                <div onClick={this.toggleUploadImageTemplate} className="flex-wrapper">
                  <img
                    className="profileLogo"
                    src={this.props.user.profile.image ? (this.props.user.profile.image) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUIseBsvJgFgOBzFthISFzE6gkHosm-DszQ&usqp=CAU"}
                  />
                  <button><i class="fas fa-edit"></i></button>
                </div>
                <div className="profileName">
                  {this.state.editData.first_name} {this.state.editData.last_name}
                </div>
              </div>

              <div className="row">
                <div className="subscriptionWrapper">
                  <div className="row">
                    <p>Subscription Status:</p>
                    {this.state.subscriptionStatus.Error ? (
                      <p className="inactive">Inactive</p>
                    ) : null}
                    {this.state.subscriptionStatus.Success ? (
                      <p className="active">Active</p>
                    ) : null}
                  </div>
                  <div className="row">
                    {this.state.subscriptionStatus.Error ===
                      "User doesn't have subscription" ||
                      this.state.subscriptionStatus.Success ===
                      "User doesn't have subscription but is Admin" ? (
                      <Link to="/dashboard/newSubscription" className="subButton">
                        Manage Subscription
                      </Link>
                    ) : (
                      <button onClick={this.manageSubscription} className="subButton">
                        Manage Subscription
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profileWrapper">
          <div className="profileTitle">Profile</div>

          <div className="inputWrapper">
            <div>
              <form className="profileInput">
                <div className="pInput">
                  <label>first Name</label>
                  <input
                    type="text"
                    className="ppInput"
                    value={this.state.editData.first_name}
                    name="first_name"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div className="pInput">
                  <label>last Name</label>
                  <input
                    type="text"
                    className="ppInput"
                    value={this.state.editData.last_name} 
                    onChange={(e) => this.handleChange(e)}
                    name="last_name"
                  />
                </div>

                <div className="pInput">
                  <label>username</label>
                  <input
                    type="text"
                    className="ppInput"
                    value={this.state.editData.username}
                    name="username"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div className="pInput">
                  <label>email</label>
                  <input
                    type="text"
                    className="ppInput"
                    value={this.state.editData.email}
                    name="email"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                {/* <div className="pInput">
                  <label>address 1</label>
                  <input type="text" className="ppInput" value="null" disabled />
                </div>

                <div className="pInput">
                  <label>address 2</label>
                  <input type="text" className="ppInput" value="null" disabled />
                </div>

                <div className="pInput">
                  <label>city</label>
                  <input type="text" className="ppInput" value="null" disabled />
                </div>

                <div className="pInput">
                  <label>State</label>
                  <input type="text" className="ppInput" value="null" disabled />
                </div>

                <div className="pInput">
                  <label>Zipcode</label>
                  <input type="text" className="ppInput" value="null" disabled />
                </div> */}

                <div className="pInput">
                  <label>phone</label>
                  <input
                    type="text"
                    className="ppInput"
                    value={this.state.editData.phone_number}
                    name="phone_number"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="EditBtnUserWrapper">
                  <button type="submit" className="EditBtnUser" onClick={this.handleSubmit}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    subscriptionStatus: state.auth.subscriptionStatus,
  }
}

export default connect(mapStateToProps)(Profile);