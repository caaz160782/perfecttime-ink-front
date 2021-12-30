import NextLink from "next/link";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  //una funcion que recibe un objeto con ciertas propiedades
  logo: {
    color: "red",
  },
});

const Header = () => {
  const classes =  useStyles()//hook para trabajar con los estilos en css
  return (
    <div>
      <ul>
        <li>
          <NextLink href="/">
            <a className={classes.logo}>LOGO</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/servicios">
            <a>servicios</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/galeria">
            <a>galeria</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/contacto">
            <a>contacto</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/login">
            <Button variant="contained" color="primary">login</Button>
          </NextLink>
        </li>
      </ul>
    </div>
  );
};
export default Header;
