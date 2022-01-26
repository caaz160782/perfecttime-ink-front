import Image from 'next/image';
import backIma from '../public/images/background.jpg'
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
import useStyles from '../Components/landing/style.js';
// import Image from '../public/images/backgroundtest.jpg'
// import useStyles from '../Components/landing/style.js'

export default function Home() {
  const classes = useStyles();
  return (
      <>
        <Container className={classes.Container}>       
          <Box className={classes.hero}>
            <Box >
              <Typography className={classes.Title}> Bienvenido a la mejor opcion de control de agenda para tatuajes</Typography>
              <Button className={classes.btn} variant="contained" color="primary" href="/servicios">
                Conoce mas de nuestros servicios
              </Button>
            </Box>
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
                Perfect Time INK es una aplicación que busca acompañar a los administradores de estudios de tatuaje en el control y organización de la agenda, brindándoles la visibilidad de todas las citas agendadas del estudio, dándoles un control de los miembros de su staff, y facilitando el registro de sus Clientes para un seguimiento de los trabajos realizados.
              </Typography>
              </Grid>
              <Grid item sm={12} md={6} className={classes.imgGrid}>
                <Image 
                  src="/images/tiptattooartists.webp"
                  height={300}
                  width={500}
                  alt="Tatuador"
                  className={classes.imgCard}

                ></Image>
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
                      Descubre porque Perfect Time Ink es la mejor herramienta para llevar un control de tu agenda
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className={classes.cardBtn} variant="contained" color="primary">Mas informacion</Button>
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
                      Descubre lo sencillo que es agendar una cita en nuestro sistema 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className={classes.cardBtn} variant="contained" color="primary">Mas informacion</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>  
      </>
  )
}

