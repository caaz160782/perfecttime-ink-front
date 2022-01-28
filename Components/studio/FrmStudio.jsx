import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  styled,
  Button,
  Snackbar,
  Container,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";
import LocalidadSelect from "./LocalidadSelect";

const FrmStudio = ({
  title,
  cargarStudioInfo,
  leerArchivo,
  valuesConfigStudio,
  setvaluesConfigStudio,
  handleChange,
  handlerSubmit,
  loading,
  ver,
  setVer,
  butonLabel,
}) => {
  const Input = styled("input")({
    display: "none",
  });
  const { auth } = useContext(AuthContext);
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [localidad, setLocalidad] = useState([
    { _id: 0, localidad: "Nothing" },
  ]);

  const [loadingCP, setLoadingCP] = useState(false);

  const postaCodeFind = async (cp) => {
    clienteAxios
      .get(`/localidad/${cp}`, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        if (response.data.ok) {
          let info = response.data.payload;
          const stado = info.reduce((accum, esta) => {
            const { Estado } = esta;
            return !accum[Estado]
              ? { ...accum, nombre: [esta] }
              : { ...accum, nombre: [...accum[Estado], esta] };
          }, {});
          setEstado(stado.nombre[0].Estado);
          const muni = info.reduce((accum, municipio) => {
            const { nombreMunicipio } = municipio;
            return !accum[nombreMunicipio]
              ? { ...accum, nombre: [municipio] }
              : {
                  ...accum,
                  nombre: [...accum[nombreMunicipio], municipio],
                };
          }, {});
          setMunicipio(muni.nombre[0].nombreMunicipio);
          setLocalidad(info);
          setvaluesConfigStudio({
            ...valuesConfigStudio,
            state: stado.nombre[0].Estado,
            municipality: muni.nombre[0].nombreMunicipio,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("ddddd", error.response.data);
        } else {
          console.log("dddd", error);
        }
      });
  };

  useEffect(() => {
    //console.log(ver);
    if (valuesConfigStudio.postalCode !== "") {
      postaCodeFind(valuesConfigStudio.postalCode);
    }
  }, [valuesConfigStudio.postalCode]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  return (
    <Container fixed>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          flexWrap: "wrap",
          alignItems: "center",
          //m: 18,
        }}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "secondary.main",
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              borderRadiusTop: 2,
              height: 50,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{ m: 1, color: "#FFF" }}
              component="h6"
              variant="h6"
            >
              {title} Datos del Estudio
            </Typography>
          </Box>
          <Box>
            <form id="form" onSubmit={handlerSubmit}>
              <Box sx={{ m: 4 }}>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    size="small"
                    required
                    label="Nombre del estudio"
                    name="name"
                    id="name"
                    value={valuesConfigStudio.name}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("name")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    size="small"
                    id="description"
                    label="Description"
                    name="description"
                    value={valuesConfigStudio.description}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("description")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Suba Permiso de Cofepris (jpg,png)
                  </Typography>
                  <TextField
                    sx={{ width: "300px" }}
                    id="picture"
                    size="small"
                    //required
                    name="picture"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    id="rfc"
                    size="small"
                    label="RFC"
                    name="rfc"
                    value={valuesConfigStudio.rfc}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("rfc")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    size="small"
                    id="phoneStudio"
                    label="Telefono"
                    name="phoneStudio"
                    value={valuesConfigStudio.phoneStudio}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("phoneStudio")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    size="small"
                    id="phoneWhatsApp"
                    label="Whatsapp"
                    name="phoneWhatsApp"
                    inputProps={{ type: "text" }}
                    value={valuesConfigStudio.phoneWhatsApp}
                    onChange={handleChange("phoneWhatsApp")}
                  ></TextField>
                </Box>
                {/* <Box>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="social"
            label="Redes sociales"
            name="social"
            inputProps={{ type: "text" }}
            value={valuesConfigStudio.social}
            onChange={handleChange("social")}
          ></TextField>

        </Box> */}
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    id="postalCode"
                    size="small"
                    label="Codigo Postal"
                    name="postalCode"
                    inputProps={{ type: "text" }}
                    value={valuesConfigStudio.postalCode}
                    onChange={handleChange("postalCode")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    label="Estado"
                    id="state"
                    size="small"
                    name="state"
                    value={valuesConfigStudio.state}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("state")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    id="municipality"
                    label="Municipio"
                    name="municipality"
                    size="small"
                    value={valuesConfigStudio.municipality}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("municipality")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1 }}>
                  <LocalidadSelect
                    handleChange={handleChange}
                    setLocalidad={setLocalidad}
                    localidad={localidad}
                    valuesConfigStudio={valuesConfigStudio}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
                    required
                    size="small"
                    id="address"
                    label="Domicilio"
                    name="address"
                    value={valuesConfigStudio.address}
                    inputProps={{ type: "text" }}
                    onChange={handleChange("address")}
                  ></TextField>
                </Box>
                <Box sx={{ m: 2 }}>
                  <LoadingButton
                    sx={{ width: "300px" }}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                  >
                    {butonLabel}
                  </LoadingButton>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FrmStudio;
