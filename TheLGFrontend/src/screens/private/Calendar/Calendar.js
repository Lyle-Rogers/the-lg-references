import React, { useState, Component, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import Axios from "axios";

const localizer = momentLocalizer(moment);

Modal.setAppElement("body");

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

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

  return (
    <div className="calendar">
      <BigCalendar
        selectable
        localizer={localizer}
        views={["month"]}
        defaultView="month"
        defaultDate={new Date()}
        components={{ toolbar: CustomToolbar }}
        // onSelectSlot={selectDate}
        onSelectEvent={(e) => (setSelectedEvent(e), setShowModal(true))}
        // eventPropGetter={eventStyleGetter}
        events={events}
      />
      <Modal
        className="Modal Event-Modal"
        overlayClassName="Overlay"
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => (setSelectedEvent(), setShowModal(false))}
        ariaHideApp={false}
      >
        {selectedEvent ? (
          <div className="modal-event">
            <div className="header">
              <span />
              <div className="title">{selectedEvent.title}</div>
              <div
                className="close"
                onClick={() => (setSelectedEvent(), setShowModal(false))}
              >
                x
              </div>
            </div>
            <div className="body-show">
              <div className="desc-show">
                {selectedEvent.description}
              </div>
              <div className="date-times-show">
                <div className="time">
                  <div>Start:</div>
                  {moment(selectedEvent.start).format('MM-DD-YYYY h:mm a')}
                </div>
                {" "}
                <div className="time">
                  <div>End:</div>
                  {moment(selectedEvent.end).format('MM-DD-YYYY h:mm a')}
                </div>
              </div>
            </div>
            <div className="footer"></div>
          </div>
        ) : null}
      </Modal>
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

export default Calendar;
