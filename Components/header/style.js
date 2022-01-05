import { makeStyles } from "@material-ui/core";
import theme from "../../utils/temaConfig";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "7em",
  },
  logo: {
    height: "7em",
    [theme.breakpoints.down("sm")]: {
      height: "5em",
    },
  },
  //DRAWER
  drawer: {
    backgroundColor: theme.palette.secondary.dark,
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
    // color: "#fff"
  },
  linkDrawer: {
    fontFamily: "Raleway",
    color: "#fff",
    fontWeight: 550,
    fontSize: "1.3rem",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  linkDrawerLogin: {
    fontFamily: "Pacifico",
    fontSize: "1.5rem",
    color: "#fff",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
  },
  loginContainer: {
    backgroundColor: "#EFC437",
  },
  ///NAVEGACION
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    color: "#000",
    marginLeft: "40px",
    "&:hover": {
      transition: "color 0.7s ease",
      textDecoration: "underline #F8F8F8",
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down("md")]: {},
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
    [theme.breakpoints.down("sm")]: {},
  },
}));


export default useStyles;
