import React  from "react";
import LayoutApp from "../../Components/LayoutApp";
import FrmStudio from "../../Components/studio/Studiofrm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Studio = () => {
  if (valToken) {
    const { token, auth, infoUser } = valToken;
    return (
      <LayoutApp>
        <FrmStudio  />
      </LayoutApp>
    );
  } else {
    return (
      <LayoutApp>
        <h1>No autorizado</h1>
      </LayoutApp>
    );
  }
  
};

export default Studio