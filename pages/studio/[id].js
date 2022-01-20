import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import StudioConfig from "../../Components/studio/StudioConfig";
import StudioModif from "../../Components/studio/StudioModif";

const ModStudio = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //m: 18,
      }}
    >
      {auth?.infoStudio.id ? <StudioModif /> : <StudioConfig />}
    </Box>
  );
};

export default ModStudio;
