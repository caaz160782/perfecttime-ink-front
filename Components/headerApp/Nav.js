import NextLink from "next/link";
import { Link, Tabs, Tab, Button, makeStyles } from "@mui/material";

import theme from "./../../utils/temaConfig";
//import LinkTab from "./LinkTab";
import { useState, useEffect, useContext } from "react";
import useStyles from "./style";

import { AuthContext } from "../../Context/AuthContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export const Nav = ({ logout }) => {
  const { auth, guardarAuth } = useContext(AuthContext);

  //  console.log("nav", auth);

  //  console.log("nav===", auth.infoUser.rol);

  let rol = auth?.infoUser?.rol;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Linkes = () => {
    if (rol === "Administrador") {
      return (
        <>
          <NextLink href="/agenda" passHref>
            <Link className={classes.tab}>Agenda</Link>
          </NextLink>
          <NextLink href="/config" passHref>
            <Link className={classes.tab}>Configuracion</Link>
          </NextLink>
          <NextLink href="/client" passHref>
            <Link className={classes.tab}>Clientes</Link>
          </NextLink>
          <NextLink href="/staff" passHref>
            <Link className={classes.tab}>Staff</Link>
          </NextLink>
        </>
      );
    } else if (rol === "tatuador") {
      return (
        <>
          <NextLink href="/agenda" passHref>
            <Link className={classes.tab}>Agenda</Link>
          </NextLink>
          <NextLink href="/clientAdmin" passHref>
            <Link className={classes.tab}>Clientes</Link>
          </NextLink>
        </>
      );
    } else {
      return (
        <>
          <NextLink href="/agenda" passHref>
            <Link className={classes.tab}>Agenda</Link>
          </NextLink>
          <NextLink href="/info-personal" passHref>
            <Link className={classes.tab}>mi cuenta</Link>
          </NextLink>
        </>
      );
    }
  };

  return (
    <div className={classes.tabContainer}>
      {" "}
      <NextLink href="/" passHref>
        <Link className={classes.tab}>Home</Link>
      </NextLink>
      <Linkes></Linkes>
      <Button
        onClick={logout}
        className={classes.btn}
        variant="contained"
        color="secondary"
      >
        Logout
      </Button>
    </div>
  );
};
