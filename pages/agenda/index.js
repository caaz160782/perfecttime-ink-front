import React, { useEffect, useState, useContext } from "react";
import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { InfoOutlined } from "@mui/icons-material";
=======
import Calendar from "../../Components/Calendar/Calendar";
import { Box } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
>>>>>>> c8c44e658614396db93c2606e872a35868c450f8

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
      console.log(2);
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
          <Box sx={{ display: "flex", justifyContent: "center", m: 14 }}>
            <Calendar
              timeToOpen={timeToOpen}
              timeToClose={timeToClose}
              dayNotAvailables={dayNum}
            />
          </Box>
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
<<<<<<< HEAD


=======
>>>>>>> c8c44e658614396db93c2606e872a35868c450f8
};
export default Agenda;
