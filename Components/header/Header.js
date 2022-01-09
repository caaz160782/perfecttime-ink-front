import NextLink from "next/link";
import Image from "next/image";

import React ,{ useState, useContext } from "react";

import {useScrollTrigger} from "@mui/material";
import {
  AppBar,
  Toolbar,
  Link,
  List,
  ListItem,
  IconButton,
  SwipeableDrawer
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
//import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

import theme from "./../../utils/temaConfig";
import { Nav } from "./Nav";
import useStyles from "./style";

import { useLocalStorage } from "../../hooks/useLocalStorage";

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

    const [valToken, setToken] = useLocalStorage("userVal", {
      token: "",
      auth: "",
      infoUser: "",
    });
   // console.log("probando desde el header", valToken.infoUser);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

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
                    src="/images/Logo.png"
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
