import { createTheme } from "@material-ui/core";

const dorado = "#EFC437";
const gris = "#F8F8F8";

const theme = createTheme({
  //aqui estan las configuraciones predeterminadas que podemos sobreescribir
  palette: {
    common:{
      golden:`${dorado}`,
      gray:`${gris}`,
    },
    primary: {
      main: `${dorado}`,
    },
    secondary: {
      main: `${gris}`
    },
  },
});

export default theme