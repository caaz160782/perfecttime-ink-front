import { createTheme } from "@material-ui/core";

const gris = "#F8F8F8";
const dorado = "#EFC437";//centralizando

const theme = createTheme({
  //aqui estan las configuraciones predeterminadas que podemos sobreescribir
  //theme se usa para centralizar los estilos y crear una apariencia consistente
  palette: {
    common: {
      golden: `${dorado}`,
      gray: `${gris}`,
    },
    primary: {
      main: `${dorado}`,
    },
    secondary: {
      main: `${gris}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontSize: "1.5rem",
      fontWeight: 700,
    },
  },
  fuente:{

    fontFamily: "Raleway",
  }
});

export default theme