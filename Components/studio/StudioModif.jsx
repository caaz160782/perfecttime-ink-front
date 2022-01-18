import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { Box } from "@mui/material";
import FrmStudio from "./FrmStudio";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StudioModif = () => {
  const { auth, saveinfoStudio } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [ver, setVer] = useState("visible");
  const [valuesConfigStudio, setvaluesConfigStudio] = useState({});
  const [archivo, guardarArchivo] = useState("");
  const [cp, setCp] = useState("");

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChange = (prop) => (event) => {
    setvaluesConfigStudio({
      ...valuesConfigStudio,
      [prop]: event.target.value,
    });
    if (prop === "postalCode") {
      setCp(event.target.value);
    }
  };
  const cargarStudioInfo = () => {
    clienteAxios
      .get(`/studio/${auth.infoStudio.id}`, {
        headers: { apitoken: auth.token },
      })
      .then((response) => {
        //console.log(response);
        setvaluesConfigStudio(response.data.payload);
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
    cargarStudioInfo();
  }, []);

  //console.log(valuesConfigStudio);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", valuesConfigStudio.name);
    formData.append("description", valuesConfigStudio.description);
    formData.append("postalCode", valuesConfigStudio.postalCode);
    formData.append("rfc", valuesConfigStudio.rfc);
    formData.append("municipality", valuesConfigStudio.municipality);
    formData.append("state", valuesConfigStudio.state);
    formData.append("city", valuesConfigStudio.city);
    formData.append("address", valuesConfigStudio.address);
    formData.append("phoneWhatsApp", valuesConfigStudio.phoneWhatsApp);
    formData.append("phoneStudio", valuesConfigStudio.phoneStudio);
    formData.append("social", [valuesConfigStudio.social]);
    formData.append("picture", archivo);

    clienteAxios
      .patch(`/studio/${auth.infoStudio.id}`, formData, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        cargarStudioInfo();
        // setLoading(false);
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Actualizado Correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //m: 15,
      }}
    >
      <FrmStudio
        title={"Mofique"}
        cp={cp}
        setVer={setVer}
        leerArchivo={leerArchivo}
        valuesConfigStudio={valuesConfigStudio}
        setvaluesConfigStudio={setvaluesConfigStudio}
        handleChange={handleChange}
        handlerSubmit={handlerSubmit}
        loading={loading}
        setLoading={setLoading}
        butonLabel={"Guardar"}
      />
    </Box>
  );
};

export default StudioModif;
