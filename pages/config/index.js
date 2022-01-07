import React  from "react";
import LayoutApp from "../../Components/LayoutApp";
import FrmConfig from "../../Components/config/FrmConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Config = () => {

  const [valToken,setToken] = useLocalStorage('userVal',"");
  const router = useRouter();

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    return (
      <LayoutApp>
        <FrmConfig  />
      </LayoutApp>
    );
  } else {
    return (
      <LayoutApp>
        <h1>No autorizado</h1>
      </LayoutApp>
    );

    //router.push("/agenda")
  }
};
export default Config;
