import React, { useState } from "react";
import Button from "@mui/material/Button";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";

const Calendar = ({ timeToOpen, timeToClose, dayAvailables }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateClick = (arg) => {
    setOpen(true);
    //   console.log(arg.date);
  };

  return (
    <div>
      <div>
        <ModalDate open={open} handleClose={handleClose} />
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        events={[
          {
            title: "event 1",
            //   date: '2021-12-27',
            //   startTime: '10:45:00',
            //   endTime: '12:45:00'
            start: "2021-12-28T10:30:00",
            end: "2021-12-28T11:30:00",
          },
          {
            title: "event 2",
            //date: '2021-12-27',
            start: "2021-12-28T11:00:00",
            end: "2021-12-28T15:30:00",
          },
        ]}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          //right: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "dayGridMonth,timeGridDay",
        }}
        contentHeight={650}
        hiddenDays={dayAvailables}
        slotMinTime={timeToOpen}
        slotMaxTime={timeToClose}
        eventDurationEditable={true}
        //eventBackgroundColor="violet" //color por tatuador
        locale={esLocale}
        // businessHours= {{
        //         startTime: '10:00', // a start time (10am in this example)
        //         endTime: '21:00', // an end time (6pm in this example)
        // }}
      />
    </div>
  );
};

export default Calendar;
