import React, { useState, useEffect, useContext } from "react";
import FrmAgenda from "../../Components/agenda/FrmAgenda";
import Box from "@mui/material/Box";
import { AuthContext } from "../../Context/AuthContext";

const Agenda = () => {
  return (
    <Box sx={{ p: 0 }}>
      <FrmAgenda />
    </Box>
  );
};
export default Agenda;
