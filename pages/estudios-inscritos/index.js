import clienteAxios from "../../utils/axios";
import CardStudio from "../../Components/nuestrosEstudios/CardStudio";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const EstudiosInscritos = ({ estudios }) => {
  console.log(estudios);
  return (
    <>
      <form action="http://localhost:8000/checkout" method="post">
        <input type="hidden" name="price" value="2500" />
        <input type="hidden" name="title" value="el mejor tatuaje " />
        <Button type="submit" value="comprar">
          {" "}
          pagar
        </Button>
      </form>

      <Box color="secondary" sx={{ flexGrow: 1 }}>
        <Grid spacing={4} container>
          {/* <Grid item md={4}></Grid> */}
          {estudios.map((x) => (
            <CardStudio study={x}></CardStudio>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default EstudiosInscritos;

export async function getServerSideProps(ctx) {
  const response = await clienteAxios.get(`/allStudio`);
  const estudios = response.data.listUser.studioFound;
  //  console.log("------**********************", estudios);
  // const staffMember = clienteConsulta.data.listUser.userFound;
  return { props: { estudios } };
}
