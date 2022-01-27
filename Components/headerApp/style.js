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
    //    marginLeft: "2px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    //border: "2px solid red",
  },
  tab: {
    // ...theme.typography.tab,
    textDecoration: "none",
    //color: "rgb(123, 136, 146)",
    color: "#fff",
    fontSize: "1.4rem",
    fontWeight: "600",
    marginLeft: "50px",
    "&:hover": {
      transition: "color 0.6s ease",
      //color: theme.palette.secondary.light,
      color: "rgb(123, 136, 146)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.3rem",
      marginLeft: "20px",
    },
  },
  btn: {
    //  color: "#fff",
    color: theme.palette.secondary.main,
    textTransform: "none",
    fontSize: "1.2rem",
    borderRadius: "15px",
    border: "1.7px solid",
    marginLeft: "20px",
    fontWeight: "450",
    marginRight: "20px",
    padding: "0px 15px",
    transition: "all 0.5s ease",
    "&:hover": {
      // textDecoration: `none`,
      color: theme.palette.secondary.light,
      // border: "2px solid",
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
    // color: "#03a9f4",
    color: "#fff",
    textDecoration: "underline",
    fontWeight: "600",
    fontSize: "1.4rem",
    marginLeft: "50px",
    "&:hover": {
      color: "rgb(123, 136, 146)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.2rem",
      marginLeft: "20px",
    },
  },
  admon: {
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "px",
    // marginLeft: "5px",
    marginRight: "20px",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    "&:hover": {
      color: "rgb(123, 136, 146)",
      textDecoration: `none`,
    },
  },
  admonIcon: {
    color: "#fff",
    marginLeft: "40px",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "10px",
    },
  },
  activeAdmon: {
    color: "#fff",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: `none`,
    },
  },
  imgUrl: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    border: "2px solid rgb(91, 107, 119)",
  },
}));

export default useStyles;
