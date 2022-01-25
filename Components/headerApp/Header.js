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
  Switch,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "./../../utils/temaConfig";
import { Nav } from "./Nav";
import useStyles from "./style";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";

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

const HeaderApp = (props) => {
  const { auth, guardarAuth, logOut } = useContext(AuthContext);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
  };

  let rol = auth?.infoUser?.rol;
  const router = useRouter();

  let drawer = undefined;
  if (rol === "Administrador") {
    drawer = (
      <>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{ paper: classes.drawer }}
        >
          <List align="center" mx={{ m: 4 }}>
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
              selected={value === 0}
              onClick={() => setValue(0)}
            >
              <NextLink href="/agenda" passHref>
                <Link
                  className={
                    router.pathname == "/agenda"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Agenda
                </Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 3}
              onClick={() => setValue(3)}
            >
              <NextLink href="/staff" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/staff"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Staff
                </Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 2}
              onClick={() => setValue(2)}
            >
              <NextLink href="/client" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/client"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Clientes
                </Link>
              </NextLink>
            </ListItem>

            <ListItem
              divider
              button
              selected={value === 1}
              onClick={() => setValue(1)}
            >
              <NextLink href="/studio/modif" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/studio/[id]"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Estudio
                </Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 1}
              onClick={() => setValue(1)}
            >
              <NextLink href="/config" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/config"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Configuracion
                </Link>
              </NextLink>
            </ListItem>

            <ListItem
              divider
              button
              className={classes.loginContainer}
              selected={value === 4}
              onClick={() => setValue(4)}
            >
              <Button onClick={logOut} className={classes.linkDrawerLogin}>
                Logout
              </Button>
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
  } else if (rol === "tatuador") {
    drawer = (
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
                  Link
                  className={
                    router.pathname == "/"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Home
                </Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 0}
              onClick={() => setValue(0)}
            >
              <NextLink href="/agenda" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/agenda"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Agenda
                </Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 1}
              onClick={() => setValue(1)}
            >
              <NextLink href="/clientAdmin" passHref>
                <Link
                  Link
                  className={
                    router.pathname == "/agenda"
                      ? classes.activeDrawer
                      : classes.linkDrawer
                  }
                >
                  Clientes
                </Link>
              </NextLink>
            </ListItem>

            <ListItem
              divider
              button
              className={classes.loginContainer}
              selected={value === 4}
              onClick={() => setValue(4)}
            >
              <Button onClick={logOut} className={classes.linkDrawerLogin}>
                Logout
              </Button>
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
  } else {
    drawer = (
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
                <Link className={classes.linkDrawer}>Home</Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 0}
              onClick={() => setValue(0)}
            >
              <NextLink href="/agenda" passHref>
                <Link className={classes.linkDrawer}>Agenda</Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 1}
              onClick={() => setValue(1)}
            >
              <NextLink href="/info-personal" passHref>
                <Link className={classes.linkDrawer}>Mi cuenta</Link>
              </NextLink>
            </ListItem>

            <ListItem
              divider
              button
              className={classes.loginContainer}
              selected={value === 4}
              onClick={() => setValue(4)}
            >
              <Button onClick={logOut} className={classes.linkDrawerLogin}>
                Logout
              </Button>
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
  }

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="fixed"
          color="primary"
          style={{ marginBottom: "5px" }}
        >
          <Toolbar>
            <div>
              <NextLink href="/" passHref>
                <Link>
                  <img
                    className={classes.logo}
                    src="/images/logo.jfif"
                    alt="logo"
                  />
                </Link>
              </NextLink>
            </div>
            {matches ? (
              drawer
            ) : (
              <Nav rol={auth?.infoUser?.rol} logOut={logOut}></Nav>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};
export default HeaderApp;
