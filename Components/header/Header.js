import NextLink from "next/link";
import Image from "next/image";

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {
  AppBar,
  Toolbar,
  Link,
  Tabs,
  Tab,
  CssBaseline,
  createTheme,
  Button,
  Switch,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
//import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
//import { Store } from "../utils/Store";
import theme from "./../../utils/temaConfig";
import { Nav } from "./Nav";
import { SwipeableDrawer } from "@material-ui/core";

//una funcion que recibe un objeto con ciertas propiedades
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "7em",
  },
  logo: {
    height: "7em",
    [theme.breakpoints.down("sm")]: {
      height: "5em",
    },
  },
  //DRAWER
  drawer: {
    backgroundColor: theme.palette.secondary.dark,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      //backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    width: 40,
    height: 40,
    // color: "#fff"
  },
  linkDrawer: {
    fontFamily: "Raleway",
    color: "#fff",
    fontWeight: 550,
    fontSize: "1.3rem",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  linkDrawerLogin: {
    fontFamily: "Pacifico",
    fontSize: "1.5rem",
    color: "#fff",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  loginContainer: {
    backgroundColor: "#EFC437",
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  //const matches = true;
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
  };

  const drawer = [
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          <ListItem
            divider
            button
            selected={value === 0}
            onClick={() => setValue(0)}
          >
            <NextLink href="/" passHref>
              <Link className={classes.linkDrawer}>Inicio</Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 1}
            onClick={() => setValue(1)}
          >
            <NextLink href="/servicios" passHref>
              <Link className={classes.linkDrawer}>Servicios</Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 2}
            onClick={() => setValue(2)}
          >
            <NextLink href="/galeria" passHref>
              <Link className={classes.linkDrawer}>Galeria</Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 3}
            onClick={() => setValue(3)}
          >
            <NextLink href="/contacto" passHref>
              <Link className={classes.linkDrawer}>Contacto</Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            className={classes.loginContainer}
            selected={value === 4}
            onClick={() => setValue(4)}
          >
            <NextLink href="/login" passHref>
              <Link className={classes.linkDrawerLogin}>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>,
  ];

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <div>
              <NextLink href="/" passHref>
                <Link>
                  <Image
                    className={classes.logo}
                    src="/images/logo.jfif"
                    alt="logo"
                    width={120}
                    height={100}
                  ></Image>
                </Link>
              </NextLink>
            </div>
            {matches ? drawer : <Nav></Nav>}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;
