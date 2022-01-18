
// import useStyles from "./landing/style.js"
import { makeStyles } from '@material-ui/core/styles'
// import useStyles from '../Components/landing/style.js' 

const useStyles = makeStyles((theme) => ({

    hero: {
        // minheight: '100vh',
        // backgroundImage:`url(${Image})`,
        height:'500px',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        // // backgroundImage:`url(${Image})`,
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
        flexWrap: "wrap",
        textAlign: "center",
        // color:"#fff",
    },

    btn: {
      color: "#fff",
      fontFamily: "Pacifico",
      textTransform: "none",
      fontSize: "1.6rem",
      borderRadius: "40px",
      // marginLeft: "50px",
      marginTop: "25px",
      padding: "10px 20px",
      "&:hover": {
        textDecoration: `underline ${theme.palette.primary.dark}`,
      },
    },

    imgCard:{
      maxHeight: "300px",
      maxWidth: "400px",
      borderRadius: 16
    },

    blogsContainer:{
      paddingTop:"10px",
      marginBottom:"50px"
    },

    blogsTitle:{
      textAlign: "center",
      fontWeight: "800",
      marginBottom:"50px"
    },

    card:{
      maxWidth:"400px",
      height:"auto",
      boxShadow:3,
      display: "flex",
      justifyContent: "center",
      flexDirection:"column",
      alignItems: "center",
      flexWrap: "wrap",
      textAlign: "center",
    },

    cardBtn:{
      color: "#fff",
      fontFamily: "Pacifico",
      textTransform: "none",
      fontSize: "1rem",
      borderRadius: "40px",
      marginBottom: "20px",
      // marginLeft: "50px",
      // marginTop: "25px",
      padding: "5px 10px",
      "&:hover": {
        textDecoration: `underline ${theme.palette.primary.dark}`,
      },
    }
    
}));

export default useStyles;