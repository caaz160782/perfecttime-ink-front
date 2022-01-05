import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

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

  // ingresar:{
  //   fontFamily:theme.typography.fuente
  // }
}));

export default useStyles;
