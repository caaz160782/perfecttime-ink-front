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
import {List, ListItem, TextField,Snackbar} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../utils/axios";
import {useState, useEffect} from "react"
import theme from "../../utils/temaConfig"
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useLocalStorage } from "../../hooks/useLocalStorage";

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

export default function EditCustomizedDialogs({classes, studioName, typeRol}) {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  console.log(studioData);

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
            id_user:"61c33fe34185f825dc8734f9",
            name: studioData.name,
            description: studioData.description,
            licenseImage: studioData.licenseImage,
            postalCode: studioData.postalCode,
            municipality: studioData.municipality,
            state: studioData.state,
            city: studioData.city,
            address: studioData.address,
            phoneWhatsApp: studioData.phoneWhatsApp,
            phoneStudio: studioData.phoneStudio,
            rfc: studioData.rfc,
            social: studioData.social,
        };
  console.log(initialForm)
  const [tatstudio,actualizarState,reset] =useForm(initialForm)
    
  const handlerSubmit = (e) => {
            e.preventDefault();
              clienteAxios
                  .patch("/studio", tatstudio)
                  .then((respuesta) => {
                    console.log(respuesta);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
    };

  
  const [loading, setLoading] = useState(false);
  
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
        <Typography component="h1" variant="h1">
          Ingrese Datos del Estudio
        </Typography>
        <form id="form" onSubmit={handlerSubmit}>
          <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="name"
                  label="Nombre del estudio"
                  name="name"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
          </Box>
          <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="description"
                  label="Description"
                  name="description"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
            </Box>
            <Box sx={{ p: 1, m: 2 }}>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={actualizarState}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Box sx={{ m: 2 }}> 
                  <TextField
                  fullWidth
                  required
                  id="rfc"
                  label="RFC"
                  name="rfc"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
            </Box>   
            <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="postalCode"
                  label="Codigo Postal"
                  name="postalCode"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box> 
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="municipality"
                  label="Municipio"
                  name="municipality"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="state"
                  label="Estado"
                  name="state"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>  
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="city"
                  label="Ciudad"
                  name="city"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="address"
                  label="Domicilio"
                  name="address"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="phoneStudio"
                  label="Telefono"
                  name="phoneStudio"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="phoneWhatsApp"
                  label="Whatsapp"
                  name="phoneWhatsApp"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                  <TextField
                  fullWidth
                  required
                  id="social"
                  label="Redes sociales"
                  name="social"
                  inputProps={{ type: "text" }}
                  onChange={actualizarState}
                  ></TextField>
              </Box>   
              <Box sx={{ m: 2 }}>
                <LoadingButton
                  fullWidth
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                >
                  Guardar Cambios
                </LoadingButton>
                  {/* <Button variant="contained" type="submit" fullWidth color="primary">
                  Register
                  </Button> */}
              </Box>
        </form>  
      </Box>  
    </div>  
  ); 
};

export default StudioMod
