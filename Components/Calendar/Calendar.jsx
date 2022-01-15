import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";
import ModalViewDate from "./ModalViewDate";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";

const Calendar = ({ timeToOpen, timeToClose, dayNotAvailables }) => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [fechaHoy, setFecha] = useState("");
  const [even, setEven] = useState([]);
  const [valueDate, setValuDate] = useState({
    id_studio: auth.infoStudio.id,
    id_cliente: "61a5c587cb1557cfd225dd8e",
    id_staff: "61a5c587cb1557cfd225dd8e",
  });
  const [infoDate, setinfoDate] = useState({});

  const handleDateClick = (arg) => {
    setValuDate({ ...valueDate, addDate: arg.dateStr });
    setFecha(arg.dateStr);
    setOpen(true);
  };

  const HandleEventClick = (info) => {
    //console.log(info.event._def);
    setinfoDate(info.event._def);
    setOpenViewModal(true);
  };

  const cargaDates = async () => {
    try {
      clienteAxios
        .get(`/dateTatoo/${auth.infoStudio.id}`, {
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

  return (
    <div>
      <div>
        <ModalDate
          open={open}
          setOpen={setOpen}
          fechaHoy={fechaHoy}
          setValuDate={setValuDate}
          valueDate={valueDate}
          cargaDates={cargaDates}
        />
      </div>
      <div>
        <ModalViewDate
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          fechaHoy={fechaHoy}
          infoDate={infoDate}
          setinfoDate={setinfoDate}
          // valueDate={valueDate}
          cargaDates={cargaDates}
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
