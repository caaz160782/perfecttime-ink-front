import React, { useState, useContext, useEffect } from "react";
import { Box, Snackbar } from "@mui/material";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import FrmConfig from "./FrmConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Config = () => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("Modificar");
  const MySwal = withReactContent(Swal);
  const [archivo, guardarArchivo] = useState("");
  const [valuesConfig, setValuesConfig] = useState({
    id_tatoostudios: auth?.infoStudio.id,
    picture: "",
    timeToOpen: "07:00",
    timeToClose: "19:00",
    dayNotAvailables: [],
    notifications: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const cargarSetting = async () => {
    clienteAxios
      .get(`/setting/${auth.infoStudio.id}`, {
        headers: { apitoken: auth.token },
      })
      .then((response) => {
        setValuesConfig(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    cargarSetting();
  }, []);

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
    //console.log("modif");
    const formData = new FormData();
    formData.append("id_tatoostudios", auth.infoStudio.id);
    formData.append("timeToOpen", valuesConfig.timeToOpen);
    formData.append("timeToClose", valuesConfig.timeToClose);
    formData.append("notifications", valuesConfig.notifications);
    formData.append("dayNotAvailables", [valuesConfig.dayNotAvailables]);
    formData.append("picture", archivo);
    setLoading(true);
    clienteAxios
      .patch(`/setting/${valuesConfig._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          apitoken: auth?.token,
        },
      })
      .then((response) => {
        const { status } = response.data;
        if (status) {
          cargarSetting();
          setLoading(false);
          setAlert({
            open: true,
            message: "Estudio actualizado correctamente",
            backgroundColor: "#519259",
            fontWeight: "500",
          });
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
      {" "}
      <Snackbar
        open={alert.open}
        message={alert.message}
        style={{ height: "70%" }}
        ContentProps={{
          style: {
            backgroundColor: alert.backgroundColor,
            fontWeight: alert.fontWeight,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
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
