import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import SelectTatuador from "./SelectTatuador";

const ModalDate = ({ open, handleClose }) => {
  /*const handleClickOpen = () => {
    setOpen(true);
  };*/

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agendar</DialogTitle>
        <DialogContent>
          <Box>
            <SelectTatuador />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDate;
