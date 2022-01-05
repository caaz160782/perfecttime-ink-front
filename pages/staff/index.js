import Layout from "../../Components/Layout";
import Image from "next/image";
import CustomizedDialogs from "../../Components/staff/ModalForm"

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

const Staff = () => {
  const classes = useStyles();
 let source = axios.CancelToken.source();
 const [staff, setStaff] = useState([])
 const [loading, setLoading] = useState(true);

  useEffect(
    () => {

        const consultarAPI = async () => {
          try {
            const respuesta = await clienteAxios.get(
              "/staff",
              {
                cancelToken: source.token,
              }
              // , {
              //   // headers: {
              //   //   Authorization: `Bearer ${auth.token}`,
              //   // },
              //   //
              // }
            );
            const staffArray = respuesta.data.listUser.users;
            setStaff(staffArray);
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
          <CustomizedDialogs classes={classes}></CustomizedDialogs>


          {staff.map((x) => {
            return (
              <ul>
                <li>{`nombre completo: ${x.name} ${x.lastName} email: ${x.email}`}</li>
                <Button onClick={(e) => Router.push(`/staff/${x._id}`)}>
                  editar
                </Button>
                <Button className={classes.eliminar}>eliminar</Button>
              </ul>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Staff;
