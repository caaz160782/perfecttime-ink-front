import { createTheme } from "@mui/material";

//const gris = "rgb(91, 107, 119)";
const gris = "#334756";
//const gris = "#476072";
//const dorado = "#EFC437";//centralizando
const dorado = "#CAA345"; //centralizando
const rojo = "#DD4A48"; //centralizando
const verde = "#519259"; //centralizando

//dark: "rgb(35, 49, 60)";
//light: "rgb(91, 107, 119)";

const theme = createTheme({
  //aqui estan las configuraciones predeterminadas que podemos sobreescribir
  //theme se usa para centralizar los estilos y crear una apariencia consistente
  palette: {
    common: {
      golden: `${dorado}`,
      gray: `${gris}`,
    },
    primary: {
      main: `${gris}`,
    },
    secondary: {
      main: `${dorado}`,
    },
    error: {
      main: `${rojo}`,
    },
    success: {
      main: `${verde}`,
    },
  },
  typography: {
    // tab: {
    //   fontFamily: "Raleway",
    //   textTransform: "none",
    //   fontSize: "1.5rem",
    //   fontWeight: 700,
    // },
  },
  fuente: {
    fontFamily: "Raleway",
  },
});

export default theme;
