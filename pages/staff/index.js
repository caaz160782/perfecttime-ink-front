import Layout from "../../Components/Layout";
import CustomizedDialogs from "../../Components/staff/ModalForm";
import CustomPaginationActionsTable from "../../Components/staff/Table";

import { CircularProgress } from "@mui/material";

import clienteAxios from "../../utils/axios";
//import useStyles from "./style";
import { useState, useEffect } from "react";

import axios from "axios";
import CustomizedInputBase from "../../Components/staff/Busqueda";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const Staff = () => {
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
      fontSize: "2.8rem",
    },
    foto: {
      border: "6px solid rgb(173, 173, 173)",
    },
    fotoContainer: {
      backgroundColor: "rgb(123, 136, 146)",
    },
  }));
  const classes = useStyles();

  //const [valToken, setToken] = useLocalStorage("userVal", "");
  const { auth, guardarAuth, logOut } = useContext(AuthContext);

  let source = axios.CancelToken.source();
  const [staff, setStaff] = useState([]);
  const [staffMentira, setStaffMentira] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const handleChangeBusqueda = ({ target }) => {
    filtrar(target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = staffMentira.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });

    setStaff(resultadosBusqueda);
  };

  useEffect(() => {
    if (reload) {
      setLoading(true);
      const consultarAPI = async () => {
        //const idStudioStored = localStorage.getItem("userVal");
        // const idStudio = JSON.parse(idStudioStored);
        try {
          const respuesta = await clienteAxios.get(
            `/findStaffByStudy/${auth.infoStudio.id}`,
            // `/findStaffByStudy/${idStudio.infoStudio.id}`,
            {
              headers: { apitoken: auth.token },
            }
          );

          const staffArray = respuesta.data.payload;
          setStaff(staffArray);
          setStaffMentira(staffArray);
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
      source.cancel();
    };
  }, [reload]);

  return (
    <div>
      {loading ? (
        <div align="center">
          <CircularProgress size={40}></CircularProgress>
        </div>
      ) : (
        <div>
          <div align="center" style={{ margin: "20px" }}>
            <CustomizedInputBase handleChangeBusqueda={handleChangeBusqueda} />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <CustomizedDialogs
              staff={staff}
              md={{ m: 2 }}
              classes={classes}
              reload={() => {
                setReload(true);
              }}
            />
          </div>

          <CustomPaginationActionsTable
            staff={staff}
            reload={() => {
              setReload(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Staff;
