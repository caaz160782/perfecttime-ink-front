import React, { useState, useEffect, useContext } from "react";
import { Box, Snackbar } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import ModalDate from "./ModalDate";
import ModalDateTatuador from "./ModalDateTatuador";
import ModalDateClient from "./ModalDateClient";
import ModalViewDate from "./ModalViewDate";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { isSameDay, parseISO } from "date-fns";

const Calendar = ({
  timeToOpen,
  timeToClose,
  dayNotAvailables,
  reloadDate,
  setReloadDate,
}) => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [fechaHoy, setFecha] = useState("");
  const [even, setEven] = useState([]);
  const [evenByDay, setEvenByDay] = useState([]);
  const [valueDate, setValuDate] = useState({
    id_studio: auth?.infoStudio.id,
    picture: "",
    hourTatooStart: "00:00",
    hourTatooFinish: "00:00",
    id_size: -1,
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
      if (even !== undefined) {
        const pruv = even.filter((dates) =>
          isSameDay(parseISO(dates.start), fechaSelec)
        );
        setEvenByDay(pruv);
      }
      setValuDate({
        ...valueDate,
        id_tatuador: "",
        addDate: arg.dateStr,
        start: arg.dateStr + "T" + timeToOpen,
        hourTatooStart: timeToOpen,
        hourTatooFinish: timeToOpen,
      });
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
      id_tatuador: info.event.extendedProps._id,
      name: info.event.extendedProps.id_tatuador.name,
      lastName: info.event.extendedProps.id_tatuador.lastName,
      statusPago: info.event.extendedProps.statusPago,
      tipoTatoo: info.event.extendedProps.tipoTatoo,
      hourTatooStart: info.event.extendedProps.hourTatooStart,
      hourTatooFinish: info.event.extendedProps.hourTatooFinish,
      title: info.event.title,
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
  // useEffect(() => {
  //   if (reloadDate) {
  //     cargaDates();
  //     setReloadDate(false);
  //   }
  // }, [reloadDate]);

  const cargaDatesStaff = async () => {
    try {
      clienteAxios
        .post(
          `/staffDate/${auth.infoStudio.id}`,
          { idStaff: auth.infoUser._id },
          {
            headers: { apitoken: auth.token },
          }
        )
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

  const cargaDatesClient = async () => {
    try {
      console.log(auth);
      clienteAxios
        .post(
          `/clientDate/${auth.infoStudio.id}`,
          { idClient: auth?.infoUser._id },
          {
            headers: { apitoken: auth.token },
          }
        )
        .then((response) => {
          if (response.data.code) {
            //console.log(response.data.payload.dates);
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
    if (reloadDate) {
      switch (auth.infoUser.rol) {
        case "Administrador":
          cargaDates();
          break;
        case "Cliente":
          cargaDatesClient();
          break;
        case "tatuador":
          cargaDatesStaff();
          break;
        default:
          console.log("example");
      }
      setReloadDate(false);
    }
  }, [auth.infoUser.rol, reloadDate]);

  return (
    <div>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        // anchorOrigin={{ vertical, horizontal }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={1000}
      />
      <div>
        {auth.infoUser.rol === "Administrador" ? (
          <ModalDate
            open={open}
            setOpen={setOpen}
            evenByDay={evenByDay}
            fechaHoy={fechaHoy}
            setValuDate={setValuDate}
            setOpenViewModal={setOpenViewModal}
            valueDate={valueDate}
            cargaDates={cargaDates}
            setinfoDate={setinfoDate}
            timeToOpen={timeToOpen}
            timeToClose={timeToClose}
          />
        ) : (
          ""
        )}
        {auth.infoUser.rol === "tatuador" ? (
          <ModalDateTatuador
            open={open}
            setOpen={setOpen}
            evenByDay={evenByDay}
            fechaHoy={fechaHoy}
            setValuDate={setValuDate}
            setOpenViewModal={setOpenViewModal}
            valueDate={valueDate}
            cargaDatesStaff={cargaDatesStaff}
            setinfoDate={setinfoDate}
            timeToOpen={timeToOpen}
            timeToClose={timeToClose}
          />
        ) : (
          ""
        )}
        {auth.infoUser.rol === "Cliente" ? (
          <ModalDateClient
            open={open}
            setOpen={setOpen}
            evenByDay={evenByDay}
            fechaHoy={fechaHoy}
            setValuDate={setValuDate}
            setOpenViewModal={setOpenViewModal}
            valueDate={valueDate}
            cargaDatesClient={cargaDatesClient}
            setinfoDate={setinfoDate}
            timeToOpen={timeToOpen}
            timeToClose={timeToClose}
          />
        ) : (
          ""
        )}
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
          cargaDatesClient={cargaDatesClient}
          cargaDatesStaff={cargaDatesStaff}
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
        // events={[
        //   {
        //     _id: "61e8cdb8c3fb01c5c92f1b2c",
        //     id_studio: "61e61570ea90a93081fda151",
        //     id_tatuador: "61e615bbea90a93081fda160",
        //     id_cliente: "61e61626ea90a93081fda16b",
        //     id_size: "61de76fbc5ac1b41c7bea24b",
        //     start: "2022-01-22T10:30",
        //     //myDuration: "02:30",
        //     end: "2022-01-22T13:00",
        //     addDate: "2022-01-20T02:49:28.469+00:00",
        //     title: "example",
        //     description: "tatuajes retro ejemplook",
        //     desPhotoTatoo: "ZjtePmWzM.jpeg",
        //     tipoTatoo: "Blanco y Negro",
        //     motivo: "exampĺe 12",
        //     cost: 5000,
        //     estimated: 200,
        //     display: "block",
        //     backgroundColor: "red",
        //     //borderColor: "green",
        //     //textColor: "red",
        //     extendedProps: {
        //       department: "BioChemistry",
        //     },
        //     description: "Lecture",
        //   },
        //   {
        //     _id: "61e8cdb8c3fb01c5c92f1b2c",
        //     id_studio: "61e61570ea90a93081fda151",
        //     id_tatuador: "61e615bbea90a93081fda160",
        //     id_cliente: "61e61626ea90a93081fda16b",
        //     id_size: "61de76fbc5ac1b41c7bea24b",
        //     start: "2022-01-22T13:30",
        //     end: "2022-01-20T15:00",
        //     addDate: "2022-01-20T02:49:28.469+00:00",
        //     title: "example2",
        //     description: "tatuajes retro ejemplook",
        //     desPhotoTatoo: "ZjtePmWzM.jpeg",
        //     tipoTatoo: "Blanco y Negro",
        //     motivo: "exampĺe 12",
        //     cost: 5000,
        //     estimated: 200,
        //     eventBackgroundColor: "red",
        //   },
        // ]}
        // fc-past={background-color:"red"}
        //eventColor="#378006"
        //eventDisplay=""

        //eventTextColor="#378006"
        //eventDurationEditable={true}
        //
        //editable={true}
      />
    </div>
  );
};

export default Calendar;
