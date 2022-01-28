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
  Typography,
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
  const [tatuadorValue, setValueTatuador] = useState([]);
  const [clientValue, setclientValue] = useState([]);
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
    setAdelanto(0);
    guardarArchivo("");
    setValueTatuador([]);
    setclientValue([]);
    setValuDate({
      picture: "",
      hourTatooStart: "00:00",
      hourTatooFinish: "00:00",
      cost: 0,
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setAdelanto(0);
    guardarArchivo("");
    setValueTatuador([]);
    setValuDate({ ...valueDate, id_cliente: "" });
    guardarArchivo("");
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
        //   console.log(finDate);
        const newDateEqualDay = addHours(parseISO(finDate.end), 1);
        const NewDareFinhish = addHours(parseISO(finDate.end), 2);
        // console.log("_______________", newDateEqualDay);
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

    if (valueDate.id_tatuador === "") {
      setAlert({
        open: true,
        message: "seleccione a un tatuador",
        backgroundColor: "#DD4A48",
      });
    } else if (valueDate.id_cliente === "") {
      setAlert({
        open: true,
        message: "seleccione a un cliente",
        backgroundColor: "#DD4A48",
      });
    } else if (valueDate.id_size === -1) {
      setAlert({
        open: true,
        message: "seleccione el Tamaño",
        backgroundColor: "#DD4A48",
      });
    } else if (archivo === "") {
      setAlert({
        open: true,
        message: "seleccione una imagen",
        backgroundColor: "#DD4A48",
      });
    } else if (valueDate.cost === "") {
      setAlert({
        open: true,
        message: "Ingrese el costo",
        backgroundColor: "#DD4A48",
      });
    } else if (valueDate.hourTatooStart === valueDate.hourTatooFinish) {
      setAlert({
        open: true,
        message: "La hora fin debe ser diferente a la de inicio",
        backgroundColor: "#DD4A48",
      });
    } else {
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
            llenarSize();
            setAdelanto(0);
            guardarArchivo("");
            setValueTatuador([]);
            setValuDate({ ...valueDate, cost: "" });
            setValuDate({ ...valueDate, id_cliente: "" });
            setOpenViewModal(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
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
    }
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={1000}
      />
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "flex-start", md: "center" },
            alignItems: { sm: "flex-start", md: "center" },
            flexDirection: "column",
            flexWrap: "wrap",
            p: 1,
          }}
        >
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: "secondary.main",
              boxShadow: 1,
              width: 350,
              height: 750,
              minWidth: 200,
            }}
          >
            <Box
              sx={{
                backgroundColor: "secondary.main",
                borderRadiusTop: 2,
                height: 50,
                textAlign: "center",
              }}
            >
              {" "}
              <DialogTitle sx={{ textAlign: "center", color: "#FFF" }}>
                Agendar {fechaHoy.split("-").reverse().join("/")}
              </DialogTitle>
            </Box>
            <Box>
              <form id="form" onSubmit={handleGuardar}>
                <Box sx={{}}>
                  {" "}
                  <DialogContent>
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        sx={{ width: "300px" }}
                        id="title"
                        size="small"
                        required
                        label="Titulo"
                        type="text"
                        onChange={handleChangeDate("title")}
                      />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <SelectTatuador
                        tatuadorValue={tatuadorValue}
                        setValueTatuador={setValueTatuador}
                        handleChangeDate={handleChangeDate}
                      />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <SelectClient
                        clientValue={clientValue}
                        setclientValue={setclientValue}
                        handleChangeDate={handleChangeDate}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        sx={{ width: "300px" }}
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
                    <Box sx={{ mt: 1 }}>
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
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        sx={{ width: "300px" }}
                        required
                        size="small"
                        id="description"
                        label="Descripcion Tatuaje"
                        type="text"
                        onChange={handleChangeDate("description")}
                      />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <SelectSize
                        sizeValue={sizeValue}
                        setSizeTatuador={setSizeTatuador}
                        handleChangeDate={handleChangeDate}
                      />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Seleccione una imagen de Muestra (jpg,png)
                      </Typography>
                      <TextField
                        sx={{ width: "300px" }}
                        size="small"
                        id="desPhotoTatoo"
                        name="desPhotoTatoo"
                        inputProps={{ type: "file" }}
                        onChange={leerArchivo}
                      ></TextField>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        sx={{ width: "300px" }}
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
                    <Box sx={{ mt: 1 }}>
                      <FormControl fullWidth sx={{ width: "300px" }}>
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
                    <Box sx={{ mt: 1 }}>
                      <FormControl sx={{ width: "300px" }}>
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
                        mt: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
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
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};
export default ModalDate;
