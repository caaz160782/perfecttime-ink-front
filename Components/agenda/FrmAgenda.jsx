import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import clienteAxios from "../../utils/axios";

const FrmAgenda = () => {
  const { auth } = useContext(AuthContext);
  const [config, setConfig] = useState({});
  const [reload, setReload] = useState("true");

  useEffect(() => {
    if (reload) {
      clienteAxios
        .get(`/findStudiSetting/${auth.infoStudio.id}`, {
          //   headers: { apitoken: auth.token },
        })
        .then((response) => {
          console.log(2, response);
          setConfig(response.data.payload);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    }
    setReload(false);
  }, []);

  // if (auth.token !== "" && Object.keys(config).length !== 0) {
  if (Object.keys(config).length !== 0) {
    const { timeToOpen, timeToClose, dayNotAvailables } = config;
    let dayNum = [];
    if (dayNotAvailables.length !== 0) {
      dayNotAvailables.forEach((days) => {
        if (days === "Domingo") {
          dayNum.push(0);
        }
        if (days === "Lunes") {
          dayNum.push(1);
        }
        if (days === "Martes") {
          dayNum.push(2);
        }
        if (days === "Miercoles") {
          dayNum.push(3);
        }
        if (days === "Jueves") {
          dayNum.push(4);
        }
        if (days === "Viernes") {
          dayNum.push(5);
        }
        if (days === "Sabado") {
          dayNum.push(6);
        }
        dayNum;
      });
    }

    return (
      <div>
        <Calendar
          timeToOpen={timeToOpen}
          timeToClose={timeToClose}
          dayNotAvailables={dayNum}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>que paso</h1>
      </div>
    );
  }
};
export default FrmAgenda;
