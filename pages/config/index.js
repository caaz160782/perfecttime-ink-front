import React from "react";
import Layout from "../../Components/Layout";
import FrmConfig from "../../Components/Config/FrmConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Config = () => {
  const [valToken, setToken] = useLocalStorage("userVal", "");

  if (valToken) {
    return (
      <div>
        <FrmConfig />
      </div>
    );
  } else {
    return (
      <div>
        <h1>No autorizado</h1>
      </div>
    );

    //router.push("/agenda")
  }
};
export default Config;
