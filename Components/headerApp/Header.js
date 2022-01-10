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
  SwipeableDrawer,
  Switch,
  Button
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
//import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

import theme from "./../../utils/temaConfig";
import { AuthContext } from "../../Context/AuthContext";
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

const HeaderApp = (props) => {

  const {logout} = props
  const [valToken, setToken] = useLocalStorage("userVal", "");

  const [auth, guardarAuth] = useContext(AuthContext);
  //console.log("auth desde el headerApp", auth);
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

  let rol = auth.infoUser.rol;
let drawer=[]

  if (rol === "Administrador") {
    drawer = [
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
              <NextLink href="/config" passHref>
                <Link className={classes.linkDrawer}>Configuracion</Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 2}
              onClick={() => setValue(2)}
            >
              <NextLink href="/clientAdmin" passHref>
                <Link className={classes.linkDrawer}>Clientes</Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              selected={value === 3}
              onClick={() => setValue(3)}
            >
              <NextLink href="/staff" passHref>
                <Link className={classes.linkDrawer}>Staff</Link>
              </NextLink>
            </ListItem>
            <ListItem
              divider
              button
              className={classes.loginContainer}
              selected={value === 4}
              onClick={() => setValue(4)}
            >
              <Button onClick={logout} className={classes.linkDrawerLogin}>
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
      </>,
    ];
  } else if (rol === "tatuador") {
     drawer = [
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
               <NextLink href="/clientAdmin" passHref>
                 <Link className={classes.linkDrawer}>Clientes</Link>
               </NextLink>
             </ListItem>

             <ListItem
               divider
               button
               className={classes.loginContainer}
               selected={value === 4}
               onClick={() => setValue(4)}
             >
               <Button onClick={logout} className={classes.linkDrawerLogin}>
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
       </>,
     ];
  } else {
     drawer = [
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
               <Button onClick={logout} className={classes.linkDrawerLogin}>
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
       </>,
     ];
  }



  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" style>
          <Toolbar>
            <div>
              <NextLink href="/" passHref>
                <Link>
                  <img
                    style={{ borderRadius: "50%" }}
                    className={classes.logo}
                    src="/images/logo.jfif"
                    alt="logo"
                    width={120}
                    height={120}
                  ></img>
                </Link>
              </NextLink>
            </div>
            {matches ? (
              drawer
            ) : (
              //  <Nav rol={valToken.infoUser.rol} logout={logout}></Nav>
              <Nav logout={logout}></Nav>
            )}
            <Switch></Switch>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};;
export default HeaderApp;
