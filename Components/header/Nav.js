import NextLink from "next/link";
import {
  Link,
  Tabs,
  Tab,
  Button,
  makeStyles,
} from "@material-ui/core";

import theme from "./../../utils/temaConfig";
//import LinkTab from "./LinkTab";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    color: "#000",
    marginLeft: "40px",
    "&:hover": {
      transition: "color 0.7s ease",
      textDecoration: "underline #F8F8F8",
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down("md")]: {

    },

  },
  btn: {
    color: "#fff",
    fontFamily: "Pacifico",
    textTransform: "none",
    fontSize: "1.6rem",
    borderRadius: "40px",
    marginLeft: "50px",
    marginRight: "25px",
    padding: "2px 20px",
    "&:hover": {
      textDecoration: `underline ${theme.palette.primary.dark}`,
    },
    [theme.breakpoints.down("sm")]: {

    },
  },
}));

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
      <NextLink href="/staff" passHref>
        <Link className={classes.tab}>staff</Link>
      </NextLink>
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
