import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import { Box } from "@mui/material";
import FrmStudio from "./FrmStudio";
import { useRouter } from "next/router";

const StudioConfig = () => {
  const { auth, saveinfoStudio } = useContext(AuthContext);
  const router = useRouter();

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
  const [cp, setCp] = useState("");
  const [ver, setVer] = useState("hidden");

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
          console.log(error.response.data);
        } else {
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
        m: 15,
      }}
    >
      <FrmStudio
        title={"Ingrese"}
        cp={cp}
        ver={ver}
        setVer={setVer}
        leerArchivo={leerArchivo}
        valuesConfigStudio={valuesConfigStudio}
        setvaluesConfigStudio={setvaluesConfigStudio}
        handleChange={handleChange}
        handlerSubmit={handlerSubmit}
        loading={loading}
        setLoading={setLoading}
        butonLabel={"Registrar"}
      />
    </Box>
  );
};

export default StudioConfig;
