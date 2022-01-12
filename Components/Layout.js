import Header from "./header/Header"
import HeaderApp from "./headerApp/Header";
import Head from "next/head";
import { Typography, ThemeProvider, Container, CssBaseline } from "@mui/material";
import theme from '../utils/temaConfig'
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
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
   const [auth, guardarAuth] = useContext(AuthContext);
    const [valToken, setToken] = useLocalStorage("userVal", "");
    console.log("probando desde el layout", valToken);
    const router = useRouter()
    // let authh = false

   useEffect(() => {
     const tokenInfo = localStorage.getItem("userVal");
     const tokenStored = JSON.parse(tokenInfo);
   //  console.log("este es el token desde _app", tokenStored);
     if (tokenStored) {
       const { token, infoUser, autenticado } = tokenStored;
       console.log('si hay token en el storage',token);

           guardarAuth({

             token,
             autenticado,
             infoUser
           // rol: infoUser.rol,
           // name: infoUser.name,
          });

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

      console.log("auth desde layout", auth.autenticado);
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

      {auth.autenticado ? (
        <HeaderApp logout={logout}></HeaderApp>
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
          marginTop:"30px"
        }}
      >
        <Typography style={{ color: "#fff" }}>
          All rights reserved. Perfect Time Ink | 2022
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Layout