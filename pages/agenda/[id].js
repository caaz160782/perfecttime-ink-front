import React, { useState, useEffect, useContext } from "react";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { useRouter } from "next/router";
import { Button, Box, Typography, Modal } from "@mui/material";
import CardEdit from "../../Components/Calendar/CardEdit";

const ModifDate = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const { id } = router.query;
  const [dateSingle, setdateSingle] = useState();

  useEffect(() => {
    if (id !== undefined) {
      const cargaDate = async (idStudio) => {
        try {
          clienteAxios
            .get(`/dateTatoo/${idStudio}`, {
              headers: { apitoken: auth.token },
            })
            .then((response) => {
              if (response.data.code) {
                setdateSingle(response.data.payload);
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
              } else {
                console.log(error);
              }
            });
        } catch (error) {
          console.log(error);
        }
      };

      cargaDate(id);
    }
  }, [auth?.token, id]);

  //console.log(dateSingle);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CardEdit iddate={id} dateSingle={dateSingle} />
    </Box>
  );
};

export default ModifDate;
