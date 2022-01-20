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
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia,
} from "@mui/material";
import useStyles from "../Components/landing/style.js";
// import Image from '../public/images/backgroundtest.jpg'
// import useStyles from '../Components/landing/style.js'

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Container>
        {/* <Box>
            <Card>
              <FiCard className={classes.hero}>
                  <FiCardMedia
                    media="picture"
                    alt="background"
                    image="/images/background.jpg"
                    title="background"
                  />
                <FiCardContent className={classes.title}>
                  <Typography gutterBottom variant="h2" component="h2">
                    Bienvenido a la mejor opcion de control de agenda para tatuajes
                  </Typography>
                </FiCardContent>
                <FiCardActions>
                  <Button className={classes.btn} variant="contained" color="primary" href="/servicios">
                    Conoce mas de nuestros servicios
                  </Button>
                </FiCardActions>
              </FiCard>
            </Card>
          </Box> */}

        <Box className={classes.hero}>
          <Typography variant="h2">
            {" "}
            Bienvenido a la mejor opcion de control de agenda para tatuajes
          </Typography>

          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            href="/servicios"
          >
            Conoce mas de nuestros servicios
          </Button>
        </Box>
        <Box maxWidth="lg" className={classes.blogsContainer}>
          <Typography variant="h4" className={classes.blogsTitle}>
            Por que elegir Perfect Time INK?
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item sm={12} md={6}>
              <Typography variant="body1">
                Perfect Time INK es una aplicación que busca acompañar al
                usuario en el proceso de la realización de un tatuaje,
                facilitando el proceso para agendar una cita, dándole a conocer
                de manera sencilla y detallada las obras del tatuador con quien
                desea trabajar, brindando las condiciones sanitarias en las que
                se encuentra el estudio, todo esto, con la finalidad de eliminar
                miedos y dar la confianza de que el servicio que se le esta
                brindando sea de la mejor calidad, y claro, esperando que vuelva
                con nosotros en repetidas ocasiones.
              </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <img
                src="https://marvel-b1-cdn.bc0a.com/f00000000107635/daysmart-bodyart.imgix.net/uploads/2019/07/tiptattooartists.jpg?ar=1%3A0.75&auto=format%2Ccompress&crop=center&fit=crop&q=85&w=600"
                className={classes.imgCard}
              ></img>
            </Grid>
          </Grid>
        </Box>
        <Box maxWidth="lg" className={classes.blogsContainer}>
          <Typography variant="h4" className={classes.blogsTitle}>
            Contactanos
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={12}
          >
            <Grid item sm={12} md={6}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  alt="studioTatoo"
                  height="140"
                  image="https://i.pinimg.com/736x/77/88/e5/7788e5d43f2903cf60e04290ef049187.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Tienes un estudio de Tatuaje?
                  </Typography>
                  <Typography variant="body2">
                    Descubre porque Perfect Time Ink es la mejor herramienta
                    para llevar un control de tu agenda
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className={classes.cardBtn}
                    variant="contained"
                    color="primary"
                  >
                    Mas informacion
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={12} md={6}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  alt="studioTatoo"
                  height="140"
                  image="https://d16myyh7jc1kpd.cloudfront.net/mx/business_placeholders/tatuajes-07c9c673c3ec4fc6b99121d93e2b50ce.tattoo-artists"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Deseas hacerte un tatuaje?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Descubre lo sencillo que es agendar una cita en nuestro
                    sistema
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    href="/estudios-inscritos"
                    className={classes.cardBtn}
                    variant="contained"
                    color="primary"
                  >
                    Mas informacion
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

/*
 <img
              src="https://marvel-b1-cdn.bc0a.com/f00000000107635/daysmart-bodyart.imgix.net/uploads/2019/07/tiptattooartists.jpg?ar=1%3A0.75&auto=format%2Ccompress&crop=center&fit=crop&q=85&w=600"
              className={classes.imgCard}
            ></img>
            */
