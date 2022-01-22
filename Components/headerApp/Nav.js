import NextLink from "next/link";
import { Link, Tabs, Tab, Button, makeStyles } from "@mui/material";
import { useRouter } from "next/router";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import theme from "./../../utils/temaConfig";
import { useState, useEffect, useContext } from "react";
import useStyles from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AuthContext } from "../../Context/AuthContext";

export const Nav = ({ logOut }) => {
  const { auth, guardarAuth } = useContext(AuthContext);
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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
  console.log("pahtname-----", router.pathname);
  const Linkes = () => {
    if (rol === "Administrador") {
      return (
        <>
          <NextLink href="/agenda" passHref>
            <Link
              className={
                router.pathname == "/agenda" ? classes.active : classes.tab
              }
            >
              Agenda
            </Link>
          </NextLink>
          <NextLink href="/staff" passHref>
            <Link
              className={
                router.pathname == "/staff" ? classes.active : classes.tab
              }
            >
              Staff
            </Link>
          </NextLink>
          <NextLink href="/client" passHref>
            <Link
              className={
                router.pathname == "/client" ? classes.active : classes.tab
              }
            >
              Clientes
            </Link>
          </NextLink>
          <NextLink href="/studio/modif" passHref>
            <Link
              className={
                router.pathname == "/studio/[id]" ? classes.active : classes.tab
              }
            >
              Estudio
            </Link>
          </NextLink>
          <NextLink href="/config/modif" passHref>
            <Link
              className={
                router.pathname == "/config" ? classes.active : classes.tab
              }
            >
              Configuracion
            </Link>
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
            <Link className={classes.tab}>Mi Cuenta</Link>
          </NextLink>
        </>
      );
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className={classes.tabContainer}
    >
      {" "}
      <NextLink href="/" passHref>
        <Link className={router.pathname == "/" ? classes.active : classes.tab}>
          Home
        </Link>
      </NextLink>
      <Linkes></Linkes>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "30px",
        }}
      >
        <SupervisorAccountIcon />
        <NextLink href="/info-personal" passHref>
          <Link
            className={
              router.pathname == "/info-personal"
                ? classes.activeAdmon
                : classes.admon
            }
          >
            Administrador
          </Link>
        </NextLink>
        <Button
          onClick={logOut}
          className={classes.btn}
          variant="contained"
          color="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
