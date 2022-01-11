import React, { useEffect, useState, useContext } from "react";
import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import Calendar from "../../Components/Calendar/Calendar";
import { Box } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Agenda = () => {
  const [valToken] = useLocalStorage("userVal");
  const [config, setConfig] = useState({});
  const [token, setToken] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (valToken !== "") {
      setToken(valToken.token);
    }
  }, [setToken, valToken]);

  useEffect(() => {
    clienteAxios
      .get("/setting/61db80c35077771dee3267b6", {
        headers: { apitoken: token },
      })
      .then((response) => {
        //console.log(2, response);
        setConfig(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }, [setConfig, token]);

  //console.log(3, config);

  if (valToken !== "" && Object.keys(config).length !== 0) {
    const { id_tatoostudios, timeToOpen, timeToClose, dayAvailables } = config;

    let dayNum = [];
    dayAvailables.forEach((days) => {
      if (days === "domingo") {
        dayNum.push(0);
      }
      if (days === "lunes") {
        dayNum.push(1);
      }
      if (days === "martes") {
        dayNum.push(2);
      }
      if (days === "miercoles") {
        dayNum.push(3);
      }
      if (days === "jueves") {
        dayNum.push(4);
      }
      if (days === "viernes") {
        dayNum.push(5);
      }
      if (days === "sabado") {
        dayNum.push(6);
      }
      return dayNum;
    });
    //console.log(dayNum);

    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", m: 14 }}>
          <Calendar
            timeToOpen={timeToOpen}
            timeToClose={timeToClose}
            dayAvailables={dayNum}
          />
        </Box>
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
