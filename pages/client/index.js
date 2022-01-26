import CustomizedDialogs from "../../Components/client/ModalForm";
import CustomPaginationActionsTable from "../../Components/client/Table";
import { CircularProgress, Typography } from "@mui/material";
import clienteAxios from "../../utils/axios";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomizedInputBase from "../../Components/staff/Busqueda";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import Switches from "../../Components/client/SwitchStatus";

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
  const { auth, guardarAuth, logOut } = useContext(AuthContext);
  let source = axios.CancelToken.source();
  const [staff, setStaff] = useState([]);
  const [staffMentira, setStaffMentira] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  //let staffFirst = [];
  let staffInact = [];
  let staffAct = [];

  const [switchStatus, setSwitchStatus] = useState(false);

  const handleChangeBusqueda = ({ target }) => {
    filtrar(target.value);
  };
  const filtrar = (terminoBusqueda) => {
    if (!switchStatus) {
    var resultadosBusqueda = staffMentira.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) &&
        elemento.statusUser
      ) {
        console.log("elemento", elemento, switchStatus)
        return elemento;
      }
    });
  } else {
    var resultadosBusqueda = staffMentira.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) &&
        !elemento.statusUser
      ) {
        console.log("elemento", elemento, switchStatus);
        return elemento;
      }
    });
  }
  
  setStaff(resultadosBusqueda);
};

  useEffect(() => {
    if (reload) {
      setLoading(true);
      const consultarAPI = async () => {
        //  console.log("respuesta de cleinte", auth.infoStudio.id);
        try {
          const respuesta = await clienteAxios.get(
            `/findClientByStudy/${auth?.infoStudio.id}`,
            // `/findStaffByStudy/${idStudio.infoStudio.id}`,
            {
              headers: { apitoken: auth?.token },
            }
          )
          //const staffArray = respuesta.data.payload;
          let staffFirst;
          setStaffMentira( respuesta.data.payload);
          if (!switchStatus) {
            staffFirst = respuesta.data.payload.filter(
              (x) => x.statusUser === true
            );
          } else {
            staffFirst = respuesta.data.payload.filter(
              (x) => x.statusUser === false
            );
          }

          setStaff(staffFirst);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      consultarAPI();
      setReload(false);
    }
    return () => {
      // console.log("desmontar");
      source.cancel();
    };
  }, [reload]);

  //const [switchStatus, setSwitchStatus] = useState(false);
  const verInactivos = () => {
    setSwitchStatus(!switchStatus);
    if (switchStatus) {
      const staffAct = staffMentira.filter((x) => x.statusUser === true);
      setStaff(staffAct);
    } else {
      const staffInact = staffMentira.filter((x) => x.statusUser !== true);
      setStaff(staffInact);
    }
  };

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

          <div 
            style={{ 
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomizedDialogs
              staff={staff}
              md={{ m: 2 }}
              classes={classes}
              reload={() => {
                setReload(true);
              }}
            />
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography color="primary">
                {!switchStatus ? "VER INACTIVOS" : "VER ACTIVOS"}
              </Typography>
              <Switches verInactivos={verInactivos} />
            </div>
          </div>

          <CustomPaginationActionsTable
            verInactivos={verInactivos}
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
