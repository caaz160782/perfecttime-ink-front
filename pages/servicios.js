import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import useStyles from '../Components/servicios/style.js';
import Image from 'next/image'
import theme from "../utils/temaConfig";
// import backimg from "../public/images/hand.png";

const Servicios = () => {
  const classes = useStyles();
  return (
       <div>
          <Box className={classes.title}>
            <Typography variant="h2" className={classes.blogsTitle}>
              Nuestros servicios
            </Typography>
            {/* <Image 
              src="/hand.png" 
              width={500} 
              height={500}
            /> */}
          </Box>
          <Container maxWidth="lg" className={classes.blogsContainer}>
            <Grid 
                container
                direction="colunm"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
              <Grid item sm={12} md={6}>
                <Image 
                  src="/images/hand.png"
                  height="300px"
                  width="500px"
                  alt="hand"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="body1">
                  Perfect time Ink es una excelente herramienta de control de agenda, ya que todo se presenta de manera virtual, y es fácil de acceder a sus servicios, a través de cualquier dispositivo, brindando la opción a los dueños de estudios de tatuaje el control de su estudio al alcance de sus manos, 
                  Del lado de los tatuadores, les ayuda a llevar un mejor control de su tiempo mediante la visualización de su agenda completa, por mes, día o semana. 
                  Para los clientes ya registrados, les brinda la facilidad de agendar su cita de una manera más visual, mostrando los espacios disponibles para agendar su cita por cada tatuador, la plataforma les dará la opción de conocer el trabajo de los tatuadores mediante sus redes sociales, y darles recordatorios de sus citas activas.
                </Typography>
              </Grid>
            </Grid>
            <Box className={classes.boxcont}>
            <Typography variant="body2" className={classes.title}>
              Incia tu preoceso con nosotros aqui,
            </Typography>
            <Button className={classes.btn} variant="contained" color="primary" href="/servicios">
              Crear cuenta
            </Button>
            </Box>
          </Container>
       </div>  
   );
}
export default Servicios
