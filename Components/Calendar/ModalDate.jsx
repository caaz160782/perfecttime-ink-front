import React, { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SelectTatuador from "./SelectTatuador";
import SelectClient from "./SelectClient";
import SelectSize from "./SelectSize";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import {
  InputLabel,
  Button,
  TextField,
  Box,
  styled,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  Snackbar,
} from "@mui/material";

const ModalDate = ({
  open,
  setOpen,
  fechaHoy,
  valueDate,
  setValuDate,
  cargaDates,
  setOpenViewModal,
  setinfoDate,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Input = styled("input")({
    display: "none",
  });
  const [loading, setLoading] = useState(false);
  const [archivo, guardarArchivo] = useState("");
  const [adelanto, setAdelanto] = useState(0);
  const { auth } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleClose = () => {
    setOpen(false);
    setAdelanto(0);
  };

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChangeDate = (prop) => (event) => {
    setValuDate({ ...valueDate, [prop]: event.target.value });
    if (prop === "hourTatooStart") {
      setValuDate({
        ...valueDate,
        start: valueDate.addDate + "T" + event.target.value,
      });
    }
    if (prop === "hourTatooFinish") {
      setValuDate({
        ...valueDate,
        end: valueDate.addDate + "T" + event.target.value,
      });
    }
    if (prop === "cost") {
      let cost = event.target.value;
      let cal = parseInt(cost) * 0.2;
      setAdelanto(cal);
      setValuDate({ ...valueDate, cost: event.target.value, estimated: cal });
    }
  };

  //console.log(valueDate);
  const handleGuardar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_studio", auth.infoStudio.id);
    formData.append("title", valueDate.title);
    formData.append("id_tatuador", valueDate.id_tatuador);
    formData.append("id_cliente", valueDate.id_cliente);
    formData.append("id_size", valueDate.id_size);
    formData.append("start", valueDate.start);
    formData.append("end", valueDate.end);
    formData.append("description", valueDate.description);
    formData.append("tipoTatoo", valueDate.tipoTatoo);
    formData.append("cost", valueDate.cost);
    formData.append("estimated", valueDate.estimated);
    formData.append("picture", archivo);
    //console.log(archivo);
    //setLoading(archivo);
    clienteAxios
      .post("/dateTatoo", formData, {
        headers: {
          //"Content-Type": "multipart/form-data",
          apitoken: auth?.token,
        },
      })
      .then((response) => {
        const { code } = response.data;
        if (code === "Created") {
          cargaDates();
          setOpen(false);
          setinfoDate(response.data.payload);
          setLoading(false);
          setOpenViewModal(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          setAlert({
            open: true,
            message: error.response.data.message.toUpperCase(),
            backgroundColor: "#519259",
          });
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <Dialog open={open} fullScreen={fullScreen} onClose={handleClose}>
        <DialogTitle>
          Agendar {fechaHoy.split("-").reverse().join("/")}
        </DialogTitle>
        <form id="form" onSubmit={handleGuardar}>
          <DialogContent>
            <Box
              sx={{
                width: 260,
                height: 600,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <TextField
                  sx={{ m: 1 }}
                  id="title"
                  size="small"
                  required
                  label="Titulo"
                  type="text"
                  onChange={handleChangeDate("title")}
                />
              </Box>
              <Box>
                <SelectTatuador handleChangeDate={handleChangeDate} />
              </Box>
              <Box>
                <SelectClient handleChangeDate={handleChangeDate} />
              </Box>
              <Box>
                <TextField
                  sx={{ m: 1, width: "26ch" }}
                  id="hourTatooStart"
                  size="small"
                  //required
                  label="Hora Cita"
                  type="time"
                  defaultValue="09:00"
                  onChange={handleChangeDate("hourTatooStart")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
              <Box>
                <TextField
                  sx={{ m: 1 }}
                  required
                  size="small"
                  id="description"
                  label="Descripcion Tatuaje"
                  type="text"
                  onChange={handleChangeDate("description")}
                />
              </Box>
              <Box s>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    sx={{ m: 1, width: "175px" }}
                    size="small"
                    id="desPhotoTatoo"
                    name="desPhotoTatoo"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>

                  <Box></Box>
                </Box>
              </Box>
              <Box>
                <FormControl sx={{ m: 1 }} component="fieldset">
                  <FormLabel component="legend">Tipo Tatuaje</FormLabel>
                  <RadioGroup
                    row
                    size="small"
                    aria-label="tipeTattoo"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="color"
                      control={<Radio />}
                      label="Color"
                      onChange={handleChangeDate("tipoTatoo")}
                    />
                    <FormControlLabel
                      value="Blanco y Negro"
                      control={<Radio />}
                      label="Blanco y Negro"
                      onChange={handleChangeDate("tipoTatoo")}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box>
                <SelectSize handleChangeDate={handleChangeDate} />
              </Box>
              <Box>
                <TextField
                  sx={{ m: 1, width: "26ch" }}
                  id="hourTatooFinish"
                  required
                  size="small"
                  label="Hora Fin"
                  type="time"
                  defaultValue="09:00"
                  onChange={handleChangeDate("hourTatooFinish")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
              <Box>
                <FormControl fullWidth sx={{ m: 1, width: "26ch" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Costo Aprox*
                  </InputLabel>
                  <OutlinedInput
                    id="cost"
                    size="small"
                    type="text"
                    onChange={handleChangeDate("cost")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <FormControl fullWidth sx={{ m: 1, width: "26ch" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      A pagar*
                    </InputLabel>
                    <OutlinedInput
                      id="estimated"
                      size="small"
                      disabled
                      type="text"
                      value={adelanto}
                      //onChange={handleChangeDate("estimated")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cerrar
            </Button>
            <LoadingButton
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              type="submit"
            >
              Enviar
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default ModalDate;
