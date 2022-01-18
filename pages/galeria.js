// import React from 'react';
// import Layout from "../Components/Layout";
// import {
//    Typography,
//    TextField,
//    Box,
//    Button,
//    Grid,
//    ImageList 
//  } from "@mui/material";
//  import Image from 'next/image'
//  import theme from "../utils/temaConfig";
//  import { makeStyles } from '@material-ui/core/styles'
//  import Gallery from './galeria/gallery'
 
// const useStyles = makeStyles((theme) => ({
//    title:{
//       display: "flex",
//       justifyContent: "center",
//       flexDirection:"column",
//       alignItems: "center",
//       flexWrap: "wrap",
//       textAlign: "center",
//     },
// }));


// const srcset = (image, size, rows = 1, cols = 1) => {
//    return {
//      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//      srcSet: `${image}?w=${size * cols}&h=${
//        size * rows
//      }&fit=crop&auto=format&dpr=2 2x`,
//    };
//  };

// const Galeria = ()=>{
//    const classes = useStyles()
//    const imagen = {Gallery};
   
//    return(
//     <Layout title={'galeria'}>
//        <div>
//          <Box className={classes.title}>
//          <Typography variant="h2">
//               Galeria
//             </Typography>
//          </Box>
//          <ImageList
//       sx={{ width: 500, height: 450 }}
//       variant="quilted"
//       cols={4}
//       rowHeight={121}
//     >
//       {data.map((item) => (
//         <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
//           <img
//             {...srcset(item.img, 121, item.rows, item.cols)}
//             alt={item.title}
//             loading="lazy"
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//        </div>
//     </Layout>
//    )
// }
// export default Galeria