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
import { format, addHours, parseISO } from "date-fns";
import {
  InputLabel,
  Button,
  TextField,
  Box,
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
  evenByDay,
  cargaDates,
  setOpenViewModal,
  setinfoDate,
  timeToOpen,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [archivo, guardarArchivo] = useState("");
  const [adelanto, setAdelanto] = useState(0);
  const [sizeValue, setSizeTatuador] = useState([]);
  const { auth } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const llenarSize = () => {
    clienteAxios
      .get(`/sizes`)
      .then((response) => {
        setSizeTatuador(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    if (sizeValue.length === 0) {
      llenarSize();
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setAdelanto(0);
  };

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleChangeDate = (prop) => (event) => {
    setValuDate({
      ...valueDate,
      [prop]: event.target.value,
    });
    if (prop === "id_tatuador") {
      const tatoo = evenByDay.filter(
        (tatuador) => tatuador.id_tatuador._id === event.target.value
      );
      const finDate = tatoo.length > 0 ? tatoo.pop() : {};
      if (Object.keys(finDate).length !== 0) {
        console.log(finDate);
        const newDateEqualDay = addHours(parseISO(finDate.end), 1);
        const NewDareFinhish = addHours(parseISO(finDate.end), 2);
        console.log("_______________", newDateEqualDay);
        setValuDate({
          ...valueDate,
          id_tatuador: event.target.value,
          hourTatooStart: format(newDateEqualDay, "HH:mm"),
          hourTatooFinish: format(NewDareFinhish, "HH:mm"),
        });
      } else {
        setValuDate({
          ...valueDate,
          id_tatuador: event.target.value,
        });
      }
    }

    if (prop === "hourTatooStart") {
      setValuDate({
        ...valueDate,
        hourTatooStart: event.target.value,
        start: valueDate.addDate + "T" + event.target.value,
      });
    }
    if (prop === "hourTatooFinish") {
      setValuDate({
        ...valueDate,
        hourTatooFinish: event.target.value,
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
    formData.append("hourTatooStart", valueDate.hourTatooStart);
    formData.append("hourTatooFinish", valueDate.hourTatooFinish);
    formData.append("description", valueDate.description);
    formData.append("tipoTatoo", valueDate.tipoTatoo);
    formData.append("cost", valueDate.cost);
    formData.append("estimated", valueDate.estimated);
    formData.append("picture", archivo);
    clienteAxios
      .post("/dateTatoo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
          setAdelanto(0);
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
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={1000}
      />
      <Dialog open={open} fullScreen={fullScreen} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Agendar {fechaHoy.split("-").reverse().join("/")}
        </DialogTitle>
        <form id="form" onSubmit={handleGuardar}>
          <Box
            sx={{
              width: 360,
              height: 650,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogContent>
              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ width: "26ch" }}
                  id="title"
                  size="small"
                  required
                  label="Titulo"
                  type="text"
                  onChange={handleChangeDate("title")}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <SelectTatuador handleChangeDate={handleChangeDate} />
              </Box>
              <Box sx={{ m: 1 }}>
                <SelectClient handleChangeDate={handleChangeDate} />
              </Box>
              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ width: "26ch" }}
                  id="hourTatooStart"
                  size="small"
                  required
                  label="Hora Cita"
                  type="time"
                  value={valueDate.hourTatooStart}
                  onChange={handleChangeDate("hourTatooStart")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <FormControl component="fieldset">
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
              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ width: "26ch" }}
                  required
                  size="small"
                  id="description"
                  label="Descripcion Tatuaje"
                  type="text"
                  onChange={handleChangeDate("description")}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <SelectSize
                  sizeValue={sizeValue}
                  setSizeTatuador={setSizeTatuador}
                  handleChangeDate={handleChangeDate}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    sx={{ width: "26ch" }}
                    size="small"
                    id="desPhotoTatoo"
                    name="desPhotoTatoo"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>
                  <Box></Box>
                </Box>
              </Box>
              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ width: "26ch" }}
                  id="hourTatooFinish"
                  required
                  size="small"
                  label="Hora Fin"
                  type="time"
                  value={valueDate.hourTatooFinish}
                  onChange={handleChangeDate("hourTatooFinish")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <FormControl fullWidth sx={{ width: "26ch" }}>
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
              <Box sx={{ m: 1 }}>
                <FormControl sx={{ width: "26ch" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Adelanto*
                  </InputLabel>
                  <OutlinedInput
                    id="estimated"
                    size="small"
                    disabled
                    type="text"
                    value={adelanto}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  m: 1,
                }}
              >
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
              </Box>
            </DialogContent>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};
export default ModalDate;
