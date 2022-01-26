import Layout from "../../Components/Layout";
import { List, ListItem, Typography, TextField, Button } from "@mui/material";
//import SendIcon from "@mui/icons-material/Send";
import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../utils/axios";

const Client = () => {
  const initialForm = {
    name: "",
    lastName: "",
    age: "",
    email: "",
    phonePersonal: "",
    socialNetwork: "",
    password: "",
    idRole: "",
    picture: "",
  };

  const [client, actualizarState, reset] = useForm(initialForm);

  const handlerSubmit = (e) => {
    e.preventDefault();
    clienteAxios
      .post("/clientAdmin", client) //llamada a backend
      .then((response) => {
        console.log(response);
        //router.push("/"); *redireccion a pagina inicio
        //docuemnt.querySelector("#form").reset();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <Layout>
      <form id="form" onSubmit={handlerSubmit}>
        <Typography component="h1" variant="h1">
          Alta de Clientes
        </Typography>
        <List>
          <ListItem>
            <TextField
              //variant="outlined"
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
              //variant="outlined"
              fullWidth
              required
              id="lastName"
              label="lastName"
              name="lastName"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              //variant="outlined"
              fullWidth
              //required
              id="age"
              label="age"
              name="age"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
              helperText="alguien@example.com"
              inputProps={{ type: "email" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              fullWidth
              id="phonePersonal"
              label="phonePersonal"
              name="phonePersonal"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              fullWidth
              id="socialNetwork"
              label="Red Social"
              name="socialNetwork"
              inputProps={{ type: "text" }}
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
              helperText="Min 8 caracteres; 1 numero, mayuscula, minuscula y caracteres especiales"
              inputProps={{ type: "password" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              id="idRole"
              fullWidth
              label="idRole"
              name="idRole"
              inputProps={{ type: "text" }}
              onChange={actualizarState}
            ></TextField>
          </ListItem>
          {/* <ListItem>
                    <TextField
                    required
                    id="picture"
                    fullWidth
                    label="picture"
                    name="picture"
                    inputProps={{ type: "image" }}
                    onChange={actualizarState}
                    ></TextField> 
                </ListItem>*/}
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

export default Client;
