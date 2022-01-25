import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import { Box, Typography, TextareaAutosize, TextField } from "@mui/material";
import Image from "next/image";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import SendIcon from "@mui/icons-material/Send";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import clienteAxios from "../../utils/axios";
import { AuthContext } from "../../Context/AuthContext";
import { differenceInHours, parseISO, addHours, format } from "date-fns";

const CardEdit = ({ dateSingle, iddate }) => {
  const { auth } = useContext(AuthContext);
  const [valueNewDay, setValueNewDay] = useState(
    new Date("2022-01-01T00:00:00")
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [valuesModif, setValuesModif] = useState({});
  const [valuesTxtAreaMot, setValuesTxtAreaMot] = useState("");

  const datapicker = (newValue) => {
    setValueNewDay(newValue);
    let duracionCitas = differenceInHours(
      parseISO(dateSingle.end),
      parseISO(dateSingle.start)
    );
    //console.log(newValue);
    //console.log(dateSingle);

    const finDateNew = addHours(new Date(newValue), duracionCitas);
    setValuesModif({
      ...valuesModif,
      start: newValue,
      hourTatooStart: format(newValue, "HH:mm"),
      end: finDateNew,
      hourTatooFinish: format(finDateNew, "HH:mm"),
    });
  };
  //console.log(valuesModif);

  const handleChange = (prop) => (event) => {
    setValuesModif({ ...valuesModif, [prop]: event.target.value });
    if (prop === "motivo") {
      setValuesTxtAreaMot(event.target.value);
    }
  };

  useEffect(() => {
    if (dateSingle !== undefined) {
      setValueNewDay(dateSingle.start);
    }
  }, [dateSingle]);
  const handlerSubmit = (e) => {
    e.preventDefault();
    //    setLoading(true);

    clienteAxios
      .patch(`/dateTatoo/${iddate}`, valuesModif, {
        headers: { apitoken: auth?.token },
      })
      .then((response) => {
        const { code } = response.data;
        if (code) {
          router.push(`/agenda`);
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

  const hanCancelar = () => {
    router.push(`/agenda`);
  };
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {dateSingle && (
          <Image
            loader={myLoader}
            src={dateSingle.desPhotoTatoo}
            alt={dateSingle.title}
            width={250}
            height={250}
          />
        )}
      </Box>
      <Card sx={{ maxWidth: 345 }}>
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
              <Typography gutterBottom variant="h6" component="div">
                Tatuador: {dateSingle && dateSingle.id_tatuador.name}{" "}
                {dateSingle && dateSingle.id_tatuador.lastName}
              </Typography>
              <Box>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  disabled
                  placeholder={dateSingle?.description}
                  style={{ width: 270 }}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Nueva Fecha y hora "
                    value={valueNewDay}
                    onChange={datapicker}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  required
                  placeholder="Motivo de reagendar"
                  value={valuesTxtAreaMot}
                  onChange={handleChange("motivo")}
                  style={{ width: 270 }}
                />
              </Box>
            </Box>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignContent: "space-between",
            }}
          >
            <CardActions>
              <Box>
                <LoadingButton
                  //color="error"
                  variant="contained"
                  onClick={hanCancelar}
                >
                  Return
                </LoadingButton>
              </Box>

              <Box>
                <LoadingButton
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                >
                  Enviar
                </LoadingButton>
              </Box>
            </CardActions>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default CardEdit;
