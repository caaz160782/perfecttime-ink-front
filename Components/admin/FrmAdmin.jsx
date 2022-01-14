import React, { useState } from "react";
import { Typography, TextField, Button, Box, FormControl } from "@mui/material";
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
    console.log("values", values);
    setLoading(true);
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
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          flexWrap: "wrap",
          p: 1,
          m: 20,
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
    </div>
  );
};

export default FrmAdmin;
