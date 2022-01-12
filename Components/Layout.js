import Header from "./header/Header";
import HeaderApp from "./headerApp/Header";
import Head from "next/head";
import { Typography, ThemeProvider, Container } from "@mui/material";
import theme from "./../utils/temaConfig";
import { CRMContext, CRMProvider } from "../utils/CRMContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//usar el ThemeProvider donde este el componente principal y envolver todos los componentes

const Layout = ({ title, children }) => {
  const [auth, guardarAuth] = useContext(AuthContext);
  const [valToken, setToken] = useLocalStorage("userVal", "");
  //console.log("probando desde el layout", valToken);
  const router = useRouter();
  // let authh = false

  useEffect(() => {
    const tokenInfo = localStorage.getItem("userVal");
    const tokenStored = JSON.parse(tokenInfo);
    //  console.log("este es el token desde _app", tokenStored);
    if (tokenStored) {
      const { token, infoUser } = tokenStored;
      //console.log('si hay token en el storage');

      guardarAuth({
        token,
        auth: tokenStored.auth,
        infoUser,
        // rol: infoUser.rol,
        // name: infoUser.name,
      });
    } else {
      guardarAuth;
    }
  }, []);
  const logout = () => {
    setToken({
      token: "",
      auth: "",
      infoUser: { rol: "" },
    });
    router.push("/");
  };

  //console.log("auth desde layout", auth);
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          {title ? `${title} - Perfect Time Ink` : "Perfect Time Ink"}
        </title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Sancreek:400|Roboto:300,400,500.700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap"
        />
      </Head>
      {auth.auth ? <HeaderApp logout={logout}></HeaderApp> : <Header></Header>}

      <Container>{children}</Container>
      <footer>
        <Typography>All rights reserved. Perfect Time Ink.</Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Layout;
