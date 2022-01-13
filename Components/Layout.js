import Header from "./header/Header";
import HeaderApp from "./headerApp/Header";
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
//import theme from "../../utils/temaConfig";

const Layout = ({ title, children }) => {
  // const useStyles = makeStyles((theme) => {
  //   footer:{
  //     backgroundColor:"#000"
  //   }
  // })
  //const classes = useStyles();

  const contextValue = useContext(AuthContext);
  console.log("0", contextValue);
  const { auth, guardarAuth, logOut } = contextValue;
  //const [valToken, setToken] = useLocalStorage("userVal", "");
  //console.log("probando desde el layout", valToken);
  console.log("1", auth);

  const router = useRouter();
  // let authh = false
  //console.log("auth desde layout", valtoken);
  //console.log("auth desde layout", auth.autenticado);
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
      {auth?.autenticado ? (
        <HeaderApp logout={logOut}></HeaderApp>
      ) : (
        <Header></Header>
      )}

      <Container style={{ minHeight: "70vh" }}>{children}</Container>
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(91, 107, 119)",
          height: "10vh",
          marginTop: "30px",
        }}
      >
        <Typography style={{ color: "#fff" }}>
          All rights reserved. Perfect Time Ink | 2022
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Layout;
