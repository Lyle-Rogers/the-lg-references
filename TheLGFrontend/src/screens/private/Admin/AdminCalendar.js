import React, { useState, Component, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import Axios from "axios";
import Datetime from "react-datetime";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { del } from "superagent";

const localizer = momentLocalizer(moment);

Modal.setAppElement("body");
const AdminCalendar = (props) => {
  const date = new Date("2021-03-11T16:30:00Z").getTime();
  const [selectedEvent, setSelectedEvent] = useState();
  const [events, setEvents] = useState([]);
  const [monthStart, setMonthStart] = useState(
    moment().clone().startOf("month").format("YYYY-MM-DD hh:mm")
  );
  const [monthEnd, setMonthEnd] = useState(
    moment().clone().endOf("month").format("YYYY-MM-DD hh:mm")
  );
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    allDay: false,
    start: null,
    end: null,
    selectable: true,
    description: "",
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const deleteEvent = () => {
    Axios.post(
      "https://www.lebarongaleana-api.com/api/calendar-events/",
      {
        post_type: "delete",
        id: selectedEvent.id,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    ).then((res) => {
      if (res.data.success) {
        setShowModal("");
        getEvents();
      }
    });
  };
  const editEvent = () => {
    Axios.post(
      "https://www.lebarongaleana-api.com/api/calendar-events/",
      {
        post_type: "edit",
        id: selectedEvent.id,
        event: {
          title: selectedEvent.title,
          allDay: false,
          start: moment(selectedEvent.start).format("YYYY-MM-DD HH:mm"),
          end: moment(selectedEvent.end).format("YYYY-MM-DD HH:mm"),
          selectable: true,
          description: selectedEvent.description,
        },
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    ).then((res) => {
      if (res.data.success) {
        setShowModal("");
        getEvents();
      }
    });
  };

  const createEvent = () => {
    Axios.post(
      "https://www.lebarongaleana-api.com/api/calendar-events/",
      {
        post_type: "create",
        event: {
          title: newEvent.title,
          allDay: false,
          start: moment(newEvent.start.toString()).format("YYYY-MM-DD HH:MM"),
          end: moment(newEvent.end.toString()).format("YYYY-MM-DD HH:MM"),
          selectable: true,
          description: newEvent.description,
        },
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    ).then((res) => {
      if (res.data.success) {
        setShowModal("");
        getEvents();
      }
    });
  };

  const getEvents = () => {
    Axios.get("https://www.lebarongaleana-api.com/api/calendar-events/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
      },
    }).then((response) => {
      setEvents(response.data.events);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setShowModal("New-Event");
    setNewEvent((newEvent) => ({
      ...newEvent,
      start: start,
      end: end,
    }));
  };

  return (
    <div className={props.className}>
      <div className="calendar">
        <BigCalendar
          selectable
          popup
          localizer={localizer}
          views={["month"]}
          defaultView="month"
          defaultDate={new Date()}
          components={{ toolbar: CustomToolbar }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(e) => (
            setSelectedEvent(e), setShowModal("Show-Event")
          )}
          // eventPropGetter={eventStyleGetter}
          events={events}
        />
        <Modal
          className="Modal Event-Modal"
          overlayClassName="Overlay"
          isOpen={showModal === "Show-Event"}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => (setSelectedEvent(), setShowModal(""))}
          ariaHideApp={false}
        >
          {selectedEvent ? (
            <div className="modal-event">
              <div className="header">
                <span />
                <div className="title">Edit Event</div>
                <div
                  className="close"
                  onClick={() => (setSelectedEvent(), setShowModal(""))}
                >
                  x
                </div>
              </div>
              <div className="body">
                <div className="title">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) =>
                      setSelectedEvent((selectedEvent) => ({
                        ...selectedEvent,
                        title: e.target.value,
                      }))
                    }
                    value={selectedEvent.title}
                  />
                </div>
                <div className="desc">
                  <label htmlFor="">Description</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    name="description"
                    onChange={(e) =>
                      setSelectedEvent((selectedEvent) => ({
                        ...selectedEvent,
                        description: e.target.value,
                      }))
                    }
                    value={selectedEvent.description}
                  ></textarea>
                </div>
                <div className="date-times">
                  <div className="input-container">
                    <label htmlFor="">Start</label>
                    <Datetime
                      value={moment(selectedEvent.start)}
                      onChange={(date) =>
                        setSelectedEvent((selectedEvent) => ({
                          ...selectedEvent,
                          start: date,
                        }))
                      }
                    />
                  </div>

                  <div className="input-container">
                    <label htmlFor="">End</label>
                    <Datetime
                      value={moment(selectedEvent.end)}
                      onChange={(date) =>
                        setSelectedEvent((selectedEvent) => ({
                          ...selectedEvent,
                          end: date,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button className="delete" onClick={deleteEvent}>Delete</button>
                <button onClick={editEvent}>Submit</button>
              </div>
            </div>
          ) : null}
        </Modal>

        <Modal
          className="Modal Event-Modal"
          overlayClassName="Overlay"
          isOpen={showModal === "New-Event"}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => (setSelectedEvent(), setShowModal(""))}
          ariaHideApp={false}
        >
          {newEvent ? (
            <div className="modal-event">
              <div className="header">
                <span />
                <div className="title">New Event</div>
                <div
                  className="close"
                  onClick={() => (setSelectedEvent(), setShowModal(""))}
                >
                  x
                </div>
              </div>
              <div className="body">
                <div className="title">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="desc">
                  <label htmlFor="">Description</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    name="description"
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <div className="date-times">
                  <div className="input-container">
                    <label htmlFor="">Start</label>
                    <Datetime
                      value={newEvent.start}
                      onChange={(date) =>
                        setNewEvent((newEvent) => ({
                          ...newEvent,
                          start: date,
                        }))
                      }
                    />
                  </div>

                  <div className="input-container">
                    <label htmlFor="">End</label>
                    <Datetime
                      value={newEvent.end}
                      onChange={(date) =>
                        setNewEvent((newEvent) => ({
                          ...newEvent,
                          end: date,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button onClick={createEvent}>Submit</button>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

class CustomToolbar extends Component {
  render() {
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => this.navigate("TODAY")}>
            today
          </button>
          <button type="button" onClick={() => this.navigate("PREV")}>
            back
          </button>
          <button type="button" onClick={() => this.navigate("NEXT")}>
            next
          </button>
        </span>
        <span className="rbc-toolbar-label">{this.props.label}</span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };
}

export default AdminCalendar;
