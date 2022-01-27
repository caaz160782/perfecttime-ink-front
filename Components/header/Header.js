import NextLink from "next/link";
import React, { useState, useContext } from "react";

import { useScrollTrigger } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Link,
  List,
  ListItem,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
//import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

import theme from "./../../utils/temaConfig";
import { Nav } from "./Nav";
import useStyles from "./style";
import { useRouter, userRouter } from "next/router";

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

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const classes = useStyles();
  const router = useRouter();

  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
  };

  const drawer = (
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
              <Link
                className={
                  router.pathname == "/"
                    ? classes.activeDrawer
                    : classes.linkDrawer
                }
              >
                Inicio
              </Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 1}
            onClick={() => setValue(1)}
          >
            <NextLink href="/servicios" passHref>
              <Link
                className={
                  router.pathname == "/servicios"
                    ? classes.activeDrawer
                    : classes.linkDrawer
                }
              >
                Servicios
              </Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 2}
            onClick={() => setValue(2)}
          >
            <NextLink href="/galeria" passHref>
              <Link
                className={
                  router.pathname == "/galeria"
                    ? classes.activeDrawer
                    : classes.linkDrawer
                }
              >
                Galeria
              </Link>
            </NextLink>
          </ListItem>
          <ListItem
            divider
            button
            selected={value === 3}
            onClick={() => setValue(3)}
          ></ListItem>
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
    </>
  );

  return (
    <ElevationScroll>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div>
            <NextLink href="/" passHref>
              <Link>
                <img
                  style={{ borderRadius: "50%" }}
                  className={classes.logo}
                  src="/images/logo.jfif"
                  alt="logo"
                />
              </Link>
            </NextLink>
          </div>
          {matches ? drawer : <Nav></Nav>}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
export default Header;
