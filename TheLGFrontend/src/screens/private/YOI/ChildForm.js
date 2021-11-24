import React, { Component } from "react";
import Axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

class ChildForm extends Component {
  constructor() {
    super();

    this.state = {
      children: [
        {
          allergies: "",
          birthday: "",
          email: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          size: "",
          gender: "",
          translation_assistance: "",
          spanish_shirt: "",
        },
      ],
      errors: null,
      price: 6000,
      isSubmitted: false,
    };

    this.showChildren = this.showChildren.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
  }

  handleAddChild() {
    let children = [...this.state.children];
    children.push({});
    this.setState({
      children,
    });
  }

  handleRemoveChild(i) {
    let newChildren = [...this.state.children];
    newChildren.splice(i, 1);

    this.setState({
      children: newChildren,
    });
  }

  handleChange(e) {
    let [id, name] = e.target.name.split("-");
    let newChildren = [...this.state.children];

    newChildren[id] = { ...this.state.children[id], [name]: e.target.value };

    this.setState({ children: newChildren });
  }

  showChildren() {
    return [...Array(this.state.children.length)].map((e, i) => {
      return (
        <div className="child">
          {i > 0 ? (
            <div className="removeChild">
              <button type="button" onClick={() => this.handleRemoveChild(i)}>
                Remove Child
              </button>
            </div>
          ) : null}
          <div className="inputWrapper">
            <label htmlFor="">Child First Name:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].first_name}
              name={i + "-first_name"}
              type="text"
              placeholder="Enter Here..."
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Child Last Name:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].last_name}
              name={i + "-last_name"}
              type="text"
              placeholder="Enter Here..."
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Child Birthdate:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].birthday}
              name={i + "-birthday"}
              type="date"
              placeholder="yyyy-mm-dd"
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Email:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].email}
              name={i + "-email"}
              type="email"
              placeholder="Enter Here..."
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Phone Number:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].phone_number}
              name={i + "-phone_number"}
              type="text"
              placeholder="Enter Here..."
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Child Allergies:</label>
            <input
              onChange={this.handleChange}
              value={this.state.children[i].allergies}
              name={i + "-allergies"}
              type="text"
              placeholder="Enter Here..."
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Child Shirt Size:</label>
            <select
              onChange={this.handleChange}
              value={this.state.children[i].size}
              name={i + "-size"}
              required
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              <optgroup label="Youth Sizes">
                <option value="5">12/14</option>
                <option value="6">14/16</option>
              </optgroup>
              <optgroup label="Adult Sizes">
                <option value="0">Extra Small</option>
                <option value="1">Small</option>
                <option value="2">Medium</option>
                <option value="3">Large</option>
                <option value="4">Extra Large</option>
                <option value="7">Other</option>
              </optgroup>
            </select>
          </div>
          <div className="inputWrapper">
            <label htmlFor="">Gender:</label>
            <select
              onChange={this.handleChange}
              value={this.state.children[i].gender}
              name={i + "-gender"}
              required
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>
          <div className="inputWrapper">
            <label htmlFor="">
              ¿Necesita ayuda con la traducción del inglés al español?:
            </label>
            <select
              onChange={this.handleChange}
              value={this.state.children[i].translation_assistance}
              name={i + "-translation_assistance"}
              required
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="inputWrapper">
            <label htmlFor="">
              ¿Te gustaría que el logo de tu camiseta fuera en español?:
            </label>
            <select
              onChange={this.handleChange}
              value={this.state.children[i].spanish_shirt}
              name={i + "-spanish_shirt"}
              required
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
      );
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      isSubmitted: true,
      errors: null,
    });

    const stripe = await loadStripe(
      "pk_live_k0aK8nc2yrbiDGxw2LfspiU900HFQ6M8ML"
    );

    Axios.post(
      "https://www.lebarongaleana-api.com/api/YOI_Create_Session/",
      {
        children: this.state.children,
        price: this.state.price,
        quantity: this.state.children.length,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    )
      .then((res) => {
        stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      })
      .catch(() => {
        this.setState({
          isSubmitted: false,
          errors:
            "Error: Could not register child. Check that all fields are filled out correctly.",
        });
      });
  };

  render() {
    return (
      <div className="childFormContainer">
        <form onSubmit={this.handleSubmit} className="childForm">
          <div className="formHeader">YOI Child Registration Form</div>
          <h3 style={{ width: "100%", textAlign: "center", color: "red" }}>
            {this.state.errors}
          </h3>
          {this.showChildren()}
          <div className="buttonContainer">
            <button
              className="addChild"
              type="button"
              onClick={this.handleAddChild}
            >
              Add Child
            </button>
          </div>
          <div className="pricing">
            <div className="pricingTitle">Total Cost for Registration</div>
            <div className="totalWrapper">
              <div className="userCost">
                $60 * {this.state.children.length} Child
              </div>
              <div className="total">
                Total: ${60 * this.state.children.length}
              </div>
            </div>

            <div className="buttonWrapper">
              <button
                type="submit"
                className="submitButton"
                disabled={this.state.isSubmitted}
              >
                Pay Now
              </button>
            </div>

            <div className="warning">
              *If child does not attend mandatory classes you will be charges an
              additional $50*
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChildForm;
