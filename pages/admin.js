import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Typography, TextField, Button, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { useForm } from "../hooks/useForm";
import clienteAxios from "../utils/axios";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const initialForm = {
    register: true,
    name: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, actualizarState, reset] = useForm(initialForm);

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
      .post("/admin", user)
      .then((response) => {
        //console.log(response.data);
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
    <Layout>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            flexWrap: 'wrap',
            p: 1,
            m: 1,
          }}
        >
          <Typography component="h6" variant="h6">
            Crea Cuenta{" "}
          </Typography>
          <form id="form" onSubmit={handlerSubmit}>
            <div >
              <TextField
                 sx={{ m: 1, width: '25ch' }}
                //  variant="outlined"
                // fullWidth
                size="small"
                required
                id="name"
                label="Name"
                name="name"
                inputProps={{ type: "text" }}
                onChange={actualizarState}
              ></TextField>
            </div>
            <div > 
              <TextField
                sx={{ m: 1, width: '25ch' }}
                //  variant="outlined"
                //fullWidth
                size="small"
                required
                id="lastName"
                label="last name"
                name="lastName"
                inputProps={{ type: "text" }}
                onChange={actualizarState}
              ></TextField>
            </div>
            <div>
              <TextField
                required
                sx={{ m: 1, width: '25ch' }}
                //fullWidth
                size="small"
                id="email"
                label="Email"
                name="email"
                inputProps={{ type: "email" }}
                onChange={actualizarState}
              ></TextField>
            </div>
            <div>
              <TextField
                required
                sx={{ m: 1, width: '25ch' }}
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
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
               sx={{ m: 1, width: '25ch' }}
               size="small"
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
               onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
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
                Crear Cuenta
              </LoadingButton>
            </div>
          </form>
        </Box>
      </div>
    </Layout>
  );
};

export default Admin;
