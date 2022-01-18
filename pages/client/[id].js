import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import EditCustomizedDialogs from "../../Components/staff/EditModalForm";
import MediaCard from "../../Components/client/CardStaff";
import { Typography, Container, Button, Link } from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
//import { useLocalStorage } from "../../hooks/useLocalStorage";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const OneStaff = () => {
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

  //const [valToken, setToken] = useLocalStorage("userVal", "");
  const { auth, guardarAuth, logOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const [staffMember, setStaffMember] = useState({});
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      console.log(id);
      const consultarAPI = async () => {
        try {
          const respuesta = await clienteAxios.get(`/clientAdmin/${id}`, {
            // headers: { apitoken: valToken.token },
            headers: { apitoken: auth?.token },
          });
          console.log("respuesta*************", respuesta.data.listClient);
          setStaffMember(respuesta.data.listClient.clientId);
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
    <div>
      <Container align="center" maxWidth={600}>
        {loading ? (
          <div align="center">
            <CircularProgress size={40}></CircularProgress>
          </div>
        ) : (
          <MediaCard
            atras={"/client"}
            classes={classes}
            staffMember={staffMember}
            reload={() => {
              setReload(true);
            }}
          ></MediaCard>
        )}
      </Container>
    </div>
  );
};

//  export async function getServerSideProps (ctx) {
//      const clienteConsulta = await clienteAxios.get(`/staff/${ctx.query.id}`);
//      const staffMember = clienteConsulta.data.listUser.userFound;
//      console.log(clienteConsulta.data.listUser.userFound);
//     return { props: { staffMember } };
//   };

export default OneStaff;
