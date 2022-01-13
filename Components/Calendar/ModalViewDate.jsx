import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ModalViewDate = () => {
  return (
    <div>
      <Dialog open={open} fullScreen={fullScreen} onClose={handleClose}>
        <DialogTitle>
          Agendar {fechaHoy.split("-").reverse().join("/")}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalViewDate;
