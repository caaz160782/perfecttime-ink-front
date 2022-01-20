import { makeStyles } from '@mui/styles'
import backIma from '../../public/images/background.jpg'

const useStyles = makeStyles((theme) => ({

    container:{

    },
    hero: {
        minWidth:'100vh',
        backgroundImage:`url(${backIma})`,
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
    title:{
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,.24)"
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
