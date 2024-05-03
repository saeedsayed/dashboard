// hooks
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
// components
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CardBody, PageHeader } from "../components";
// data
import { CALENDER_EVENTS } from "../data/dummy";

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="min-w-40 flex-1 bg-main-bg h-full p-4  overflow-auto">
      <label className="flex gap-2 items-center w-fit cursor-pointer">
        <input
          type="checkbox"
          checked={weekendsVisible}
          onChange={handleWeekendsToggle}
        ></input>
        show weekends
      </label>
      <h2>
        All Events{" "}
        <span className="font-bold text-secondary">
          {" "}
          ( {currentEvents.length} )
        </span>
      </h2>
      <ul>
        {currentEvents.map((event) => (
          <li key={event.id}>
            <b className="mr-1 text-secondary">
              {formatDate(event.start, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </b>
            <span>{event.title}</span>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function calendar() {
  const { setModalIsOpen, setSnackbar } = useContextProvider();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    setModalIsOpen((p) => ({
      ...p,
      calendar: { isOpen: true, selectInfo, mode: "addEvent" },
    }));
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  function handleEventClick(clickInfo) {
    setModalIsOpen((p) => ({
      ...p,
      calendar: { isOpen: true, selectInfo: clickInfo, mode: "removeEvent" },
    }));
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  const handleAfterAddEvent = (_) => {
    setSnackbar({
      isOpen: true,
      message: "The event has been added ✔",
      type: "success",
    });
  };

  const handleAfterRemoveEvent = (_) => {
    setSnackbar({
      isOpen: true,
      message: "The event has been removed ✔",
      type: "warning",
    });
  };

  return (
    <>
      <PageHeader title={"calendar"} subTitle={"calendar"} />
      <div className="h-auto">
        <CardBody>
          <div className="items-start flex flex-wrap bg-section-bg gap-4 overflow-auto -me-5 pe-5  h-[calc(100vh-245px)]">
            <Sidebar
              weekendsVisible={weekendsVisible}
              handleWeekendsToggle={handleWeekendsToggle}
              currentEvents={currentEvents}
            />
            <div className="[&_.fc_.fc-toolbar-title]:text-secondary  grow min-w-[200px] h-full pr-4 -mr-4 overflow-auto">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                initialEvents={CALENDER_EVENTS}
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                eventAdd={handleAfterAddEvent}
                eventRemove={handleAfterRemoveEvent}
                /* you can update a remote database when these fire:
          eventChange={function(){}}
          */
              />
            </div>
          </div>
        </CardBody>
      </div>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <span>{eventInfo.timeText}</span>
      <span>{eventInfo.event.title}</span>
    </>
  );
}
