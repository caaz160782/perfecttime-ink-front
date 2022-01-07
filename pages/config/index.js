import React, { useState, useeffect } from "react";
import LayoutApp from "../../Components/LayoutApp";
import { Typography, TextField, Box } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import { useForm } from "../../hooks/useForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Config = () => {
  const [valToken] = useLocalStorage("userVal");
  const [valueOpen, setValueOpen] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [valueClose, setValueClose] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangeOpen = (newValue) => {
    setValueOpen(newValue);
  };

  const handleChangeClose = (newValue) => {
    setValueClose(newValue);
  };

  const initialForm = {
    id_tatoostudios: "",
    logo: "",
    timeToOpen: "",
    timeToClose: "",
    dayAvailables: "",
    notifications: "",
  };

  console.log(initialForm);

  const [login, actualizarState, reset] = useForm(initialForm);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    return (
      <LayoutApp>
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
              <Box sx={{ p: 1, m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Hora de apertura"
                    value={valueOpen}
                    onChange={(handleChangeOpen)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ p: 1, m: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Hora de cierre"
                    value={valueClose}
                    onChange={handleChangeClose}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
              <TextField
        id="time"
        label="Alarm clock"
        type="time"
        name="timeToOpen"
        defaultValue="07:30"
        onChange={actualizarState}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />

              </Box>
              
              
              
              <div>


                <TextField
                  required
                  sx={{ m: 1, width: "25ch" }}
                  //fullWidth
                  size="small"
                  id="password"
                  label="Password"
                  name="password"
                  inputProps={{ type: "password" }}
                  //type={values.showPassword ? "text" : "password"}
                  onChange={actualizarState}
                ></TextField>
              </div>

              <div>
                <LoadingButton
                  //  onClick={handleClick}
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                >
                  Enviar
                </LoadingButton>
              </div>
            </form>
          </Box>
        </div>
      </LayoutApp>
    );
  } else {
    return (
      <LayoutApp>
        <h1>No autorizado</h1>
      </LayoutApp>
    );

    //router.push("/agenda")
  }
};
export default Config;
