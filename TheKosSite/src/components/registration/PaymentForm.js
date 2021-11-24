import React, { Component } from "react";
import {
  ElementsConsumer,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import CardSection from "./card";
import { UserContext } from "../UserContext";


class PaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      userForm: false,
      paymentErr: null,
      formSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  static contextType = UserContext;


  createUser() {
    axios
      .post("http://127.0.0.1:8000/api/signup/", {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        age: this.state.age,
        height_ft: this.state.height_ft,
        height_in: this.state.height_in,
        gender: this.state.gender,
        weight: this.state.weight,
      })
      .then((res) => {
        console.log(res);
        var token = res.data.token;
        if (token) {
          Cookies.set("access_token", token, { expires: 1 / 24 });
          this.context.setUser(res.data.user);
          setTimeout(() => {
            this.setState({
              signedIn: true,
            });
          }, 100);
        }
      })
      .catch((Error) => {
        console.log(Error);
        // this.props.handleUnSuccessfulLogin();
      });
  }

  validateForm = async (event) => {
    
    this.setState({
      formSubmitted: true
    })
    event.preventDefault();

    // Password check
    if (this.state.password !== this.state.password2) {
      await this.setState({
        personalErr: "Passwords don't match",
        formSubmitted: false
      });
    } else {
      await this.setState({
        personalErr: null,
        formIsValidated: true,
      });
    }

    // Payment check:
    // See handleSubmit(), 'if (result.error)' under the Stripe stuff
    if (this.state.formIsValidated === true) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = async (event) => {
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const client_secret = await axios
      .get("http://127.0.0.1:8000/api/stripe/")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(
          CardCvcElement,
          CardExpiryElement,
          CardNumberElement
        ),
        billing_details: {
          address: {
            city: this.state.city,
            country: this.state.country,
            line1: this.state.line1,
            line2: this.state.line2,
            postal_code: this.state.postal_code,
            state: this.state.state,
          },
          email: this.state.email,
          name: this.state.first_name + " " + this.state.last_name,
          phone: this.state.phone,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      this.setState({
        // formDisabled: false,
        paymentErr: result.error.message,
      });
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        this.setState({
          paymentErr: null,
        });
        this.createUser();
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    if (this.state.signedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <fieldset disabled={false}>
          <form className="registration-form" onSubmit={this.validateForm}>
            <h1 className="form-header">What we will need...</h1>

            <div className="slidey-wrapper">
              <div className="personal-info">
                <h3 className="title">Personal Information</h3>

                <div className="col">
                  <label htmlFor="">First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Your first name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Your last name"
                    value={this.state.last_name}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Age:</label>
                  <input
                    type="date"
                    name="age"
                    id="age"
                    placeholder="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Gender:</label>

                  <select name="gender" onChange={this.handleChange} required>
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>

                <div className="col">
                  <label htmlFor="">Height</label>
                  <select
                    name="height_ft"
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      ft
                    </option>
                    <option value="1">1'</option>
                    <option value="2">2'</option>
                    <option value="3">3'</option>
                    <option value="4">4'</option>
                    <option value="5">5'</option>
                    <option value="6">6'</option>
                    <option value="7">7'</option>
                  </select>
                  <select
                    name="height_in"
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      in
                    </option>
                    <option value="1">1"</option>
                    <option value="2">2"</option>
                    <option value="3">3"</option>
                    <option value="4">4"</option>
                    <option value="5">5"</option>
                    <option value="6">6"</option>
                    <option value="7">7"</option>
                    <option value="8">8"</option>
                    <option value="9">9"</option>
                    <option value="10">10"</option>
                    <option value="11">11"</option>
                  </select>
                </div>

                <div className="col">
                  <label htmlFor="">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder="Your weight"
                    value={this.state.weight}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Username:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Email:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your email adress"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Confirm your password"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="err">{this.state.personalErr}</div>
              </div>

              <div className="payment-info">
                <h3 className="title">Payment Information</h3>

                <div className="col">
                  <label htmlFor="">Street Address</label>
                  <input
                    type="text"
                    name="line1"
                    id="line1"
                    placeholder="Address 1"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Street Address 2</label>
                  <input
                    type="text"
                    name="line2"
                    id="line2"
                    placeholder="Address 2"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col">
                  <label htmlFor="">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">State:</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Country:</label>
                  <select name="country" onChange={this.handleChange} required>
                    <option value="US">United States</option>
                    <option value="MX">Mexico</option>
                  </select>
                </div>

                <div className="col">
                  <label htmlFor="">Postal Code</label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    placeholder="Postal Code"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <CardSection />

                <div className="err">{this.state.paymentErr}</div>

                <div className="submit-button">
                  <button type="submit" disabled={this.state.formSubmitted}>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </fieldset>
      );
    }
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <PaymentForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
