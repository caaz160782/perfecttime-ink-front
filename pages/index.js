import Image from "next/image";
import backIma from "../public/images/background.jpg";
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
} from "@mui/material";
import useStyles from "../Components/landing/style.js";
// import Image from '../public/images/backgroundtest.jpg'
// import useStyles from '../Components/landing/style.js'

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.Container} />
    </>
  );
}
