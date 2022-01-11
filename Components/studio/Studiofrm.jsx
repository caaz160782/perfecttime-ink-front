import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  styled
} from "@mui/material";
import clienteAxios from "../../utils/axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

const FrmConfig = () => {
  const router = useRouter();  
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const Input = styled("input")({
    display: "none",
  });
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
  }
}
