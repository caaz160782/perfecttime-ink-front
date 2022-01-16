import React, { useState } from "react";
import { Typography, TextField, Box, IconButton, styled } from "@mui/material";
import clienteAxios from "../../utils/axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const FrmStudio = () => {
  const router = useRouter();
  const { auth, guardarAuth, logOut, saveinfoStudio } = useContext(AuthContext);
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [valStudio, setStudio] = useLocalStorage("studioVal", "");
  const Input = styled("input")({
    display: "none",
  });

  const initialForm = {
    id_user: valToken.infoUser._id,
    name: "",
    description: "",
    licenseImage: "url",
    postalCode: "",
    municipality: "",
    state: "",
    city: "",
    address: "",
    phoneWhatsApp: "",
    phoneStudio: "",
    rfc: "",
    social: "",
  };

  const [tatstudio, actualizarState, reset] = useForm(initialForm);
  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clienteAxios
      .post("/studio", tatstudio, {
        headers: { apitoken: valToken.token },
      })
      .then((response) => {
        console.log(response.data);
        setStudio(response.data.payload._id);
        // saveinfoStudio(response.data.payload._id);
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

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          flexWrap: "wrap",
          p: 1,
          m: 15,
        }}
      >
        <Typography component="h5" variant="h5">
          Ingrese Datos del Estudio
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="name"
              label="Nombre del estudio"
              name="name"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="description"
              label="Description"
              name="description"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={actualizarState}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="rfc"
              label="RFC"
              name="rfc"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="postalCode"
              label="Codigo Postal"
              name="postalCode"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="municipality"
              label="Municipio"
              name="municipality"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="state"
              label="Estado"
              name="state"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="city"
              label="Ciudad"
              name="city"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="address"
              label="Domicilio"
              name="address"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="phoneStudio"
              label="Telefono"
              name="phoneStudio"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              required
              id="phoneWhatsApp"
              label="Whatsapp"
              name="phoneWhatsApp"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
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
              onChange={actualizarState}
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
              Registrar
            </LoadingButton>
            {/* <Button variant="contained" type="submit" fullWidth color="primary">
                  Register
                  </Button> */}
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default FrmStudio;
