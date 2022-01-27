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
    fontWeight: "500",
    marginLeft: "80px",
    "&:hover": {
      transition: "color 0.6s ease",
      //color: theme.palette.secondary.light,
      color: "rgb(123, 136, 146)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.4rem",
      marginLeft: "70px",
    },
  },
  btn: {
    //  color: "#fff",
    color: theme.palette.secondary.main,
    textTransform: "none",
    fontSize: "1.2rem",
    borderRadius: "15px",
    border: "1.7px solid",
    fontWeight: "450",
    marginRight: "30px",
    marginLeft: "80px",
    padding: "0px 15px",
    transition: "all 0.5s ease",
    "&:hover": {
      // textDecoration: `none`,
      color: theme.palette.secondary.light,
      // border: "2px solid",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.1rem",
      marginLeft: "65px",
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
    marginLeft: "80px",
    transition: "all 0.5s ease",
    "&:hover": {
      color: "rgb(123, 136, 146)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.4rem",
      marginLeft: "70px",
    },
  },
}));

export default useStyles;

// import { makeStyles } from "@mui/styles";
// import theme from "../../utils/temaConfig";

// const useStyles = makeStyles((theme) => ({
//   toolbarMargin: {
//     ...theme.mixins.toolbar,
//     marginBottom: "7em",
//   },
//   logo: {
//     height: "6em",
//     [theme.breakpoints.down("sm")]: {
//       height: "5.5em",
//     },
//   },
//   //DRAWER
//   drawer: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   drawerIconContainer: {
//     marginLeft: "auto",
//   },
//   drawerIcon: {
//     width: 40,
//     height: 40,

//     color: "#fff",
//   },
//   linkDrawer: {
//     //fontFamily: "Raleway",
//     color: "#fff",
//     fontWeight: 550,
//     fontSize: "1rem",
//     "&:hover": {
//       textDecoration: `underline ${theme.palette.secondary.dark}`,
//     },
//   },
//   linkDrawerLogin: {
//     padding: 0,
//     margin: 0,
//     textTransform: "none",
//     textDecoration: "none",
//     fontWeight: 550,
//     fontSize: "1.1rem",
//     color: "#fff",
//     "&:hover": {
//       color: theme.palette.secondary.light,
//       textDecoration: `underline ${theme.palette.primary.main}`,
//     },
//     transition: "color .8s",
//   },
//   loginContainer: {
//     //backgroundColor: "#EFC437",
//     backgroundColor: theme.palette.secondary.main,
//     //   alignItems: "left",
//     transition: "all .8s",
//   },
//   ///NAVEGACION
//   tabContainer: {
//     marginLeft: "auto",
//   },
//   tab: {
//     ...theme.typography.tab,
//     textDecoration: "none",
//     color: "#fff",
//     fontSize: "1.5rem",
//     marginLeft: "40px",
//     "&:hover": {
//       transition: "color 0.7s ease",
//       textDecoration: "underline #334756",
//       color: theme.palette.secondary.light,
//     },
//     [theme.breakpoints.down("lg")]: {
//       fontSize: "1.3rem",
//       marginLeft: "30px",
//     },
//   },
//   btn: {
//     color: "#fff",
//     textTransform: "none",
//     textDecoration: `underline ${theme.palette.primary}`,
//     fontSize: "1.5rem",
//     borderRadius: "30px",
//     marginLeft: "50px",
//     marginRight: "25px",
//     padding: "2px 20px",
//     "&:hover": {
//       textDecoration: `underline ${theme.palette.secondary.dark}`,
//     },
//     [theme.breakpoints.down("lg")]: {
//       fontSize: "1.3rem",
//       marginLeft: "40px",
//       marginRight: "20px",
//       padding: "2px 10px",
//     },
//   },
// }));

// export default useStyles;
