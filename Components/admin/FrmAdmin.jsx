import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";

const FrmAdmin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    register: true,
    name: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [valuesPswR, setValuesPswR] = useState({
    passwordR: "",
    showPasswordR: false,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setValuesPswR({ ...valuesPswR, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordR = () => {
    setValuesPswR({
      ...valuesPswR,
      showPasswordR: !valuesPswR.showPasswordR,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (values.password === valuesPswR.passwordR) {
      clienteAxios
        .post("/admin", values)
        .then((response) => {
          const { status } = response.data;
          if (status) {
            router.push("/login"); //dirigir a la pagina de inicio
            //document.querySelector("#form").reset();
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setAlert({
              open: true,
              message: error.response.data.errors[0].msg,
              //message: "No se pueden generar citas en dias anteriores",
              backgroundColor: "#DD4A48",
              //#519259
            });
            console.log(error.response.data);
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
      setLoading(false);
    }
  };

  return (
    <Box>
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
        }}
      >
        <Typography component="h6" variant="h6">
          Crea Cuenta{" "}
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              size="small"
              required
              id="name"
              label="Nombre"
              name="name"
              inputProps={{ type: "text" }}
              onChange={handleChange("name")}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              size="small"
              required
              id="Apellido"
              label="Apellido"
              name="lastName"
              inputProps={{ type: "text" }}
              onChange={handleChange("lastName")}
            ></TextField>
          </div>
          <div>
            <TextField
              required
              sx={{ m: 1, width: "25ch" }}
              size="small"
              id="email"
              label="Email"
              name="email"
              inputProps={{ type: "email" }}
              onChange={handleChange("email")}
            ></TextField>
          </div>
          <div>
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
          </div>

          <div>
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
          </div>
          <div>
            <LoadingButton
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              type="submit"
            >
              Crear Cuenta
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default FrmAdmin;
