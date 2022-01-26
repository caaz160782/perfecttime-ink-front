import React, { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import clienteAxios from "../../utils/axios";
import { useRouter } from "next/router";
const FrmPassword = ({ hash }) => {
  const router = useRouter();

  const [valuesPsw, setValuesPsw] = useState({
    password: "",
    showPassword: false,
  });

  const [valuesPswR, setValuesPswR] = useState({
    passwordR: "",
    showPasswordR: false,
  });

  const [upDate, setUpDate] = useState({
    password: "",
    idHash: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleClickShowPassword = () => {
    setValuesPsw({
      ...valuesPsw,
      showPassword: !valuesPsw.showPassword,
    });
  };

  const handleClickShowPasswordR = () => {
    setValuesPswR({
      ...valuesPswR,
      showPasswordR: !valuesPswR.showPasswordR,
    });
  };

  const handleChange = (prop) => (event) => {
    setValuesPsw({ ...valuesPsw, [prop]: event.target.value });

    setValuesPswR({ ...valuesPswR, [prop]: event.target.value });

    if (prop === "password") {
      setUpDate({ ...upDate, password: event.target.value, idHash: hash._id });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (valuesPsw.password === valuesPswR.passwordR) {
      clienteAxios
        .patch(`/activa/${hash.id_user}`, upDate)
        .then((response) => {
          //        console.log(response);
          const { code } = response.data;
          if (code) {
            router.push("/login");
          }
        })
        .catch((error) => {
          if (error.response) {
            setAlert({
              open: true,
              message: error.response.data.message,
              backgroundColor: "#DD4A48",
              //#519259
            });
          } else {
            console.log(error);
          }
        });
    } else {
      setAlert({
        open: true,
        message: "Las contraseñas deben ser iguales",
        backgroundColor: "#DD4A48",
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          flexWrap: "wrap",
          p: 1,
          //m: 15,
        }}
      >
        <Typography component="h6" variant="h6">
          Ingresa Password{" "}
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="msg-password">Password</InputLabel>
              <OutlinedInput
                id="msg-password"
                type={valuesPsw.showPassword ? "text" : "password"}
                value={valuesPsw.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {valuesPsw.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="msg-passwordR">Re-Password</InputLabel>
              <OutlinedInput
                id="msg-passwordR"
                type={valuesPswR.showPasswordR ? "text" : "password"}
                value={valuesPswR.passwordR}
                onChange={handleChange("passwordR")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordR}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {valuesPswR.showPasswordR ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>
          </Box>
          <Box sx={{ m: 1 }}>
            <div>
              El password debe contener min 8 caracteres numeros mayusculas y
              minisculas un caracter especial
            </div>
          </Box>
          <div>
            <LoadingButton
              endIcon={<SendIcon />}
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
  );
};

export default FrmPassword;
