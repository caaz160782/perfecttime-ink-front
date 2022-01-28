import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import clienteAxios from "../../utils/axios";
import { useRouter } from "next/router";
import { Snackbar, CircularProgress, Box } from "@mui/material";

const FrmAgenda = () => {
  const { auth } = useContext(AuthContext);
  const [config, setConfig] = useState({});
  const [reload, setReload] = useState("true");
  const router = useRouter();
  const paymentId = router.query.payment_id ? router.query.payment_id : "";
  const [reloadDate, setReloadDate] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  useEffect(() => {
    if (paymentId !== "") {
      clienteAxios
        .post(`/feedback`, { paymentId })
        .then((response) => {
          setReloadDate(true);
          setAlert({
            open: true,
            message: "anticipo recibido",
            backgroundColor: "#519259",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router]);

  useEffect(() => {
    if (reload) {
      clienteAxios
        .get(`/findStudiSetting/${auth.infoStudio.id}`, {})
        .then((response) => {
          setConfig(response.data.payload);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    }
    setReload(false);
  }, []);

  if (Object.keys(config).length !== 0) {
    const { timeToOpen, timeToClose, dayNotAvailables } = config;
    let dayNum = [];
    if (dayNotAvailables.length !== 0) {
      dayNotAvailables.forEach((days) => {
        if (days === "Domingo") {
          dayNum.push(0);
        }
        if (days === "Lunes") {
          dayNum.push(1);
        }
        if (days === "Martes") {
          dayNum.push(2);
        }
        if (days === "Miercoles") {
          dayNum.push(3);
        }
        if (days === "Jueves") {
          dayNum.push(4);
        }
        if (days === "Viernes") {
          dayNum.push(5);
        }
        if (days === "Sabado") {
          dayNum.push(6);
        }
        dayNum;
      });
    }

    return (
      <div>
        <Snackbar
          open={alert.open}
          style={{ height: "100%" }}
          message={alert.message}
          ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setAlert({ ...alert, open: false })}
          autoHideDuration={4000}
        />
        <Calendar
          timeToOpen={timeToOpen}
          timeToClose={timeToClose}
          dayNotAvailables={dayNum}
          reloadDate={reloadDate}
          setReloadDate={setReloadDate}
        />
      </div>
    );
  } else {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
};
export default FrmAgenda;
