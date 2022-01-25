import React, { useState, useContext } from "react";
import {
  Typography,
  TextField,
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
import { AuthContext } from "../../Context/AuthContext";

const FrmLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { guardarAuth } = useContext(AuthContext);
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clienteAxios
      .post("/login", values)
      .then((response) => {
        const { token, infoUser, infoStudio, autenticado } = response.data;
        guardarAuth({
          token,
          infoUser,
          autenticado,
          infoStudio,
        });
        if (
          response.data.autenticado === true &&
          infoUser.rol === "Administrador"
        ) {
          if (!infoUser.registerStudio) {
            router.push("/studio");
          } else if (!infoUser.finishConfig) {
            router.push("/config");
          } else {
            router.push("/agenda");
          }
        }
        if (response.data.autenticado === true && infoUser.rol === "Tatuador") {
          router.push("/agenda");
        }
        if (response.data.autenticado === true && infoUser.rol === "Cliente") {
          router.push("/agenda");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          setAlert({
            open: true,
            message: error.response.data.error.toUpperCase(),
            //message: "No se pueden generar citas en dias anteriores",
            backgroundColor: "#DD4A48",
            //#519259
          });
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        // anchorOrigin={{ vertical: "center", horizontal: "center" }}
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
          Inicia Sesión{" "}
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box>
            <TextField
              required
              sx={{ m: 1, width: "25ch" }}
              size="small"
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={handleChange("email")}
            ></TextField>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="msg-password">Password</InputLabel>
              <OutlinedInput
                id="msg-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>
          </Box>
          <div>
            <LoadingButton
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
  );
};
export default FrmLogin;
