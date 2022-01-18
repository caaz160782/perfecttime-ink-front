import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import FrmConfig from "./FrmConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Config = () => {
  const { auth } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);

  const [valuesConfig, setValuesConfig] = useState({
    id_tatoostudios: auth?.infoStudio.id,
    picture: "",
    timeToOpen: "07:00",
    timeToClose: "19:00",
    dayNotAvailables: [],
    notifications: "",
  });

  const [archivo, guardarArchivo] = useState("");

  useEffect(() => {
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
    console.log("modif");
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
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Actualizado Correctamente",
            showConfirmButton: false,
            timer: 1500,
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
      <FrmConfig
        title={"Modificar"}
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
