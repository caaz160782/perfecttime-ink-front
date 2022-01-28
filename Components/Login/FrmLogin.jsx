import React, { useState, useContext } from "react";
import {
  Typography,
  TextField,
  Box,
  Container,
  FormControl,
  InputLabel,
  Snackbar,
  Button,
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
import NextLink from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FrmLogin = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueEmail, setValueEmail] = useState("");
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
        //console.log("-------", response.data);
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
        if (response.data.autenticado === true && infoUser.rol === "tatuador") {
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
            backgroundColor: "#DD4A48",
          });
        } else {
          console.log(error);
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeEmail = (prop) => (event) => {
    setValueEmail({ ...valueEmail, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnviaEmail = (e) => {
    e.preventDefault();
    clienteAxios
      .post(`findByEmail/`, valueEmail)
      .then((response) => {
        //  console.log(response.data);
        const { code } = response.data;
        if (code) {
          //router.push("/login");
          setAlert({
            open: true,
            message: "Se ha enviado un correo para recuperar su contraseña",
            backgroundColor: "#519259",
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
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
  };

  return (
    <Container fixed>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
            <Typography
              sx={{ m: 1, color: "#FFF" }}
              component="h6"
              variant="h6"
            >
              Inicia Sesión{" "}
            </Typography>
          </Box>
          <Box>
            <form id="form" onSubmit={handlerSubmit}>
              <Box sx={{ m: 4 }}>
                <Box sx={{ m: 1 }}>
                  <TextField
                    required
                    sx={{ width: "100%" }}
                    id="email"
                    label="Email"
                    inputProps={{ type: "email" }}
                    onChange={handleChange("email")}
                  ></TextField>
                </Box>
                <Box sx={{ mt: 3 }}>
                  {" "}
                  <FormControl sx={{ width: "95%" }} variant="outlined">
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
                            {values.showPassword ? (
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
                    sx={{ width: "95%" }}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </LoadingButton>
                </Box>
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography
                    variant="caption"
                    display="block"
                    onClick={handleClickOpen}
                    gutterBottom
                  >
                    ¿Olvidaste tu Password ?
                  </Typography>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                      <DialogContentText></DialogContentText>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChangeEmail("emailFind")}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleEnviaEmail}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="overline" display="block" gutterBottom>
                    {" "}
                    ¿No tienes Cuenta?
                  </Typography>
                  <Typography variant="button" display="block" gutterBottom>
                    <NextLink href="/admin"> Regístrate </NextLink>
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
export default FrmLogin;
