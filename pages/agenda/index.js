<<<<<<< HEAD
import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "../../Context/AuthContext";

const Agenda = () => {
  const { auth, guardarAuth, logOut } = useContext(AuthContext);

  console.log("auth=====>=====", auth);

  useEffect(() => {}, []);

  //if (valToken !== ) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <h1> prueba</h1>
      </div>
    </>
=======
import React, { useState, useEffect, useContext } from "react";
import FrmAgenda from "../../Components/agenda/FrmAgenda";
import Box from "@mui/material/Box";
import { AuthContext } from "../../Context/AuthContext";

const Agenda = () => {
  return (
    <Box sx={{ p: 0 }}>
      <FrmAgenda />
    </Box>
>>>>>>> develop
  );
};
export default Agenda;
