import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import MediaCard from "../../Components/client/CardStaff";
import Detalle from "../../Components/client/DetalleC";
import { useState, useEffect, useContext } from "react";
import { Container, Button, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

import { AuthContext } from "../../Context/AuthContext";

const OneStaff = () => {
  const useStyles = makeStyles(() => ({
    btnRegister: {
      color: "#fff",
      textTransform: "none",
      fontSize: "1.4rem",
    },
    spanes: {
    // textTransform: "none",
    // fontSize: "0.8rem",
    },
    foto: {
      border: "2px solid rgb(173, 173, 173)",
    },
    fotoContainer: {
      backgroundColor: "rgb(123, 136, 146)",
    },
  }));
  const classes = useStyles();
  const { auth, guardarAuth, logOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const [staffMember, setStaffMember] = useState({});
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      const consultarAPI = async () => {
        try {
          const respuesta = await clienteAxios.get(`/clientAdmin/${id}`, {
            headers: { apitoken: auth?.token },
          });
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
      <Container align="center" maxWidth={"600"}>
        {loading ? (
          <div align="center">
            <CircularProgress size={40}></CircularProgress>
          </div>
        ) : (
          <Detalle
            atras={"/client"}
            classes={classes}
            staffMember={staffMember}
            reload={() => {
              setReload(true);
            }}
          ></Detalle>
        )}
      </Container>
    </div>
  );
};

export default OneStaff;
