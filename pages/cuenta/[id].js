import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clienteAxios from "../../utils/axios";
import { Box, Snackbar } from "@mui/material";
import FrmPassword from "../../Components/password/FrmPassword";

const Password = () => {
  const router = useRouter();
  const { id } = router.query;
  const [verFrmPass, setFrmPass] = useState(false);
  const [hash, setHash] = useState({});
  const [dateNow, setDateNow] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    setDateNow({ diaHoy: new Date() });
    if (id !== undefined) {
      clienteAxios
        .post(`/activa/${id}`, dateNow)
        .then((response) => {
          const { code } = response.data;
          if (code) {
            setFrmPass(true);
            setHash(response.data.payload);
          }
        })
        .catch((error) => {
          if (error.response) {
            setAlert({
              open: true,
              message: error.response.data.message,
              backgroundColor: "#DD4A48",
              //#519259
            });
          } else {
            console.log(error);
          }
        });
    }
  }, [id]);

  return (
    <div>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        // anchorOrigin={{ vertical: "center", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />{" "}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {verFrmPass ? <FrmPassword hash={hash} /> : "Liga no valida"}
      </Box>
    </div>
  );
};

export default Password;
