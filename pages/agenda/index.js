import React, { useEffect, useState, useContext } from "react";
import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import Calendar from "../../Components/Calendar/Calendar";
import { Box } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Agenda = () => {
  const [valToken] = useLocalStorage("userVal", "");
  const [valStudio] = useLocalStorage("studioVal", "");
  const [config, setConfig] = useState({});
  const [token, setToken] = useState({});
  const [studioId, setStudioId] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (valToken !== "") {
      setToken(valToken.token);
    }
    if (valStudio !== "") {
      setStudioId(valStudio);
    }
  }, [setToken, valToken, valStudio]);

  useEffect(() => {
    //if (studioId) {
    clienteAxios
      .get(`/findStudiSetting/${studioId}`, {
        headers: { apitoken: token },
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
    //}
  }, [setConfig, studioId, token]);

  //console.log(3, Object.keys(config).length);

  if (valToken !== "" && Object.keys(config).length !== 0) {
    const { id_tatoostudios, timeToOpen, timeToClose, dayNotAvailables } =
      config;

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
      <Layout>
        <div style={{ width: "100%" }}>
          <Calendar
            timeToOpen={timeToOpen}
            timeToClose={timeToClose}
            dayNotAvailables={dayNum}
          />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>No autorizado</h1>
      </Layout>
    );
  }
};
export default Agenda;
