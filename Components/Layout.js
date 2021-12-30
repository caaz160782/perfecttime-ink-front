import Header from "./Header"
import Head from "next/head";
import { Typography } from "@material-ui/core";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Perfect Time Ink` : "Perfect Time Ink"}
        </title>
      </Head>

      <Header></Header>
      <div>{children}</div>
      <footer>
        <Typography>All rights reserved. Perfect Time Ink.</Typography>
      </footer>
    </div>
  );
};

export default Layout