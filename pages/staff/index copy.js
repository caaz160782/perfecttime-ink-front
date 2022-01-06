import Layout from "../../Components/Layout";
import Image from "next/image";

import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Grid,
  Snackbar,
} from "@material-ui/core";

import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../utils/axios";
import useStyles from "./style";
import { useState } from "react";

const Staff = () => {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const initialForm = {
    name: "",
    lastName: "",
    idRole: "",
    email: "",
    password: "",
    phoneNumber: "",
    curp: "",
    rfc: " ",
    phonePersonal: "",
  };

  const [user, actualizarState, reset] = useForm(initialForm);

  const handlerSubmit = (e) => {
    e.preventDefault();
    clienteAxios
      .post("/staff", user)
      .then((respuesta) => {
        console.log(respuesta);
        setAlert({
          open: true,
          message: respuesta.data.message,
          backgroundColor: "#4BB543",
        });

        // router.push("/"); //dirigir a la pagina de inicio
        //  document.querySelector("#form").reset();
      })
      .catch((err) => {
        console.log(err.response.data);
        setAlert({
          open: true,
          message: err.response.data.error,
          backgroundColor: "#FF3232",
        });
      });
  };

  return (
    <Layout title={"admin"}>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Grid container direction="row">
        <Grid
          item
          container
          direction="column"
          justify="center"
          sm={12}
          md={7}
          lg={6}
        >
          <Grid item>
            <form id="form" onSubmit={handlerSubmit}>
              <Typography
                variant="h5"
                align="center"
                className={classes.ingresar}
              >
                Ingresar miembro Staff
              </Typography>
              <List>
                <ListItem>
                  <TextField
                    //  variant="outlined"
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
                    required
                    id="lastName"
                    label="last name"
                    name="lastName"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                  ></TextField>
                </ListItem>
                <ListItem>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    id="idRol"
                    label="idRol"
                    name="idRole"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                  ></TextField>
                </ListItem>
                <ListItem>
                  <TextField
                    required
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
                    id="PhoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
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
                    required
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
                    required
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
                    color="primary"
                    className={classes.btnLogin}
                  >
                    Register
                  </Button>
                </ListItem>
              </List>
            </form>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          sm={12}
          md={5}
          lg={6}
          //  style={{ width: "500px", height: "auto", position: "relative" }}
        >
          <Grid item className={classes.imgBack}>
            <Image
              //  className={classes.img}
              src="/images/tatoo.jpg"
              alt="imagen"
              layout="responsive"
              width={400}
              height={400}
            ></Image>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Staff;
