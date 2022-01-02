import Layout from "../Components/Layout";


import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { useForm } from "../hooks/useForm";
import clienteAxios from "../utils/axios";

const Admin = () => {

  const initialForm = {
    name: "",
    lastName: "",
    idRole: "",
    email: "",
    password: "",
  };

  const [user, actualizarState, reset] = useForm(initialForm);


  const handlerSubmit = (e) => {
    e.preventDefault();
      clienteAxios
          .post("/admin", user)
          .then((respuesta) => {
            console.log(respuesta);
           // router.push("/"); //dirigir a la pagina de inicio
            //  document.querySelector("#form").reset();
          })
          .catch((err) => {
            console.log(err.response.data);
          });
  };
  return (
    <Layout title={'admin'}>
      <form id="form" onSubmit={handlerSubmit}>
        <Typography component="h1" variant="h1">
          ingresar administrador
        </Typography>
        <List>
          <ListItem>
            <TextField
              //  variant="outlined"
              fullWidth
              required
              id="name"
              label="name"
              name="name"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              //  variant="outlined"
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
              id="email"
              label="Email"
              name="email"
              inputProps={{ type: "email" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              id="password"
              fullWidth
              label="Password"
              name="password"
              inputProps={{ type: "password" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>

        </List>
      </form>
    </Layout>
  );
};

export default Admin;
