import Layout from "../../Components/Layout";
import Image from "next/image";
import CustomizedDialogs from "../../Components/staff/ModalForm"
import CustomPaginationActionsTable from "../../Components/staff/Table";
import SearchIcon from "@mui/icons-material/Search";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Router from 'next/router'

import {
  List,
  ListItem,
  //Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Grid,
  Snackbar,
} from "@mui/material";

import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../utils/axios";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import axios from "axios";
import CustomizedInputBase from "../../Components/staff/Busqueda";

const Staff = () => {
  const classes = useStyles();
 let source = axios.CancelToken.source();
 const [staff, setStaff] = useState([])
 const [staffMentira, setStaffMentira] = useState([])
 const [loading, setLoading] = useState(true);
 
 
   const handleChangeBusqueda = ({ target }) => {
     filtrar(target.value);
     console.log(target.value);
   };
   const filtrar = (terminoBusqueda) => {
     var resultadosBusqueda = staffMentira.filter((elemento) => {
       console.log(elemento.name);
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
            const respuesta = await clienteAxios.get(
              "/staff",
              {
               // cancelToken: source.token,
              }
               , {
               /*  headers: {
                   //Authorization: `Bearer ${auth.token}`,
                   apitoken:
                  },*/
 
               }
            );
            console.log(respuesta)
            const staffArray = respuesta.data.listUser.users;
            setStaff(staffArray);
            setStaffMentira(staffArray)
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        consultarAPI();
      }
    ,
    () => {
      console.log("desmontar");
      source.cancel();
    },
    [staff]
  );

  //const staffMember
    // const buscarPorId = async (id) => {
    //   const clienteConsulta = await clienteAxios.get(`/staff/${id}`);
    //   staffMember = clienteConsulta.data.listUser.userFound;
    //  // console.log(clienteConsulta.data.listUser.userFound);
    // };
  return (
    <Layout title={"staff"}>
      {loading ? (
        <Typography>loading...</Typography>
      ) : (
        <div>
          <div align="center">
            <CustomizedInputBase
              handleChangeBusqueda={handleChangeBusqueda}
            ></CustomizedInputBase>
          </div>

          <CustomizedDialogs classes={classes}></CustomizedDialogs>
          <CustomPaginationActionsTable
            staff={staff}
          ></CustomPaginationActionsTable>

          {/* {staff.map((x) => {
            return (
              <ul>
                <li>{`nombre completo: ${x.name} ${x.lastName} email: ${x.email}`}</li>
                <Button onClick={(e) => Router.push(`/staff/${x._id}`)}>
                  editar
                </Button>
                <Button className={classes.eliminar}>eliminar</Button>
              </ul>
            );
          })} */}
        </div>
      )}
    </Layout>
  );
};

export default Staff;
