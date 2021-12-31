import Layout from "../Components/Layout";

import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
} from "@mui/material";

import { useForm } from "../hooks/useForm";
import clienteAxios from "../utils/axios";

const Studio = () => {

    const initialForm = {
        name: "",
        description: "",
        licenseImage: "",
        postalCode: "",
        municipality: "",
        state: "",
        city: "",
        address: "",
        phoneWhatsApp: "",
        phoneStudio: "",
        rfc: "",
        social: "",
    };

    const [tatstudio,actualizarState,reset] =useForm(initialForm)
    
    const handlerSubmit = (e) => {
        e.preventDefault();
          clienteAxios
              .post("/studio", tatstudio)
              .then((respuesta) => {
                console.log(respuesta);
              })
              .catch((err) => {
                console.log(respuesta);
              });
    };
    
    return (
        <Layout>
            <form id="form" onSubmit={handlerSubmit}>
                <Typography component="h1" variant="h1">
                    Ingrese Datos del Estudio
                </Typography>
                <List>
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="name"
                    label="Nombre del estudio"
                    name="name"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="description"
                    label="Description"
                    name="description"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="licenseImage"
                    label="Imagen del estudio"
                    name="licenseImage"
                    inputProps={{ type: "file" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="rfc"
                    label="RFC"
                    name="rfc"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="postalCode"
                    label="Codigo Postal"
                    name="postalCode"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>  
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="municipality"
                    label="Municipio"
                    name="municipality"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="state"
                    label="Estado"
                    name="state"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>  
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="city"
                    label="Ciudad"
                    name="city"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="address"
                    label="Domicilio"
                    name="address"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="phoneStudio"
                    label="Telefono"
                    name="phoneStudio"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="phoneWhatsApp"
                    label="Whatsapp"
                    name="phoneWhatsApp"
                    inputProps={{ type: "text" }}
                    onChange={actualizarState}
                    ></TextField>
                </ListItem>   
                <ListItem>
                    <TextField
                    fullWidth
                    required
                    id="social"
                    label="Redes sociales"
                    name="social"
                    inputProps={{ type: "email" }}
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

export default Studio;
