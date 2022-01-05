import {
  makeStyles,
} from "@material-ui/core";
import theme from "../../utils/temaConfig"


const useStyles = makeStyles((theme) => ({
  btnLogin: {
    color: "#fff",
    fontFamily: "Pacifico",
    textTransform: "none",
    fontSize: "1.6rem",
  },
  imgBack: {
    border: "3px solid red",
  },
  eliminar: {
    color: theme.palette.error,
  },
  editar: {
    color: theme.palette.primary.dark,
  },

  // ingresar:{
  //   fontFamily:theme.typography.fuente
  // }
}));

export default useStyles