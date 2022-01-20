import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  styled,
  Button,
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

  const findCP = (e) => {
    setVer("visible");
    e.preventDefault();
    setLoadingCP(true);
    postaCodeFind(valuesConfigStudio.postalCode);
  };

  const postaCodeFind = async (cp) => {
    clienteAxios
      .get(`/localidad/${cp}`, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        if (response.data.ok) {
          //   console.log(response);
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
          setLoadingCP(false);
          setvaluesConfigStudio({
            ...valuesConfigStudio,
            state: stado.nombre[0].Estado,
            municipality: muni.nombre[0].nombreMunicipio,
          });
        }
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
    console.log(1);
    if (valuesConfigStudio.postalCode !== "") {
      postaCodeFind(valuesConfigStudio.postalCode);
    }
  }, [valuesConfigStudio.postalCode]);
  //console.log(valuesConfigStudio);

  return (
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
      <Typography component="h5" variant="h5">
        {title} Datos del Estudio
      </Typography>
      <form id="form" onSubmit={handlerSubmit}>
        <Box>
          <TextField
            sx={{ width: "30ch" }}
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
        <Box>
          <TextField
            sx={{ m: 1, width: "30ch" }}
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            sx={{ m: 1, width: "175px" }}
            id="picture"
            size="small"
            //required
            name="picture"
            inputProps={{ type: "file" }}
            onChange={leerArchivo}
          ></TextField>
          <Box></Box>
        </Box>

        <Box>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="rfc"
            label="RFC"
            name="rfc"
            value={valuesConfigStudio.rfc}
            inputProps={{ type: "text" }}
            onChange={handleChange("rfc")}
          ></TextField>
        </Box>

        <Box>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="phoneStudio"
            label="Telefono"
            name="phoneStudio"
            value={valuesConfigStudio.phoneStudio}
            inputProps={{ type: "text" }}
            onChange={handleChange("phoneStudio")}
          ></TextField>
        </Box>

        <Box>
          <TextField
            sx={{ m: 1, width: "30ch" }}
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

        <Box>
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
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            sx={{ m: 1, width: "20ch" }}
            required
            id="postalCode"
            label="Codigo Postal"
            name="postalCode"
            inputProps={{ type: "text" }}
            value={valuesConfigStudio.postalCode}
            onChange={handleChange("postalCode")}
          ></TextField>
          <Box>
            <LoadingButton
              endIcon={<SearchIcon />}
              loading={loadingCP}
              loadingPosition="end"
              variant="contained"
              onClick={findCP}
            ></LoadingButton>
          </Box>
        </Box>

        <Box component="div" sx={{ visibility: { ver } }}>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="state"
              name="state"
              value={valuesConfigStudio.state}
              inputProps={{ type: "text" }}
              onChange={handleChange("state")}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="municipality"
              name="municipality"
              value={valuesConfigStudio.municipality}
              inputProps={{ type: "text" }}
              onChange={handleChange("municipality")}
            ></TextField>
          </Box>

          <Box>
            <LocalidadSelect
              handleChange={handleChange}
              setLocalidad={setLocalidad}
              localidad={localidad}
              valuesConfigStudio={valuesConfigStudio}
            />
          </Box>

          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
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
  );
};

export default FrmStudio;
