import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Agenda = () => {
  const [valToken] = useLocalStorage("userVal", "");

  useEffect(() => {}, []);

  //if (valToken !== ) {
  return (
    <Layout>
      <div style={{ width: "100%" }}>
        <h1> prueba</h1>
      </div>
    </Layout>
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
