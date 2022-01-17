import React, { useState, useContext } from "react";
import { Typography, TextField, Box, IconButton, styled } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DaysSelect from "./DaysSelect";
import RemSelect from "./RemSelect";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";

const FrmConfig = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const Input = styled("input")({
    display: "none",
  });

  //console.log(auth);

  const [valuesConfig, setValuesConfig] = useState({
    id_tatoostudios: auth.infoStudio.id,
    logo: "",
    timeToOpen: "07:00",
    timeToClose: "19:00",
    dayNotAvailables: [],
    notifications: "",
  });

  //console.log(valuesConfig);

  const handleChange = (prop) => (event) => {
    setValuesConfig({ ...valuesConfig, [prop]: event.target.value });

    if (prop[0] === "dayNotAvailables") {
      const {
        target: { value },
      } = event;
      setValuesConfig({ ...valuesConfig, [prop]: event.target.value });
    }
  };

  //console.log(valuesConfig);
  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clienteAxios
      .post("/setting", valuesConfig, {
        headers: { apitoken: auth.token },
      })
      .then((response) => {
        console.log(response.data);
        const { status } = response.data;
        if (status) {
          router.push("/agenda"); //dirigir a la pagina de inicio
          //document.querySelector("#form").reset();
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
        <Typography component="h6" variant="h6">
          Configurar Estudio{" "}
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box sx={{ m: 2 }}>
            <TextField
              sx={{ m: 2, width: "30ch" }}
              id="time"
              label="Hora Apertura"
              type="time"
              defaultValue="08:00"
              onChange={handleChange("timeToOpen")}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField
              sx={{ m: 2, width: "30ch" }}
              id="time"
              label="Hora Cierre"
              type="time"
              defaultValue="19:00"
              onChange={handleChange("timeToClose")}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Box>
          <Box>
            <DaysSelect
              handleChange={handleChange}
              valuesConfig={valuesConfig}
            />
          </Box>
          <Box sx={{ p: 1, m: 2 }}>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleChange("logo")}
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
            <RemSelect handleChange={handleChange} />
          </Box>
          <Box>
            <LoadingButton
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              type="submit"
            >
              Enviar
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default FrmConfig;
