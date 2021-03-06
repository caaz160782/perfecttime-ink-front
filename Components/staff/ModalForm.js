import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { List, ListItem, TextField, Snackbar } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../utils/axios";
import { useState, useContext } from "react";
import theme from "../../utils/temaConfig";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../Context/AuthContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ classes, reload }) {
  //const [valToken, setToken] = useLocalStorage("userVal", "");
  // const [valStudio] = useLocalStorage("studioVal", "");
  const { auth, guardarAuth, logOut } = useContext(AuthContext);

  const [archivo, guardarArchivo] = useState("");

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const initialForm = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    phoneHome: "",
    curp: "",
    rfc: " ",
    phonePersonal: "",
  };
  const [user, actualizarState, reset] = useForm(initialForm);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const idStudio = auth.infoStudio.id;
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("lastName", user.lastName);
    // formData.append("idRole", user.idRole);
    formData.append("Role", "staffTatuador");
    formData.append("curp", user.curp);
    formData.append("rfc", user.rfc);
    formData.append("phoneHome", user.phoneHome);
    formData.append("phonePersonal", user.phonePersonal);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("picture", archivo);
    formData.append("idStudio", idStudio);
    // formData.append("Role", "Tatoo");
    console.log("auth", auth.token);
    clienteAxios
      .post("/staff", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          //  apitoken: valToken.token,
          apitoken: auth.token,
        },
      })
      .then((respuesta) => {
        console.log(respuesta);
        setAlert({
          open: true,
          message: respuesta.data.message.toUpperCase(),
          backgroundColor: "#4BB543",
        });

        setTimeout(() => {
          console.log("peticion ok");
          reload();
        }, 3000);

        // router.push("/"); //dirigir a la pagina de inicio
        //  document.querySelector("#form").reset();
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          open: true,
          message: err.response.data.error.toUpperCase(),
          backgroundColor: "#FF3232",
        });
      });
  };

  return (
    <div>
      <Button color="success" variant="contained" onClick={handleClickOpen}>
        <AddCircleIcon></AddCircleIcon> crear
      </Button>
      <Snackbar
        open={alert.open}
        message={alert.message}
        //style={{ height: "100%" }}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Ingresar Staff
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form id="form" onSubmit={handlerSubmit}>
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  id="name"
                  label="name"
                  name="name"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  //  helperText={error ? "Name needs to be 'a'" : "Perfect!"}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  //  variant="outlined"
                  size="small"
                  fullWidth
                  // required
                  id="lastName"
                  label="last name"
                  name="lastName"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  //  variant="outlined"
                  size="small"
                  fullWidth
                  id="picture"
                  label="picture"
                  name="picture"
                  inputProps={{ type: "file" }}
                  onChange={leerArchivo}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  //required
                  fullWidth
                  size="small"
                  id="phonePersonal"
                  label="personal phone"
                  name="phonePersonal"
                  inputProps={{ type: "phone" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="phoneHome"
                  label="phone home"
                  name="phoneHome"
                  inputProps={{ type: "phone" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  inputProps={{ type: "email" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth
                  // required
                  size="small"
                  id="curp"
                  label="curp"
                  name="curp"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  //  required
                  fullWidth
                  size="small"
                  id="rfc"
                  label="rfc"
                  name="rfc"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  required
                  size="small"
                  id="password"
                  fullWidth
                  label="Password"
                  name="password"
                  inputProps={{ type: "password" }}
                  helperText={
                    "Must be a minimum of 8 characters including a number, Upper, Lower And one special character"
                  }
                  onChange={actualizarState}
                ></TextField>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="secondary"
                  className={classes.btnRegister}
                >
                  <SendIcon></SendIcon> CREAR
                </Button>
              </ListItem>
            </List>
            <DialogActions>
              <Button color="primary" autoFocus onClick={handleClose}>
                <CloseIcon></CloseIcon> Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
