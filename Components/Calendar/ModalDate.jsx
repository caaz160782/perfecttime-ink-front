import React, { useState } from "react";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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

  const handleClose = () => {
    setOpen(false);
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
    setLoading(true);
    clienteAxios
      .post("/dateTatoo", valueDate, {
        //   headers: { apitoken: valToken.token },
      })
      .then((response) => {
        const { code } = response.data;
        if (code === "Succesful") {
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <InputLabel>Subir Imagen Muestra</InputLabel>
                <label htmlFor="icon-button-file">
                  <Input
                    //required
                    size="small"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleChangeDate("desPhoto")}
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
