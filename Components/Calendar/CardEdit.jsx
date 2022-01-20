import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import {
  Button,
  Box,
  Typography,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Image from "next/image";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import SendIcon from "@mui/icons-material/Send";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";

const CardEdit = ({ dateSingle }) => {
  const { auth } = useContext(AuthContext);
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [valuesModif, setValuesModif] = useState({});
  const [valuesTxtAreaDes, setValuesTxtAreaDes] = useState({});
  const [valuesTxtAreaMot, setValuesTxtAreaMot] = useState("");

  const datapicker = (newValue) => {
    setValue(newValue);
    setValuesModif({ ...valuesModif, start: newValue });
  };

  const handleChange = (prop) => (event) => {
    setValuesModif({ ...valuesModif, [prop]: event.target.value });
    if (prop === "description") {
      setValuesTxtAreaDes(event.target.value);
    }
    if (prop === "motivo") {
      setValuesTxtAreaMot(event.target.value);
    }
  };

  useEffect(() => {
    if (dateSingle !== undefined) {
      setValue(dateSingle.start);
      setValuesTxtAreaDes(dateSingle.description);
    }
  }, [dateSingle]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    //    setLoading(true);
    console.log(valuesModif);
    clienteAxios
      .patch(`/dateTatoo/${auth.infoStudio.id}`, valuesModif, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        const { code } = response.data;
        console.log(response.data);
        if (code) {
          router.push(`/agenda`);
          // cargarSetting();
          // setLoading(false);
          // MySwal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "Actualizado Correctamente",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <Box
    //sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        {dateSingle && (
          <Image
            loader={myLoader}
            src={dateSingle.desPhotoTatoo}
            alt={dateSingle.title}
            width={250}
            height={250}
          />
        )}
        <form id="form" onSubmit={handlerSubmit}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {dateSingle && dateSingle.title}/
                {dateSingle && dateSingle.tipoTatoo}
              </Typography>
              <Box>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Minimum 3 rows"
                  value={valuesTxtAreaDes}
                  style={{ width: 270 }}
                  onChange={handleChange("description")}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Nueva Fecha y hora "
                    value={value}
                    onChange={datapicker}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Motivo de reagendar"
                  value={valuesTxtAreaMot}
                  onChange={handleChange("motivo")}
                  style={{ width: 270 }}
                />
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <LoadingButton
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                type="submit"
                // onClick={handlerSubmit}
              >
                Enviar
              </LoadingButton>
            </Box>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default CardEdit;
