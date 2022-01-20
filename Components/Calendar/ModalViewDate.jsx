import React, { useState } from "react";
import { Button, Box, Typography, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AlertDelete from "./AlertDelete";
import clienteAxios from "../../utils/axios";
import { useRouter } from "next/router";
import Image from "next/image";

const ModalViewDate = ({
  openViewModal,
  setOpenViewModal,
  infoDate,
  cargaDates,
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
  const [openAlert, setopenAlert] = useState(false);

  const handleClose = () => {
    setOpenViewModal(false);
  };

  const handleDeleteAlert = () => {
    //  hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const hrActual = hoy.getHours() + ":" + hoy.getMinutes();
    const startCita = infoDate.start;
    const horaCita = startCita.getHours() + ":" + startCita.getMinutes();
    console.log(horaCita - hrActual);

    // cita;

    //setopenAlert(true);
  };

  const handleEdit = () => {
    router.push(`/agenda/${infoDate.extendedProps?._id}`);
  };

  const deleteDate = async () => {
    try {
      console.log("Delete");
      clienteAxios
        .delete(`/dateTatoo/${infoDate.extendedProps?._id}`, {
          headers: { apitoken: auth.token },
        })
        .then((response) => {
          if (response.data.ok) {
            cargaDates();
            setOpenViewModal(false);
            setopenAlert(false);
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
  //console.log(infoDate);
  //const ruta = "image="{`http://localhost:8000/${infoDate.picture}`}";
  //return `http://localhost:8000/${src}?w=${width}&q=${quality || 75}`;
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <div>
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
                {infoDate.title}
              </Typography>
            </Box>

            <Box>
              <Image
                loader={myLoader}
                src={infoDate.extendedProps?.desPhotoTatoo}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {infoDate.extendedProps?.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Box>
                <DeleteForeverIcon onClick={handleDeleteAlert} />
                <AlertDelete
                  openAlert={openAlert}
                  setopenAlert={setopenAlert}
                  texto={"¿Realmente deseas eliminar la cita?"}
                  deleteDate={deleteDate}
                />
              </Box>
              <Box>
                <EditIcon onClick={handleEdit} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalViewDate;
