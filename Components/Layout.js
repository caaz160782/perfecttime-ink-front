import Header from "./header/Header"
import Head from "next/head";
import { Typography, ThemeProvider } from "@material-ui/core";
import theme from './../utils/temaConfig'

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
      <div>{children}</div>
      <footer>
        <Typography>All rights reserved. Perfect Time Ink.</Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Layout