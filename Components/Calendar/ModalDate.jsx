import React, { useState, useContext } from "react";
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
  IconButton,
  styled,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
const ModalDate = ({
  open,
  setOpen,
  fechaHoy,
  valueDate,
  setValuDate,
  cargaDates,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Input = styled("input")({
    display: "none",
  });
  const [loading, setLoading] = useState(false);
  const [archivo, guardarArchivo] = useState("");
  const { auth } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
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
    formData.append("description", valueDate.description);
    formData.append("tipoTatoo", valueDate.tipoTatoo);
    formData.append("cost", valueDate.cost);
    formData.append("estimated", valueDate.estimated);
    formData.append("picture", archivo);
    setLoading(true);
    clienteAxios
      //.post("/dateTatoo", valueDate, {
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
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
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
                width: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <TextField
                  id="title"
                  size="small"
                  required
                  label="title "
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
                  sx={{ m: 1, width: "25ch" }}
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
                  required
                  size="small"
                  id="description"
                  label="Descripcion Tatuaje"
                  type="text"
                  onChange={handleChangeDate("description")}
                />
              </Box>
              <Box sx={{}}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    sx={{ m: 1, width: "175px" }}
                    id="desPhotoTatoo"
                    name="desPhotoTatoo"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>
                  <Box></Box>
                </Box>
              </Box>
              <Box>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Tipo Tatuaje</FormLabel>
                  <RadioGroup
                    row
                    //required
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
                  sx={{ m: 1, width: "25ch" }}
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
                <TextField
                  id="cost"
                  required
                  size="small"
                  label="Costo Aprox"
                  type="text"
                  onChange={handleChangeDate("cost")}
                />
              </Box>
              <Box>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  required
                  id="estimated"
                  size="small"
                  label="Adelanto"
                  type="text"
                  onChange={handleChangeDate("estimated")}
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
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
/*<Box>
<SelectDuracion handleChangeDate={handleChangeDate} />
</Box>*/
