import * as React from "react";
import { Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import SelectTatuador from "./SelectTatuador";

const ModalDate = ({
  open,
  handleClose,
  fechaHoy,
  handleGuardar,
  handleChangeDate,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Info tatuaje</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <TextField
              autoFocus
              id="description"
              label="Descripcion"
              type="text"
              // onChange={handleChangeDate("descripcion")}
            />

            <TextField
              margin="dense"
              size="small"
              fullWidth
              id="picture"
              name="picture"
              inputProps={{ type: "file" }}
              //onChange={leerArchivo}
              // onChange={handleChangeDate("picture")}
            ></TextField>

            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agendar</DialogTitle>
        <DialogContent>
          <Box> {fechaHoy}</Box>
          <Box>
            <SelectTatuador handleChangeDate={handleChangeDate} />
          </Box>
          <Box>
            <TextField
              id="cliente"
              label="cliente"
              type="text"
              onChange={handleChangeDate("cliente")}
            />
          </Box>
          <Box>
            {" "}
            <TextField
              id="hora"
              label="Hora"
              type="text"
              onChange={handleChangeDate("hora")}
            />
          </Box>
        </DialogContent>
        <ChildModal />

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDate;
