import React, { Component } from "react";
import Modal from "react-modal";
import Axios from "axios";
import Cookies from "js-cookie";

class Challenges extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      challenges: [],
      hours: null,
      minutes: null,
      seconds: null,
      amount: null,
    };

    this.handleClosedModal = this.handleClosedModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenModal(challenge) {
    this.setState({
      showModal: true,
      selectedChallenge: challenge,
    });
  }

  handleClosedModal() {
    this.setState({
      showModal: false,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleChallenges() {
    if (this.state.challenges) {
      return this.state.challenges.map((challenge) => {
        return (
          <div
            className="challenge"
            key={challenge.id}
            onClick={() => this.handleOpenModal(challenge)}
          >
            <div className="challenge-title">{challenge.title}</div>
          </div>
        );
      });
    }
  }

  getChallenges() {
    Axios.get("http://127.0.0.1:8000/api/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((response) => {
        this.setState({
          challenges: response.data.challenges,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit() {
    Axios.post(
      "http://127.0.0.1:8000/api/",
      {
        amount: this.state.amount,
        challenge: this.state.selectedChallenge.id,
        time: {
          hours: this.state.hours ? parseInt(this.state.hours) : null,
          minutes: this.state.minutes ? parseInt(this.state.minutes) : null,
          seconds: this.state.seconds ? parseInt(this.state.seconds) : null,
        },
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get("access_token")}`,
        },
      }
    )
      .then((response) => {
        if (response.data.Success === true) {
          this.handleClosedModal();
          this.getChallenges();
        } else {
          alert(response.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    Modal.setAppElement("body");
    this.getChallenges();
  }

  render() {
    return (
      <div className="challengesToDo">
        <div className="header">Challenges</div>

        {this.handleChallenges()}

        {this.state.selectedChallenge ? (
          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.showModal}
            contentLabel="Modal Example"
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.handleClosedModal}
          >
            <form className="challenge-form" onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <p className="modal-title">
                  {this.state.selectedChallenge.title}
                </p>
                <button
                  className="modal-close"
                  onClick={this.handleClosedModal}
                >
                  x
                </button>
              </div>
              <div className="modal-body challenges-modal-body">
                <p className="challenge-summary">
                  {this.state.selectedChallenge.summary}
                </p>
                <div className="switch-input">
                  {this.state.selectedChallenge.response === "Time" ? (
                    <div className="time-inputs">
                      <div className="time-input">
                        <input
                          type="text"
                          placeholder="00"
                          name="hours"
                          onChange={this.handleChange}
                        />
                        <label>Hours</label>
                      </div>
                      <div className="time-input">
                        <input
                          type="text"
                          placeholder="00"
                          name="minutes"
                          onChange={this.handleChange}
                        />
                        <label>Minutes</label>
                      </div>
                      <div className="time-input">
                        <input
                          type="text"
                          placeholder="00"
                          name="seconds"
                          onChange={this.handleChange}
                        />
                        <label>Seconds</label>
                      </div>
                    </div>
                  ) : (
                    <div className="amount-input">
                      <input
                        required
                        type="number"
                        placeholder="00"
                        name="amount"
                        step="0.01"
                        onChange={this.handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer challenges-modal-footer">
                <button type="submit">Submit</button>
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Challenges;
