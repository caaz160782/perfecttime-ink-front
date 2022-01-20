import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    title:{
        display: "flex",
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
        flexWrap: "wrap",
        textAlign: "center",
        fontWeight: "800",

      },

    gallery:{
        WebkitColumnCount: 3,
        MozColumnCount:3,
        columnCount:3,
        WebkitColumnWidth:'33%',
        columnWidth:'33%',
        padding:'0px 10px',
        [theme.breakpoints.down('md')]:{
            WebkitColumnCount: 2,
            MozColumnCount:2,
            columnCount:2,
        },
        
        [theme.breakpoints.down('sm')]:{
            WebkitColumnCount: 1,
            MozColumnCount:1,
            columnCount:1,
            WebkitColumnWidth:'100%',
            columnWidth:'100%',
        }

    },

    pics:{
        cursor: 'pointer',
        marginBottom: '10px'
    },

    picture:{
        width: '100%',
        "&:hover": {
            opacity:0.8,
          },
    },

    model:{
        width: '100%',
        height:"100vh",
        position: 'fixed',
        top:0, 
        left:0, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgb(0, 0, 0)",
        visibility: 'hidden',
        opacity:0, 
        scaleTransform:0,
        overflow:'hidden',
        zIndex:999,
    },

    zoomin:{
        visibility: 'visible',
        opacity:1, 
        scaleTransform:1,
    },

    modelpic: {
        width:'auto',
        maxWidth:'100vh',
        height:'auto',
        maxHeight:'100%',
        display:'block',
        lineHeight:0, 
        boxSizing: 'border-box',
        padding: '20px 0px 20px',
        margin: '0 auto',
        backgroundColor:"rgb(0, 0, 0)",
    },

    svg:{
        position:'fixed',
        top: '10px', 
        right: '10px',
        width: '2rem',
        height: '2rem',
        padding: '5px',
        backgroundColor:'rgba(0,0,0,0.4)',
        color: '#ffffff',
        cursor: 'pointer'
    }


}));

export default useStyles;
