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
    //setValuesConfig({ ...valuesConfig, [prop]: event.target.value });

    setEven([
      {
        title: "event 1",
        start: "2022-01-28T10:30:00",
        end: "2022-01-28T11:30:00",
      },
      {
        title: "event 2",
        start: "2022-01-30T11:00:00",
        end: "2022-01-30T15:30:00",
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
        locale={esLocale}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          //right: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "dayGridMonth,timeGridDay",
        }}
        contentHeight={580}
        hiddenDays={dayNotAvailables}
        slotMinTime={timeToOpen}
        slotMaxTime={timeToClose}
        dateClick={handleDateClick}
        events={even}

        //eventDurationEditable={true}
        // eventBackgroundColor="violet" //color por tatuador
      />
    </div>
  );
};

export default Calendar;
