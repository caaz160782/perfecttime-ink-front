import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  styled
} from "@mui/material";
import clienteAxios from "../../utils/axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const FrmStudio = () => {
  const router = useRouter();  
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const Input = styled("input")({
    display: "none",
  });

  const initialForm = {
    id_user:"61c33fe34185f825dc8734f9",
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
  console.log(initialForm)
  const [tatstudio,actualizarState,reset] =useForm(initialForm)
    
  const handlerSubmit = (e) => {
            e.preventDefault();
              clienteAxios
                  .post("/studio", tatstudio)
                  .then((respuesta) => {
                    console.log(respuesta);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
        };

  // const handlerSubmit = (e) => {
  //   e.preventDefault();
  //     clienteAxios
  //     .post("/studio", tatstudio)
  //     .then((respuesta) => {
  //       console.log(respuesta.data);
  //     })
  //     .catch((error) => {
  //       if (error.respuesta) {
  //         console.log(error.respuesta.data);
  //       } else {
  //         console.log(error);
  //       }
  //     });
  // };
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
        <Typography component="h1" variant="h1">
          Ingrese Datos del Estudio
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="name"
                  label="Nombre del estudio"
                  name="name"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
          </Box>
          <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="description"
                  label="Description"
                  name="description"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
            </Box>
            <Box sx={{ p: 1, m: 2 }}>
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
            <Box sx={{ m: 2 }}> 
                  <TextField
                  fullWidth
                  required
                  id="rfc"
                  label="RFC"
                  name="rfc"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
            </Box>   
            <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="postalCode"
                  label="Codigo Postal"
                  name="postalCode"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box> 
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="municipality"
                  label="Municipio"
                  name="municipality"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="state"
                  label="Estado"
                  name="state"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>  
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="city"
                  label="Ciudad"
                  name="city"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="address"
                  label="Domicilio"
                  name="address"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="phoneStudio"
                  label="Telefono"
                  name="phoneStudio"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="phoneWhatsApp"
                  label="Whatsapp"
                  name="phoneWhatsApp"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
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
                  fullWidth
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

export default FrmStudio
