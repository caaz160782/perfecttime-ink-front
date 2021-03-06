import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { Box, Snackbar } from "@mui/material";
import FrmStudio from "./FrmStudio";
import { useRouter } from "next/router";

const StudioConfig = () => {
  const { auth, saveinfoStudio } = useContext(AuthContext);
  const [titleButton, setTitleButton] = useState("");
  const router = useRouter();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const [valuesConfigStudio, setvaluesConfigStudio] = useState({
    //id_user: auth?.infoUser._id,
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
  //const [cp, setCp] = useState("");
  const [ver, setVer] = useState("");
  const [title, setTitle] = useState("");

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChange = (prop) => (event) => {
    setvaluesConfigStudio({
      ...valuesConfigStudio,
      [prop]: event.target.value,
    });

    /* if (prop === "postalCode") {
      setCp(event.target.value);
    }*/
  };

  useEffect(() => {
    setTitle("Ingresa");
    setTitleButton("Registrar");
    setVer("hidden");
  }, []);

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
      .post("/studio", formData, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        saveinfoStudio({ id: response.data.payload._id, name: name });
        router.push("/config");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log("aaca");

          console.log(error.response.data);
          setAlert({
            open: true,
            message: error.response.data.error,
            //message: "No se pueden generar citas en dias anteriores",
            backgroundColor: "#DD4A48",
            //#519259
          });
        } else {
          console.log("aaca");
          console.log(error);
        }
      });
  };
  const [loading, setLoading] = useState(false);

  //console.log(valuesConfigStudio);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // m: 15,
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
      <FrmStudio
        title={title}
        //cp={cp}
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
    </Box>
  );
};

export default StudioConfig;
