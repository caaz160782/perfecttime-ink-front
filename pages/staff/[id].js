import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import EditCustomizedDialogs from "../../Components/staff/EditModalForm";
import MediaCard from "../../Components/staff/CardStaff";
import { Typography, Container, Button, Link } from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const oneStaff = () => {
  const useStyles = makeStyles((theme) => ({
    btnLogin: {
      color: "#fff",
      fontFamily: "Pacifico",
      textTransform: "none",
      fontSize: "1.6rem",
    },
    imgBack: {
      border: "3px solid red",
    },
    spanes: {
      textTransform: "none",
      fontSize: "0.8rem",
    },
    foto: {
      border: "2px solid rgb(173, 173, 173)",
    },
    fotoContainer: {
      backgroundColor: "rgb(123, 136, 146)",
    },
  }));
  const classes = useStyles();

  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;
  console.log("el id es", id);
  const [staffMember, setStaffMember] = useState({});
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      const consultarAPI = async () => {
        try {
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
      setReload(false);
    }
    return () => {
      console.log("desmontar");
      // source.cancel();
    };
  }, [reload]);

  return (
    <Layout>
      <Container align="center" maxWidth={600}>
        {loading ? (
          <div align="center">
            <CircularProgress size={40}></CircularProgress>
          </div>
        ) : (
          <MediaCard
            atras={"/staff"}
            classes={classes}
            staffMember={staffMember}
            reload={() => {
              setReload(true);
            }}
          ></MediaCard>
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
