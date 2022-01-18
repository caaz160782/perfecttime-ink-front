import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "7em",
  },
  logo: {
    height: "6em",
    [theme.breakpoints.down("sm")]: {
      height: "5.5em",
    },
  },
  //DRAWER
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerIconContainer: {
    marginLeft: "auto",
  },
  drawerIcon: {
    width: 40,
    height: 40,

    color: "#fff",
  },
  linkDrawer: {
    //fontFamily: "Raleway",
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
    textDecoration: "none",
    fontWeight: 550,
    fontSize: "1.1rem",
    color: "#fff",
    "&:hover": {
      color: theme.palette.secondary.light,
      textDecoration: `underline ${theme.palette.primary.main}`,
    },
    transition: "color .8s",
  },
  loginContainer: {
    //backgroundColor: "#EFC437",
    backgroundColor: theme.palette.secondary.main,
    //   alignItems: "left",
    transition: "all .8s",
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
    textTransform: "none",
    textDecoration: `underline ${theme.palette.primary}`,
    fontSize: "1.5rem",
    borderRadius: "30px",
    marginLeft: "50px",
    marginRight: "25px",
    padding: "2px 20px",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
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
