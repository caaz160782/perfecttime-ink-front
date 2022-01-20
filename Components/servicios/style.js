import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    title:{
      display: "flex",
      justifyContent: "center",
      flexDirection:"column",
      alignItems: "center",
      flexWrap: "wrap",
      textAlign: "center",
    },
    blogsTitle:{
      textAlign: "center",
      fontWeight: "800",
      marginBottom:"50px"
    },
    blogsContainer:{
      paddingTop:"10px",
      marginBottom:"50px"
    },
    btn: {
      color: "#fff",
      fontFamily: "Pacifico",
      textTransform: "none",
      fontSize: "1.6rem",
      borderRadius: "40px",
      marginTop: "25px",
      padding: "10px 20px",    
    },
    boxcont:{
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      flexDirection:"column",
      alignItems: "center",
      flexWrap: "wrap",
      textAlign: "center"
    }
  
  }));
  
  export default useStyles;