import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SelectTatuador from "./SelectTatuador";
import SelectDuracion from "./SelectDuracion";
import SelectClient from "./SelectClient";
import SelectSize from "./SelectSize";
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
  handleClose,
  fechaHoy,
  handleGuardar,
  handleChangeDate,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Input = styled("input")({
    display: "none",
  });

  return (
    <div>
      <Dialog open={open} fullScreen={fullScreen} onClose={handleClose}>
        <DialogTitle>
          Agendar {fechaHoy.split("-").reverse().join("/")}
        </DialogTitle>
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
            <Box> </Box>
            <Box>
              <SelectTatuador handleChangeDate={handleChangeDate} />
            </Box>
            <Box>
              <SelectClient handleChangeDate={handleChangeDate} />
            </Box>
            <Box>
              <TextField
                sx={{ m: 1, width: "25ch" }}
                id="time"
                label="Hora Cita"
                type="time"
                defaultValue="09:00"
                onChange={handleChangeDate("start")}
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
                id="descripcion"
                label="Descripcion"
                type="text"
                onChange={handleChangeDate("descripcion")}
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
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleChangeDate("imgMuestra")}
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
                  aria-label="tipeTattoo"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="color"
                    control={<Radio />}
                    label="Color"
                    onChange={handleChangeDate("tipeTattoo")}
                  />
                  <FormControlLabel
                    value="bn"
                    control={<Radio />}
                    label="Blanco y Negro"
                    onChange={handleChangeDate("tipeTattoo")}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <SelectSize handleChangeDate={handleChangeDate} />
            </Box>
            <Box>
              <SelectDuracion handleChangeDate={handleChangeDate} />
            </Box>
            <Box>
              <TextField
                id="costoAprox"
                label="Costo Aprox"
                type="text"
                onChange={handleChangeDate("costoAprox")}
              />
            </Box>
            <Box>
              <TextField
                sx={{ m: 1, width: "25ch" }}
                id="adelanto"
                label="Adelanto"
                type="text"
                onChange={handleChangeDate("adelanto")}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalDate;
