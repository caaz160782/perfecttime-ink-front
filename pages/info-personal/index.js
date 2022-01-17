import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import EditCustomizedDialogs from "../../Components/staff/EditModalForm";

//import MediaCard from "../../Components/client/CardStaff";
import MediaCard from "../../Components/infoPersonal/CardStaff";
//import useStyles from "./style";
import { Typography, Container, Button, Link } from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "../../Context/AuthContext";
import { makeStyles } from "@mui/styles";
import { set } from "date-fns/esm";
import { CircularProgress } from "@mui/material";

const InfoPersonal = () => {
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
      // color: theme.palette.secondary.dark,
      // fontFamily: "Pacifico",
      textTransform: "none",
      fontSize: "0.8rem",
    },
    foto: {
      //border: "6px solid rgb(173, 173, 173)",
    },
    fotoContainer: {
      backgroundColor: "red",
    },
    // ingresar:{
    //   fontFamily:theme.typography.fuente
    // }
  }));
  const classes = useStyles();
  //const [valToken, setToken] = useLocalStorage("userVal", "");
  const { auth, guardarAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const router = useRouter();
  // const { id } = router.query;
  console.log("el id es", auth.infoUser._id);
  //const classes = useStyles();
  const [staffMember, setStaffMember] = useState({});

  useEffect(() => {
    if (reload) {
      const consultarAPI = async () => {
        // console.log("ryta", `/clientModified/${auth.infoUser._id}`);
        try {
          // const respuesta = await clienteAxios.get(`/staff/${id}`);
          const respuesta = await clienteAxios.get(
            `/clientModified/${auth.infoUser._id}`,
            {
              headers: { apitoken: auth.token },
            }
          );
          // console.log(respuesta.data);
          setStaffMember(respuesta.data.listClient.clientId);
          setReload(false);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      consultarAPI();
    }
    return () => {
      console.log("desmontar");
      // source.cancel();
    };
  }, [reload]);

  return (
    <div>
      <div>esta es mi cuenta</div>
      <Container align="center" maxWidth={600}>
        {loading ? (
          <div align="center">
            <CircularProgress size={40}></CircularProgress>
          </div>
        ) : (
          <MediaCard
            atras={"/"}
            classes={classes}
            staffMember={staffMember}
            role={"user"}
            reload={() => setReload(true)}
          ></MediaCard>
        )}
      </Container>
    </div>
  );
};

export default InfoPersonal;
