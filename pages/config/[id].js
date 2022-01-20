import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import ConfigInitial from "../../Components/Config/ConfigInitial";
import ConfigModif from "../../Components/Config/ConfigModif";

const ModConfig = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  //console.log(auth);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //m: 18,
      }}
    >
      {auth?.infoStudio.id && <ConfigModif />}
      {!auth?.infoStudio.id && <ConfigInitial />}
    </Box>
  );
};

export default ModConfig;
