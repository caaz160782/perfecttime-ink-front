import React from "react";
import Layout from "../../Components/Layout";
import FrmStudio from "../../Components/studio/Studiofrm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Studio = () => {
  const router = useRouter();

  return (
    <div>
      <FrmStudio />
    </div>
  );
};

export default Studio;
