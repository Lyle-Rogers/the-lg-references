import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import Cookies from "js-cookie";

class ChallengesAdmin extends Component {
  constructor() {
    super();

    this.state = {
      deleteButton: true,
    };

    this.handleData = this.handleData.bind(this);
    this.handleClosedModal = this.handleClosedModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleButtonSwitch = this.handleButtonSwitch.bind(this);
    this.handleGetChallenges = this.handleGetChallenges.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleButtonSwitch(value) {
    var activeChallenge = { ...this.state.activeChallenge };
    activeChallenge.response = value;
    this.setState({ activeChallenge });
  }

  handleDelete(event) {
    if (event.target.value === "Delete " + this.state.activeChallenge.title) {
      this.setState({
        deleteButton: false,
      });
    } else {
      this.setState({
        deleteButton: true,
      });
    }
  }

  handleEdit(event) {
    this.setState({
      activeChallenge: {
        ...this.state.activeChallenge,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleCreate(event) {
    this.setState({
      createChallenge: {
        ...this.state.createChallenge,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleOpenModal(modal, item) {
    switch (modal) {
      case "Edit":
        this.setState({
          showModal: "Edit-Modal",
          activeChallenge: item,
        });
        break;
      case "Delete":
        this.setState({
          showModal: "Delete-Modal",
          activeChallenge: item,
        });
        break;
      case "Create":
        this.setState({
          showModal: "Create-Modal",
        });
        break;
    }
  }

  handleClosedModal() {
    this.setState({
      showModal: "",
    });
  }

  handleData() {
    if (this.state.data) {
      return this.state.data.map((item) => {
        return (
          <div className="challenge-item">
            <div className="item-details">
              <p className="item-title">{item.title}</p>
              <p className="item-deadline">
                Deadline: {moment.utc(item.deadline).format("MM/DD/YYYY")}
              </p>
              <p className="item-summary">{item.summary}</p>
            </div>
            <div className="item-buttons">
              <button onClick={() => this.handleOpenModal("Edit", item)}>
                Edit
              </button>
              <button onClick={() => this.handleOpenModal("Delete", item)}>
                Delete
              </button>
            </div>
          </div>
        );
      });
    }
  }

  handleSubmit(form) {
    switch (form) {
      case "Edit":
        var deadline =
          this.state.activeChallenge.deadline_date ||
          moment.utc(this.state.activeChallenge.deadline).format("YYYY-MM-DD") +
            "T" +
            this.state.activeChallenge.deadline_time ||
          moment.utc(this.state.activeChallenge.deadline).format("HH:mm") + "Z";
        Axios.post(
          "http://127.0.0.1:8000/api/admin/challengeAdmin/",
          {
            type: "Edit",
            challenge: this.state.activeChallenge,
            deadline: moment(deadline, "YYYY-MM-DD HH:mm").format(
              "YYYY-MM-DD HH:mm"
            ),
          },
          {
            headers: {
              Authorization: `Token ${Cookies.get("access_token")}`,
            },
          }
        )
          .then((res) => {
            if (res.data.Success) {
              this.handleGetChallenges();
              this.handleClosedModal();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Delete":
        Axios.post(
          "http://127.0.0.1:8000/api/admin/challengeAdmin/",
          {
            type: "Delete",
            challenge: this.state.activeChallenge,
          },
          {
            headers: {
              Authorization: `Token ${Cookies.get("access_token")}`,
            },
          }
        )
          .then((res) => {
            if (res.data.Success) {
              this.handleGetChallenges();
              this.handleClosedModal();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Create":
        var deadline =
          moment
            .utc(this.state.createChallenge.deadline_date, "YYYY-MM-DD")
            .format("YYYY-MM-DD") +
          "T" +
          moment.utc(this.state.createChallenge.deadline_time, "HH:mm").format("HH:mm") +
          "Z";
        Axios.post(
          "http://127.0.0.1:8000/api/admin/challengeAdmin/",
          {
            type: "Create",
            challenge: this.state.createChallenge,
            deadline: deadline,
          },
          {
            headers: {
              Authorization: `Token ${Cookies.get("access_token")}`,
            },
          }
        )
          .then((res) => {
            if (res.data.Success) {
              this.handleGetChallenges();
              this.handleClosedModal();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        event.preventDefault();
        break;
    }
  }

  handleGetChallenges() {
    Axios.get("http://127.0.0.1:8000/api/admin/challengeAdmin/", {
      headers: {
        Authorization: `Token ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => {
        this.setState({
          data: res.data.challenges,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    Modal.setAppElement("body");
    this.handleGetChallenges();
  }

  render() {
    return (
      <div className="challengeAdmin">
        <div className="challenge-header">
          <h1>ChallengesAdmin</h1>
          <button onClick={() => this.handleOpenModal("Create")}>Create</button>
        </div>
        <div className="challenge-body">{this.handleData()}</div>
        <Modal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={this.state.showModal === "Edit-Modal"}
          contentLabel="Modal Example"
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleClosedModal}
        >
          <div className="modal-header">
            <p className="modal-title">
              Edit -{" "}
              {this.state.activeChallenge
                ? this.state.activeChallenge.title
                : null}
            </p>
            <button className="modal-close" onClick={this.handleClosedModal}>
              x
            </button>
          </div>
          <div className="modal-body">
            {this.state.activeChallenge ? (
              <div className="edit-body">
                <div className="input-container">
                  <label>Title</label>
                  <input
                    className="edit-input"
                    type="text"
                    name="title"
                    value={this.state.activeChallenge.title}
                    onChange={this.handleEdit}
                  />
                </div>
                <div className="input-container">
                  <label>Deadline Date</label>

                  <input
                    className="edit-input"
                    type="date"
                    name="deadline_date"
                    value={moment
                      .utc(
                        this.state.activeChallenge.deadline_date
                          ? this.state.activeChallenge.deadline_date
                          : this.state.activeChallenge.deadline
                      )
                      .format("YYYY-MM-DD")}
                    onChange={this.handleEdit}
                  />
                </div>
                <div className="input-container">
                  <label>Deadline Time</label>

                  <input
                    className="edit-input"
                    type="time"
                    name="deadline_time"
                    value={
                      this.state.activeChallenge.deadline_time
                        ? this.state.activeChallenge.deadline_time
                        : moment
                            .utc(this.state.activeChallenge.deadline)
                            .format("HH:mm")
                    }
                    onChange={this.handleEdit}
                  />
                </div>

                <div className="input-container">
                  <label>Summary</label>
                  <input
                    className="edit-input"
                    type="text"
                    name="summary"
                    value={this.state.activeChallenge.summary}
                    onChange={this.handleEdit}
                  />
                </div>

                <div className="input-container">
                  <label>User Input Type</label>
                  <div className="switch-buttons">
                    <button
                      className={
                        this.state.activeChallenge.response === "Amount"
                          ? "Active"
                          : null
                      }
                      onClick={() => this.handleButtonSwitch("Amount")}
                    >
                      Amount
                    </button>
                    <button
                      className={
                        this.state.activeChallenge.response === "Time"
                          ? "Active"
                          : null
                      }
                      onClick={() => this.handleButtonSwitch("Time")}
                    >
                      Time
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="edit-modal-footer">
            <button onClick={() => this.handleSubmit("Edit")}>Submit</button>
          </div>
        </Modal>
        <Modal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={this.state.showModal === "Delete-Modal"}
          contentLabel="Modal Example"
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleClosedModal}
        >
          <div className="modal-header">
            <p className="modal-title">Delete</p>
            <button className="modal-close" onClick={this.handleClosedModal}>
              x
            </button>
          </div>
          <div className="modal-body">
            {this.state.activeChallenge ? (
              <div className="modal-delete">
                <div className="delete-text">
                  <label>Caution! This action is irriversable.</label>
                  <label>
                    Type "Delete {this.state.activeChallenge.title}"
                  </label>
                  <input
                    type="text"
                    placeholder={"Delete " + this.state.activeChallenge.title}
                    onChange={this.handleDelete}
                  />
                </div>

                <button
                  disabled={this.state.deleteButton}
                  onClick={() => this.handleSubmit("Delete")}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={this.state.showModal === "Create-Modal"}
          contentLabel="Modal Example"
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleClosedModal}
        >
          <div className="modal-header">
            <p className="modal-title">Create Challenge</p>
            <button className="modal-close" onClick={this.handleClosedModal}>
              x
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={() => this.handleSubmit("Create")}>
              <div className="modal-create">
                <div className="input-container">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={this.handleCreate}
                    required
                  />
                </div>
                <div className="input-container summary">
                  <label>Summary</label>
                  <textarea
                    className="summary"
                    type="text"
                    name="summary"
                    onChange={this.handleCreate}
                  />
                </div>
                <div className="input-container">
                  <label>Repeat</label>
                  <select
                    className="select"
                    name="repeat"
                    id="repeat"
                    onChange={this.handleCreate}
                  >
                    <option value="Never">Never</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Bi-Monthly">Bi-Monthly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="input-container">
                  <label>User Response</label>
                  <select
                    className="select"
                    name="response"
                    id="response"
                    onChange={this.handleCreate}
                  >
                    <option value="Amount">Amount</option>
                    <option value="Time">Time</option>
                  </select>
                </div>
                <div className="input-container">
                  <label>Deadline Date</label>
                  <input
                    type="date"
                    name="deadline_date"
                    onChange={this.handleCreate}
                    required
                  />
                </div>
                <div className="input-container">
                  <label>Deadline Time</label>
                  <input
                    type="time"
                    name="deadline_time"
                    onChange={this.handleCreate}
                    // value={
                    //   this.state.createChallenge
                    //     ? this.state.createChallenge.deadline_time
                    //     : moment().format("HH:mm")
                    // }
                    required
                  />
                </div>
              </div>
              <div className="modal-create-footer">
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ChallengesAdmin;
