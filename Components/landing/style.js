import { makeStyles } from '@mui/styles'
import backIma from '../../public/images/background.jpg'

const useStyles = makeStyles((theme) => ({

  Container:{
    width:'100%',
    padding:"0",
    margin:"0",
  },

  hero: {
    backgroundImage:`url(/images/background.jpg)`,
    opacity:0.8,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height:'500px',
    position: "relative",
    marginLeft:'0',
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems: "center",
    flexWrap: "wrap",
    textAlign: "center",
    color:"#fff",
    fontWeight:"bold",
    minWidth:"100%",
    [theme.breakpoints.down('md')]:{
      height:'400px',
    },
    [theme.breakpoints.down('sm')]:{
      height:'300px',
  }
  },


  Title:{
    fontSize:70,
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems: "center",
    flexWrap: "wrap",
    textAlign: "center",
    fontWeight: "400",
    [theme.breakpoints.down('md')]:{
      height:'200px',
      fontSize:50
    },
    [theme.breakpoints.down('sm')]:{
      height:'150px',
      fontSize:30
    },
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
    [theme.breakpoints.down('sm')]:{
      width:'200px',
      height:'50px',
      padding: "0",
      fontSize:14,
    },
  },
  imgGrid: {
    textAlign: "center",
  },

  imgCard:{
    maxHeight: "300px",
    maxWidth: "400px",
    borderRadius: 16,
    
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
