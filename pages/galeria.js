import React from "react";
import { Typography, Box } from "@mui/material";
import useStyles from "../Components/galeria/styles";
import Gallery from "../Components/galeria/gallery";
// import { muestras } from './galeria/gallery';

const Galeria = () => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.title}>
        {/* <Typography variant="h2">
               Galeria
            </Typography> */}
      </Box>
      <Gallery />
    </div>
  );
};

export default Galeria;
