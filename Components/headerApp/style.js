import { makeStyles } from "@mui/styles";
import theme from "../../utils/temaConfig";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1em",
    },
  },
  logo: {
    height: "6em",
    borderRadius: "50%",
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
    "&:hover": {
      //color: theme.palette.secondary.light,
    },
  },
  linkDrawer: {
    // fontFamily: "Raleway",
    color: "#fff",
    fontWeight: 550,
    fontSize: "1rem",
    "&:hover": {
      textDecoration: `underline ${theme.palette.primary.main}`,
    },
  },
  activeDrawer: {
    // fontFamily: "Raleway",
    color: theme.palette.secondary.light,
    //color: "#fff",
    fontWeight: 550,
    fontSize: "1rem",
    "&:hover": {
      textDecoration: `underline ${theme.palette.primary.main}`,
    },
  },
  linkDrawerLogin: {
    padding: 0,
    margin: 0,
    textTransform: "none",
    fontWeight: 550,
    fontSize: "1rem",
    color: "#fff",
    "&:hover": {
      textDecoration: `underline ${theme.palette.secondary.dark}`,
    },
    transition: "color .8s",
  },
  loginContainer: {
    backgroundColor: theme.palette.secondary.main,
    transition: "background-color .8s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      // color: theme.palette.primary.dark,
    },
  },
  ///NAVEGACION
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    // ...theme.typography.tab,
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginLeft: "40px",
    "&:hover": {
      transition: "color 0.7s ease",
      color: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.2rem",
      marginLeft: "20px",
    },
  },
  btn: {
    color: "#fff",
    textTransform: "none",
    fontSize: "1.4rem",
    borderRadius: "15px",
    marginLeft: "20px",
    marginRight: "25px",
    padding: "1px 15px",
    "&:hover": {
      textDecoration: `none`,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.1rem",
      marginLeft: "15px",
      marginRight: "20px",
      padding: "2px 10px",
    },
  },
  active: {
    //...theme.typography.tab,
    color: "#fff",
    textDecoration: "underline",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginLeft: "40px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.2rem",
      marginLeft: "20px",
    },
  },
  admon: {
    color: "#fff",
    "&:hover": {
      textDecoration: `none`,
    },
  },
  activeAdmon: {
    color: "#fff",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: `none`,
    },
  },
}));

export default useStyles;
