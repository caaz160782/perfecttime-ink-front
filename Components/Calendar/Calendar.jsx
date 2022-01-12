import React, { useState } from "react";
import Button from "@mui/material/Button";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";
import { setDate } from "date-fns";
import { calendarFormat } from "moment";

const Calendar = ({ timeToOpen, timeToClose, dayNotAvailables }) => {
  const [open, setOpen] = useState(false);
  const [fechaHoy, setFecha] = useState("");
  const [even, setEven] = useState([]);
  const [valueDate, setValuDate] = useState({
    title: "",
    start: "",
    end: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateClick = (arg) => {
    setOpen(true);
    setFecha(arg.dateStr);
    //console.log(arg);
    //console.log(arg.dateStr);
    //console.log(arg.date);
  };

  const handleChangeDate = (prop) => (event) => {
    setValuDate({ ...valueDate, [prop]: event.target.value });
    console.log(valueDate);

    /* if (prop[0] === "dayNotAvailables") {
      const {
        target: { value },
      } = event;
      setValuesConfig({ ...valuesConfig, [prop]: event.target.value });
    }*/
  };

  const handleGuardar = (event) => {
    console.log(1);
    //   setValuesConfig({ ...valuesConfig, [prop]: event.target.value });

    setEven([
      {
        title: "event 1",
        start: "2022-01-28T10:30:00",
        end: "2022-01-28T11:30:00",
      },
      {
        title: "event 2",
        start: "2022-01-31T11:00:00",
        end: "2022-01-31T15:30:00",
      },
    ]);

    console.log(even);
    setOpen(false);
  };

  return (
    <div>
      <div>
        <ModalDate
          open={open}
          handleClose={handleClose}
          fechaHoy={fechaHoy}
          handleChangeDate={handleChangeDate}
          handleGuardar={handleGuardar}
        />
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        /*events={[
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
        ]}*/

        events={even}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          //right: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "dayGridMonth,timeGridDay",
        }}
        contentHeight={650}
        hiddenDays={dayNotAvailables}
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
