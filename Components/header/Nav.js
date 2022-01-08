import NextLink from "next/link";
import { Link, Tabs, Tab, Button, makeStyles } from "@mui/material";

import theme from "./../../utils/temaConfig";
//import LinkTab from "./LinkTab";
import { useState } from "react";
import useStyles from "./style";


export const Nav = () => {
  const classes = useStyles()

  return (
    <div className={classes.tabContainer}>
      {" "}
      <NextLink href="/" passHref>
        <Link className={classes.tab}>Home</Link>
      </NextLink>
      <NextLink href="/servicios" passHref>
        <Link className={classes.tab}>Servicios</Link>
      </NextLink>
      <NextLink href="/galeria" passHref>
        <Link className={classes.tab}>Galeria</Link>
      </NextLink>
      <NextLink href="/contacto" passHref>
        <Link className={classes.tab}>Contacto</Link>
      </NextLink>
      {/* <NextLink href="/staff" passHref>
        <Link className={classes.tab}>staff</Link>
      </NextLink> */}
      <NextLink href="/login" passHref>
        <Link>
          <Button className={classes.btn} variant="contained" color="primary">
            Login
          </Button>
        </Link>
      </NextLink>{" "}
    </div>
  );
};

    // <Tabs
    //   indicatorColor="primary"
    //   value={value}
    //   onChange={handleChange}
    //   className={classes.tabContainer}
    // >
    //   <Tab
    //     className={classes.tab}
    //     label="Home"
    //     component={Link}
    //     to="/servicios"
    //   >
    //     {" "}
    //   </Tab>
    //   <Tab className={classes.tab} label="Galeria">
    //     {" "}
    //   </Tab>
    //   <Tab className={classes.tab} label="Contacto">
    //     {" "}
    //   </Tab>
    //   <Tab className={classes.tab} label="Servicios" component={Link}>
    //     {" "}
    //   </Tab>
    //   {/* <LinkTab  /> */}
    //   {/* <LinkTab label="Page Two" href="/bar" /> */}
    // </Tabs>;
