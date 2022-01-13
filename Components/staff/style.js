import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

console.log(theme.palette);
const usseStyles = makeStyles((theme) => ({
  imgBack: {
    border: "3px solid red",
  },
  spanes: {
    // color: theme.palette.secondary.dark,
    // fontFamily: "Pacifico",
    textTransform: "none",
    fontSize: "1.8rem",
  },
  foto: {
    //border: "6px solid rgb(173, 173, 173)",
  },
  fotoContainer: {
    //backgroundColor: "#F8F8F8",
    //backgroundColor: "rgb(91, 107, 119)",
    backgroundColor: "rgb(123, 136, 146)",
  },
  // ingresar:{
  //   fontFamily:theme.typography.fuente
  // }
}));

export default usseStyles;
