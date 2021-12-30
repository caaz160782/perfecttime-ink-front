import Header from "./Header"
import Head from "next/head";
import { Typography } from "@material-ui/core";

const Layout = (props)=>{
  return (
    <div>
      <Head>
        <title>Perfect Time Ink</title>
      </Head>

      <Header></Header>
      <div>{props.children}</div>
      <footer>
        <Typography>All rights reserved. Perfect Time Ink.</Typography>
      </footer>
    </div>
  );
}

export default Layout