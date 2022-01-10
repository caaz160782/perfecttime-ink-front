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
  const [config, setConfig] = useState({});
  const [token, setToken] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (valToken) {
      // console.log(0, valToken);
      // console.log(2, valToken.token);
      setToken(valToken.token);
    }
  }, []);

  useEffect(() => {
    clienteAxios
      .get("/setting/61db80c35077771dee3267b6", {
        headers: { apitoken: token },
      })
      .then((response) => {
        console.log(7, response);
        setConfig(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }, []);

  console.log(config);
  if (valToken) {
    // if (config) {
    //   const { id_tatoostudios, timeToOpen, timeToClose, dayAvailables } =
    //     config;

    //   console.log(8, dayAvailables);

    //   let days1 = [];

    //   dayAvailables.forEach((days) => {
    //     console.log(days);
    //     if (days === "Domingo") {
    //       comnsole.log(0);
    //     }
    //   });

    //   //console.log(2, days1);
    // }
    // //console.log(config);
    // console.log(1, infoUser.name);
    // console.log(2, infoUser._id);

    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", m: 14 }}>
          <Calendar

          // timeToOpen={timeToOpen}
          //timeToClose={timeToClose}
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
