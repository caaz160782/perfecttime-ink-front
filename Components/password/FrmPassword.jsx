import React, { useState } from "react";
import {
  Container,
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
        message: "El password debe ser el mismo",
        backgroundColor: "#DD4A48",
      });
    }
  };

  return (
    <Container fixed>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={2000}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          flexWrap: "wrap",
          p: 1,
        }}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "secondary.main",
            boxShadow: 1,
            width: 350,
            minWidth: 200,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              borderRadiusTop: 2,
              height: 50,
              textAlign: "center",
            }}
          >
            {" "}
            <Typography sx={{ m: 1 }} component="h6" variant="h6">
              Ingresa Password{" "}
            </Typography>
          </Box>
          <Box>
            <form id="form" onSubmit={handlerSubmit}>
              <Box sx={{ m: 4 }}>
                <Box sx={{ mt: 3 }}>
                  <FormControl sx={{ width: "30ch" }} variant="outlined">
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
                <Box sx={{ mt: 3 }}>
                  <FormControl sx={{ width: "30ch" }} variant="outlined">
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
                <Box sx={{ mt: 3 }}>
                  <LoadingButton
                    sx={{ width: "34ch" }}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </LoadingButton>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    El password debe contener 8 caracteres mínimo (números,
                    mayúsculas, minúsculas y un carácter especial.)
                  </Typography>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FrmPassword;
