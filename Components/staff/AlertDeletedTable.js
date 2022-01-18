import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "./../../utils/temaConfig";

export default function AlertDeleteTable({ eliminar }) {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSi = () => {
    eliminar();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        {matches ? <DeleteIcon></DeleteIcon> : "eliminar"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro que desea eliminar?"}
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
