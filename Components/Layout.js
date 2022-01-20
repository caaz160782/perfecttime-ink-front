import Head from "next/head";
import {
  Typography,
  ThemeProvider,
  Container,
  CssBaseline,
} from "@mui/material";
import theme from "../utils/temaConfig";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useMemo } from "react";
import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import HeaderAct from "./headerAct/Header";
//importacion dinamica
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./header/Header"));
const HeaderApp = dynamic(() => import("./headerApp/Header"));

const Layout = ({ title, children }) => {
  const contextValue = useContext(AuthContext);
  const { auth, logOut } = contextValue;
  //console.log("layout", auth, logOut);
  const router = useRouter();

  const [NavComponent, setNavComponent] = useState(() => <></>);

  useEffect(() => {
    //console.log("autenticado", auth.autenticado);
    setNavComponent(
      auth?.autenticado ? <HeaderApp logOut={logOut} /> : <Header />
    );
  }, [auth]);

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
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Head>
      {/* {auth?.autenticado ? <HeaderApp logout={logOut} /> : <Header />} */}
      {NavComponent}
      <Container style={{ minHeight: "calc(90vh - 6em)", paddingTop: "2em" }}>
        {children}
      </Container>
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(91, 107, 119)",
          height: "10vh",
          marginTop: "60px",
        }}
      >
        <Typography style={{ color: "#fff", fontWeight: "500" }}>
          All rights reserved. Perfect Time Ink | 2022
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Layout;
