import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "6em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "4em",
    },

  },
  logo: {
    height: "6em",
    [theme.breakpoints.down("sm")]: {
      height: "5.5em",
    },
  },
  //DRAWER
  drawer: {
    backgroundColor: theme.palette.primary.dark,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      //backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    width: 40,
    height: 40,

    color: "#fff",
  },
  linkDrawer: {
    fontFamily: "Raleway",
    color: "#fff",
    fontWeight: 550,
    fontSize: "1rem",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  linkDrawerLogin: {
    padding: 0,
    margin: 0,
    textTransform: "none",
    fontFamily: "Pacifico",
    fontSize: "1.1rem",
    color: "#fff",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  loginContainer: {
    //backgroundColor: "#EFC437",
    backgroundColor: "#CAA345",
    //   alignItems: "left",
  },
  ///NAVEGACION
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.5rem",
    marginLeft: "40px",
    "&:hover": {
      transition: "color 0.7s ease",
      // textDecoration: "underline #F8F8F8",
      textDecoration: "underline #334756",
      color: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.3rem",
      marginLeft: "30px",
    },
  },
  btn: {
    color: "#fff",
    fontFamily: "Pacifico",
    textTransform: "none",
    fontSize: "1.6rem",
    borderRadius: "40px",
    marginLeft: "50px",
    marginRight: "25px",
    padding: "2px 20px",
    "&:hover": {
      textDecoration: `underline ${theme.palette.primary.dark}`,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.3rem",
      marginLeft: "40px",
      marginRight: "20px",
      padding: "2px 10px",
    },
  },
}));

export default useStyles;
