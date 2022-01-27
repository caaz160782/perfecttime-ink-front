import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { Box, Snackbar } from "@mui/material";
import FrmStudio from "./FrmStudio";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StudioModif = () => {
  const { auth } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [ver, setVer] = useState("visible");
  const [valuesConfigStudio, setvaluesConfigStudio] = useState({
    name: "",
    description: "",
    picture: "",
    postalCode: "",
    municipality: "",
    state: "",
    city: "",
    address: "",
    phoneWhatsApp: "",
    phoneStudio: "",
    rfc: "",
    social: "",
  });
  const [archivo, guardarArchivo] = useState("");
  const [title, setTitle] = useState("");
  const [titleButton, setTitleButton] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChange = (prop) => (event) => {
    setvaluesConfigStudio({
      ...valuesConfigStudio,
      [prop]: event.target.value,
    });
  };

  const cargarStudioInfo = async () => {
    clienteAxios
      .get(`/studio/${auth.infoStudio.id}`, {
        headers: { apitoken: auth.token },
      })
      .then((response) => {
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
    setTitle("Modifica");
    setTitleButton("Guardar");
  }, [auth.infoStudio.id, auth.token]);

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
        setLoading(false);
        setAlert({
          open: true,
          message: "estudio actualizado correctamente",
          backgroundColor: "#519259",
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          setAlert({
            open: true,
            message: error.response.data.error,
            backgroundColor: "#DD4A48",
          });
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
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      {
        <FrmStudio
          title={title}
          cargarStudioInfo={cargarStudioInfo}
          ver={ver}
          setVer={setVer}
          leerArchivo={leerArchivo}
          valuesConfigStudio={valuesConfigStudio}
          setvaluesConfigStudio={setvaluesConfigStudio}
          handleChange={handleChange}
          handlerSubmit={handlerSubmit}
          loading={loading}
          setLoading={setLoading}
          butonLabel={titleButton}
        />
      }
    </Box>
  );
};

export default StudioModif;
