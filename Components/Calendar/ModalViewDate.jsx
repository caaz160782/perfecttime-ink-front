import React, { useState, useContext } from "react";
import { Snackbar, Box, Typography, Modal, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AlertDelete from "./AlertDelete";
import clienteAxios from "../../utils/axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthContext } from "../../Context/AuthContext";
import { differenceInHours, differenceInDays } from "date-fns";

const ModalViewDate = ({
  openViewModal,
  setOpenViewModal,
  infoDate,
  cargaDates,
  cargaDatesClient,
  cargaDatesStaff,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const router = useRouter();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [openAlert, setopenAlert] = useState(false);
  const { auth } = useContext(AuthContext);
  const handleClose = () => {
    setOpenViewModal(false);
  };

  const handleDeleteAlert = () => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const startCita = infoDate.start;
    let result = differenceInHours(startCita, hoy);
    if (result >= 24) {
      setopenAlert(true);
    } else {
      setAlert({
        open: true,
        message: "no se pueden eliminar citas con menos de 24hrs",
        backgroundColor: "#DD4A48",
        //#519259
      });
    }
  };

  const handleEdit = () => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const startCita = infoDate.start;
    let result = differenceInDays(startCita, hoy);
    if (result >= 0) {
      router.push(`/agenda/${infoDate?._id}`);
    } else {
      setAlert({
        open: true,
        message: "no se pueden Editar citas anteriores",
        backgroundColor: "#DD4A48",
        //#519259
      });
    }
  };

  const deleteDate = async () => {
    try {
      clienteAxios
        .delete(`/dateTatoo/${infoDate?._id}`, {
          headers: { apitoken: auth.token },
        })
        .then((response) => {
          if (response.data.ok) {
            if (auth.infoUser.rol === "Administrador") {
              cargaDates();
            }
            if (auth.infoUser.rol === "Cliente") {
              cargaDatesClient();
            }
            if (auth.infoUser.rol === "tatuador") {
              cargaDatesStaff();
            }

            setOpenViewModal(false);
            setopenAlert(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            //console.log(error.response.data);
            setAlert({
              open: true,
              message: "no se pueden Elimar la cita",
              backgroundColor: "#DD4A48",
              //#519259
            });
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(infoDate);
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  //console.log(auth);

  return (
    <div>
      <Snackbar
        open={alert.open}
        style={{ height: "100%" }}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        // anchorOrigin={{ vertical, horizontal }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={1000}
      />
      <Modal
        open={openViewModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon onClick={handleClose} />
          </Box>

          <Box>
            <Box>
              <Typography variant="body2" color="text.primary">
                {infoDate.title}/{infoDate.name} {infoDate.lastName}
              </Typography>
            </Box>

            <Box>
              <Image
                loader={myLoader}
                src={infoDate?.desPhotoTatoo}
                alt="infoDate."
                width={500}
                height={500}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {infoDate?.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {!infoDate.statusPago ? (
                <form action="http://localhost:8000/checkout" method="post">
                  <input
                    type="hidden"
                    name="price"
                    value={infoDate.estimated}
                  />
                  <input type="hidden" name="reference" value={infoDate._id} />
                  <input
                    type="hidden"
                    name="title"
                    value={infoDate.description}
                  />
                  {auth?.infoUser.rol === "Cliente" ? (
                    <Button variant="outlined" type="submit" value="pagar">
                      PAGAR ANTICIPO
                    </Button>
                  ) : (
                    ""
                  )}
                </form>
              ) : (
                <Typography>Anticipo pagado</Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Box>
                  <DeleteForeverIcon
                    color="error"
                    onClick={handleDeleteAlert}
                  />
                  <AlertDelete
                    openAlert={openAlert}
                    setopenAlert={setopenAlert}
                    texto={"¿Realmente deseas eliminar la cita?"}
                    deleteDate={deleteDate}
                  />
                </Box>
                <Box>
                  <EditIcon color="secondary" onClick={handleEdit} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalViewDate;
