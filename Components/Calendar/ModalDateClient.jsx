import React, { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SelectTatuador from "./SelectTatuador";
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
const ModalDateClient = ({
  open,
  setOpen,
  fechaHoy,
  valueDate,
  setValuDate,
  evenByDay,
  cargaDatesClient,
  setOpenViewModal,
  setinfoDate,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [archivo, guardarArchivo] = useState("");
  const [adelanto, setAdelanto] = useState(0);
  const [costo, setCosto] = useState(0);
  const { auth } = useContext(AuthContext);
  const [sizeValue, setSizeTatuador] = useState([]);
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
        const newDateEqualDay = addHours(parseISO(finDate.end), 1);
        const NewDareFinhish = addHours(parseISO(finDate.end), 2);
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
    //console.log(prop);
    if (prop === "tipoTatoo") {
      setAdelanto(0);
      setCosto(0);
      setValuDate({
        ...valueDate,
        tipoTatoo: event.target.value,
        id_size: -1,
      });
    }
    //console.log(prop);
    if (prop === "id_size") {
      //console.log(event.target.value);
      switch (event.target.value) {
        case "61de763ac5ac1b41c7bea24a":
          if (valueDate.tipoTatoo === "color") {
            const NewDareFinhish = addHours(parseISO(valueDate.start), 2);
            let cost = 1200;
            let cal = parseInt(cost) * 0.2;
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          if (valueDate.tipoTatoo === "Blanco&Negro") {
            const NewDareFinhish = addHours(parseISO(valueDate.start), 1);
            let cost = 950;
            let cal = parseInt(cost) * 0.2;
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          break;
        case "61de76fbc5ac1b41c7bea24b":
          // console.log("< 15 cm");
          if (valueDate.tipoTatoo === "color") {
            let cost = 1800;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 2);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          if (valueDate.tipoTatoo === "Blanco&Negro") {
            const NewDareFinhish = addHours(parseISO(valueDate.start), 1);
            let cost = 1200;
            let cal = parseInt(cost) * 0.2;
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          break;
        case "61de775ec5ac1b41c7bea24c":
          //console.log("< 40 cm");
          if (valueDate.tipoTatoo === "color") {
            let cost = 2500;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 2);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          if (valueDate.tipoTatoo === "Blanco&Negro") {
            let cost = 1800;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 1);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          break;
        case "61de77b9c5ac1b41c7bea24d":
          //console.log("< 60 cm");
          if (valueDate.tipoTatoo === "color") {
            let cost = 4000;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 3);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          if (valueDate.tipoTatoo === "Blanco&Negro") {
            let cost = 2000;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 2);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          break;
        case "61de77f6c5ac1b41c7bea24e":
          //console.log("> 60 cm");
          if (valueDate.tipoTatoo === "color") {
            let cost = 6000;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 4);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          if (valueDate.tipoTatoo === "Blanco&Negro") {
            let cost = 3000;
            let cal = parseInt(cost) * 0.2;
            const NewDareFinhish = addHours(parseISO(valueDate.start), 3);
            setAdelanto(cal);
            setCosto(cost);
            setValuDate({
              ...valueDate,
              id_size: event.target.value,
              cost: cost,
              estimated: cal,
              hourTatooFinish: format(NewDareFinhish, "HH:mm"),
              end: valueDate.addDate + "T" + format(NewDareFinhish, "HH:mm"),
            });
          }
          break;
      }
    }
  };

  //console.log(valueDate);

  const handleGuardar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_studio", auth.infoStudio.id);
    formData.append("title", valueDate.title);
    formData.append("id_tatuador", valueDate.id_tatuador);
    formData.append("id_cliente", auth?.infoUser._id);
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
          //cargaDates();
          cargaDatesClient();
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
              {/* <Box sx={{ m: 1 }}>
                <SelectClient handleChangeDate={handleChangeDate} />
              </Box> */}
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
                      value="Blanco&Negro"
                      control={<Radio />}
                      label="Blanco y Negro"
                      onChange={handleChangeDate("tipoTatoo")}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ m: 1 }}>
                <SelectSize
                  sizeValue={sizeValue}
                  setSizeTatuador={setSizeTatuador}
                  valueDate={valueDate}
                  handleChangeDate={handleChangeDate}
                />
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
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    sx={{ width: "26ch" }}
                    size="small"
                    id="desPhotoTatoo"
                    name="desPhotoTatoo"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>
                </Box>
              </Box>

              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ width: "26ch" }}
                  id="hourTatooFinish"
                  required
                  size="small"
                  disabled
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
                    disabled
                    size="small"
                    type="text"
                    value={costo}
                    //onChange={handleChangeDate("cost")}
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
export default ModalDateClient;
