import React, { useState, useEffect, useContext } from "react";
import { Box, Snackbar } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";
import ModalViewDate from "./ModalViewDate";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { isBefore } from "date-fns";

const Calendar = ({ timeToOpen, timeToClose, dayNotAvailables }) => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [fechaHoy, setFecha] = useState("");
  const [even, setEven] = useState([]);
  const [valueDate, setValuDate] = useState({
    id_studio: auth.infoStudio.id,
    picture: "",
  });
  const [infoDate, setinfoDate] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleDateClick = (arg) => {
    const fechaSelec = arg.date;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    fechaSelec.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    if (fechaSelec.getTime() >= hoy.getTime()) {
      setValuDate({ ...valueDate, addDate: arg.dateStr });
      setFecha(arg.dateStr);
      setOpen(true);
    } else {
      setAlert({
        open: true,
        message: "No se pueden generar citas en dias anteriores",
        backgroundColor: "#DD4A48",
        //#519259
      });
    }
  };

  const HandleEventClick = (info) => {
    let dateTatooInfo = {};
    dateTatooInfo = {
      ...dateTatooInfo,
      addDate: info.event.extendedProps.addDate,
      cost: info.event.extendedProps.cost,
      desPhotoTatoo: info.event.extendedProps.desPhotoTatoo,
      description: info.event.extendedProps.description,
      estimated: info.event.extendedProps.estimated,
      id_cliente: info.event.extendedProps.id_cliente,
      id_size: info.event.extendedProps.id_size,
      id_studio: info.event.extendedProps.id_studio,
      id_tatuador: info.event.extendedProps.id_tatuador,
      statusPago: info.event.extendedProps.statusPago,
      tipoTatoo: info.event.extendedProps.tipoTatoo,
      _id: info.event.extendedProps._id,
      end: info.event.end,
      endStr: info.event.endStr,
      start: info.event.start,
      startStr: info.event.startStr,
    };
    setinfoDate(dateTatooInfo);
    setOpenViewModal(true);
  };

  const cargaDates = async () => {
    try {
      clienteAxios
        .get(`/dateTatooByStudio/${auth.infoStudio.id}`, {
          headers: { apitoken: auth.token },
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
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={2000}
      />
      <div>
        <ModalDate
          open={open}
          setOpen={setOpen}
          fechaHoy={fechaHoy}
          setValuDate={setValuDate}
          setOpenViewModal={setOpenViewModal}
          valueDate={valueDate}
          cargaDates={cargaDates}
          setinfoDate={setinfoDate}
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
