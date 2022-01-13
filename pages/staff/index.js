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

const Staff = () => {
  //const classes = useStyles();

  const [valToken, setToken] = useLocalStorage("userVal", "");

  let source = axios.CancelToken.source();
  const [staff, setStaff] = useState([]);
  const [staffMentira, setStaffMentira] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(
    () => {
      const consultarAPI = async () => {
        try {
          const respuesta = await clienteAxios.get("/staff", {
            headers: { apitoken: valToken.token },
          });
          // console.log(respuesta);
          const staffArray = respuesta.data.listUser.users;
          setStaff(staffArray);
          setStaffMentira(staffArray);
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
    [staff]
  );

  return (
    <Layout title={"staff"}>
      {loading ? (
        <div align="center">
          <CircularProgress size={40}></CircularProgress>
        </div>
      ) : (
        <div>
          <div align="center" style={{ marginBottom: "20px" }}>
            <CustomizedInputBase
              handleChangeBusqueda={handleChangeBusqueda}
            ></CustomizedInputBase>
          </div>

          <div style={{ marginBottom: "20px", marginTop: "30px" }}>
            <CustomizedDialogs
              md={{ m: 2 }}
              // classes={classes}
            ></CustomizedDialogs>
          </div>

          <CustomPaginationActionsTable
            staff={staff}
          ></CustomPaginationActionsTable>
        </div>
      )}
    </Layout>
  );
};

export default Staff;
