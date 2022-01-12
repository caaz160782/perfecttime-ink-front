import React  from "react";
import Layout from "../../Components/Layout";
import FrmConfig from "../../Components/config/FrmConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Config = () => {

  const [valToken,setToken] = useLocalStorage('userVal',"");
  const router = useRouter();

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    return (
      <Layout>
        <FrmConfig  />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>No autorizado</h1>
      </Layout>
    );

    //router.push("/agenda")
  }
};
export default Config;
