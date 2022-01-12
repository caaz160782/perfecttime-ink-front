import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

//console.log(theme.palette);
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
  spanes: {
    // color: theme.palette.secondary.dark,
    // fontFamily: "Pacifico",
    textTransform: "none",
    fontSize: "0.8rem",
  },
  foto: {
    //border: "6px solid rgb(173, 173, 173)",
  },
  fotoContainer: {
    backgroundColor: "#F8F8F8",
  },
  // ingresar:{
  //   fontFamily:theme.typography.fuente
  // }
}));

export default useStyles;
