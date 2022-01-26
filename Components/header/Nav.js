import NextLink from "next/link";
import { Link, Tabs, Tab, Button, makeStyles } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import useStyles from "./style";

export const Nav = (props) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.tabContainer}>
      {" "}
      <NextLink href="/" passHref>
        <Link className={router.pathname == "/" ? classes.active : classes.tab}>
          Home
        </Link>
      </NextLink>
      <NextLink href="/servicios" passHref>
        <Link
          className={
            router.pathname == "/servicios" ? classes.active : classes.tab
          }
        >
          Servicios
        </Link>
      </NextLink>
      <NextLink href="/galeria" passHref>
        <Link
          className={
            router.pathname == "/galeria" ? classes.active : classes.tab
          }
        >
          Galeria
        </Link>
      </NextLink>
      <NextLink href="/contacto" passHref>
        <Link
          className={
            router.pathname == "/contacto" ? classes.active : classes.tab
          }
        >
          Contacto
        </Link>
      </NextLink>
      <NextLink href="/login" passHref>
        <Link>
          <Button className={classes.btn} variant="outlined" color="secondary">
            <LoginIcon style={{ marginRight: "5" }} /> {` Login`}
          </Button>
        </Link>
      </NextLink>{" "}
    </div>
  );
};
