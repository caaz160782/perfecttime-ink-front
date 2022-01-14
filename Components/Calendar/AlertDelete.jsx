import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const AlertDelete = ({ openAlert, setopenAlert, texto, deleteDate }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setopenAlert(false);
  };

  return (
    <div>
      <Modal
        open={openAlert}
        onClose={setopenAlert}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {texto}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <Button onClick={deleteDate}>Si</Button>
            </Box>
            <Box>
              <Button onClick={handleClose}>No</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AlertDelete;
