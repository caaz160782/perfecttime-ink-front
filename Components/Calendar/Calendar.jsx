import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import clienteAxios from "../../utils/axios";

const Calendar = ({ timeToOpen, timeToClose, dayNotAvailables }) => {
  const [open, setOpen] = useState(false);
  const [fechaHoy, setFecha] = useState("");
  const [even, setEven] = useState([]);
  const [valStudio] = useLocalStorage("studioVal", "");
  const [valueDate, setValuDate] = useState({
    id_studio: valStudio,
    id_cliente: "61a5c587cb1557cfd225dd8e",
    id_staff: "61de4d484536edaebe55dd00",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateClick = (arg) => {
    setValuDate({ ...valueDate, addDate: arg.dateStr });
    setFecha(arg.dateStr);
    setOpen(true);
  };

  const HandleEventClick = (info) => {
    alert("Event: " + info.event.title);
    alert(info.event);

    console.log(info.event);
  };

  const handleChangeDate = (prop) => (event) => {
    setValuDate({ ...valueDate, [prop]: event.target.value });
    if (prop === "hourTatooStart") {
      setValuDate({
        ...valueDate,
        start: valueDate.addDate + "T" + event.target.value,
      });
    }
    if (prop === "hourTatooFinish") {
      setValuDate({
        ...valueDate,
        end: valueDate.addDate + "T" + event.target.value,
      });
    }
  };

  const cargaDates = async () => {
    try {
      clienteAxios
        .get(`/dateTatoo/${valStudio}`, {
          //headers: { apitoken: token },
        })
        .then((response) => {
          if (response.data.code) {
            setEven(response.data.payload.dates);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargaDates();
  }, []);

  const handleGuardar = (e) => {
    e.preventDefault();
    // setLoading(true);
    clienteAxios
      .post("/dateTatoo", valueDate, {
        //   headers: { apitoken: valToken.token },
      })
      .then((response) => {
        //console.log(response.data);
        const { code } = response.data;
        //console.log();
        if (code === "Succesful") {
          //setEven([response.data.payload]);
          cargaDates();
          setOpen(false);
        }
      })
      .catch((error) => {
        // setLoading(false);
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
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
          right: "dayGridMonth,timeGridDay",
        }}
        contentHeight={580}
        hiddenDays={dayNotAvailables}
        slotMinTime={timeToOpen}
        slotMaxTime={timeToClose}
        dateClick={handleDateClick}
        eventClick={HandleEventClick}
        events={even}
        //eventDurationEditable={true}
        //eventBackgroundColor="violet" //color por tatuador
      />
    </div>
  );
};

export default Calendar;
