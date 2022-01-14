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
  );
  // } else {
  // return (
  //   <Layout>
  //     <h1>No autorizado</h1>
  //   </Layout>
  // );
  // }
};
export default Agenda;
