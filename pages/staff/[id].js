import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import EditCustomizedDialogs from "../../Components/staff/EditModalForm";
import MediaCard from "../../Components/staff/CardStaff";
import useStyles from "./style";
import { Typography, Container, Button, Link } from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const oneStaff = () => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;
  console.log("el id es", id);
  const classes = useStyles();
  const [staffMember, setStaffMember] = useState({});

  useEffect(
    () => {
      const consultarAPI = async () => {
        try {
         // const respuesta = await clienteAxios.get(`/staff/${id}`);
          const respuesta = await clienteAxios.get(`/staff/${id}`, {
            headers: { apitoken: valToken.token },
          });

          setStaffMember(respuesta.data.listUser.userFound);
         setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      consultarAPI();
    },
    () => {
      console.log("desmontar");
      source.cancel();
    },
    [staffMember]
  );

  return (
    <Layout>
      <Container align="center" maxWidth={600}>
        {loading ? (
          <Typography>loading...</Typography>
        ) : (
          <MediaCard atras={"/staff"} classes={classes} staffMember={staffMember}></MediaCard>
        )}
      </Container>
    </Layout>
  );
};

//  export async function getServerSideProps (ctx) {
//      const clienteConsulta = await clienteAxios.get(`/staff/${ctx.query.id}`);
//      const staffMember = clienteConsulta.data.listUser.userFound;
//      console.log(clienteConsulta.data.listUser.userFound);
//     return { props: { staffMember } };
//   };

export default oneStaff;

