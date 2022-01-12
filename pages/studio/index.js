import React from "react";
import Layout from "../../Components/Layout";
import FrmStudio from "../../Components/studio/Studiofrm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Studio = () => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const router = useRouter();

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    return (
      <Layout>
        <FrmStudio />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>No autorizado</h1>
      </Layout>
    );
  }
};

export default Studio;
