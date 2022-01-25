import React, { useState } from "react";
import FrmLogin from "../../Components/Login/FrmLogin";
import NextLink from "next/link";
import { Box, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import clienteAxios from "../../utils/axios";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [valueEmail, setValueEmail] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setValueEmail({ ...valueEmail, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnviaEmail = (e) => {
    e.preventDefault();
    clienteAxios
      .post(`/findByEmail/`, valueEmail)
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
          //console.log(error.response);
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
    <div>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <FrmLogin />

      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <div>
          <NextLink href="/admin">
            <Button>
              {" "}
              <a>Registrarse</a>
            </Button>
          </NextLink>
        </div>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Recuperar Password
          </Button>
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
                onChange={handleChange("emailFind")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEnviaEmail}>Enviar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </div>
  );
};
export default Login;
