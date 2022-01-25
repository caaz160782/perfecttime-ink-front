import React from "react";
import FrmAgenda from "../../Components/agenda/FrmAgenda";
import Box from "@mui/material/Box";
import Head from "next/head";

const Agenda = () => {
  return (
    <>
      <Box sx={{ p: 0 }}>
        <FrmAgenda />
      </Box>
    </>
  );
};
export default Agenda;
