import Header from "./headerApp/Header"
import Head from "next/head";
import { Typography, ThemeProvider, Container } from "@mui/material";
import theme from '../utils/temaConfig'
import { CRMContext, CRMProvider } from "../utils/CRMContext";
import { useContext } from "react";

//usar el ThemeProvider donde este el componente principal y envolver todos los componentes

const Layout = ({ title, children }) => {

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

        <Header></Header>
        <Container>{children}</Container>
        <footer>
          <Typography>All rights reserved. Perfect Time Ink.</Typography>
        </footer>

    </ThemeProvider>
  );
};

export default Layout