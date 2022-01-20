import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";
import FrmConfig from "./FrmConfig";

const Config = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("Configurar");
  const [valuesConfig, setValuesConfig] = useState({
    id_tatoostudios: auth?.infoStudio.id,
    picture: "",
    timeToOpen: "07:00",
    timeToClose: "19:00",
    dayNotAvailables: [],
    notifications: "",
  });
  const [archivo, guardarArchivo] = useState("");
  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChange = (prop) => (event) => {
    setValuesConfig({ ...valuesConfig, [prop]: event.target.value });
    if (prop[0] === "dayNotAvailables") {
      const {
        target: { value },
      } = event;
      setValuesConfig({ ...valuesConfig, [prop]: event.target.value });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_tatoostudios", auth.infoStudio.id);
    formData.append("timeToOpen", valuesConfig.timeToOpen);
    formData.append("timeToClose", valuesConfig.timeToClose);
    formData.append("notifications", valuesConfig.notifications);
    formData.append("dayNotAvailables", [valuesConfig.dayNotAvailables]);
    formData.append("picture", archivo);
    clienteAxios
      .post("/setting", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          apitoken: auth.token,
        },
      })
      .then((response) => {
        const { status } = response.data;
        if (status) {
          router.push("/agenda");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <FrmConfig
        title={title}
        handlerSubmit={handlerSubmit}
        handleChange={handleChange}
        leerArchivo={leerArchivo}
        valuesConfig={valuesConfig}
        loading={loading}
      />
    </Box>
  );
};

export default Config;
