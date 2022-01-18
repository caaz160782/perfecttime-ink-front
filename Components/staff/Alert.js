import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ reactivar }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSi = () => {
    reactivar();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="success" variant="outlined" onClick={handleClickOpen}>
        REACTIVAR
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro que desea reactivar?"}
        </DialogTitle>

        <DialogActions align="center">
          <Button color="error" onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleCloseSi}>Si, adelante</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
