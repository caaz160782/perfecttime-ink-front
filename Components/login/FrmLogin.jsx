import React, { useState,useContext } from "react";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Alert,
  Stack,
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
import {AuthContext } from "../../Context/AuthContext";
import {useLocalStorage} from "../../hooks/useLocalStorage"

const FrmLogin = () => {
  const [values, setValues] = useState({
    password: "",
    email:"",
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

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [auth,guardarAuth] = useContext(AuthContext);
  const [valToken,setToken] = useLocalStorage('userVal',"");

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clienteAxios
      .post("/login",values)
      .then((response) => {
        //console.log(response.data);
        const { auth,token,infoUser } = response.data;
        if (auth) {
          guardarAuth({token,auth,infoUser});
          setToken({token,auth,infoUser});
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
          Inicia Sesion{" "}
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
              onChange={handleChange('email')}
            ></TextField>
          </Box>
          <Box>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="msg-password">Password</InputLabel>
          <OutlinedInput
            id="msg-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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