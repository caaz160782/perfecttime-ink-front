import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DaysSelect from "./DaysSelect";
import RemSelect from "./RemSelect";
import Image from "next/image";

const FrmConfig = ({
  title,
  handlerSubmit,
  handleChange,
  leerArchivo,
  valuesConfig,
  loading,
}) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        //m: 8,
      }}
    >
      <Typography component="h6" variant="h6">
        {title} Estudio{" "}
      </Typography>
      <form id="form" onSubmit={handlerSubmit}>
        <Box sx={{ m: 1 }}>
          <TextField
            sx={{ width: "30ch" }}
            id="time"
            label="Hora Apertura"
            type="time"
            value={valuesConfig?.timeToOpen}
            onChange={handleChange("timeToOpen")}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            id="time"
            label="Hora Cierre"
            type="time"
            //defaultValue={valuesConfig.timeToClose}
            value={valuesConfig?.timeToClose}
            onChange={handleChange("timeToClose")}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Box>
        <Box>
          <DaysSelect handleChange={handleChange} valuesConfig={valuesConfig} />
        </Box>
        <Box sx={{ p: 1, m: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              sx={{ m: 1, width: "30ch" }}
              id="logo"
              name="logo"
              inputProps={{ type: "file" }}
              onChange={leerArchivo}
            ></TextField>
            <Box></Box>
          </Box>
        </Box>
        <Box>
          {/* <RemSelect handleChange={handleChange} valuesConfig={valuesConfig} /> */}
        </Box>
        <Box sx={{ p: 1, m: 2 }}>
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
      </form>
    </Box>
  );
};

export default FrmConfig;
