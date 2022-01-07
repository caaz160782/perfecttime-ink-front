
import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import EditCustomizedDialogs from "../../Components/staff/EditModalForm";
import MediaCard from "../../Components/staff/CardStaff";
import useStyles from "./style";
import { Typography, Container, Button, Link} from "@mui/material";
import NextLink from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const oneStaff = ({ staffMember }) => {
  console.log('este est!',staffMember);
  const router = useRouter();
  const { id } = router.query;
  console.log('el id es',id);
  const classes = useStyles()

  return (
    <Layout>
      <Container align="center" maxWidth={600}>

        <MediaCard classes={classes} staffMember={staffMember}></MediaCard>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps (ctx) {
    const clienteConsulta = await clienteAxios.get(`/staff/${ctx.query.id}`);
    const staffMember = clienteConsulta.data.listUser.userFound;
    console.log(clienteConsulta.data.listUser.userFound);
   return { props: { staffMember } };
 };

export default oneStaff;

// export async function getServerSideProps(ctx) {
//   const res = await fetch(`http://localhost:8000/staff/${ctx.query.id}`);
//   const resJSON = await res.json();

//   return {
//     props: {
//       user: resJSON.userFound,
//     },
//   };
// }
