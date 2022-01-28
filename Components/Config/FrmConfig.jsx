import React from "react";
import { Typography, TextField, Box, Container, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DaysSelect from "./DaysSelect";
// import RemSelect from "./RemSelect";
// import Image from "next/image";

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
    <Container fixed>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={3000}
      />
      <Box sx={{ mt: 4 }}>
        {" "}
        <Box
          sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "secondary.main",
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              borderRadiusTop: 2,
              height: 50,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{ m: 1, color: "#FFF" }}
              component="h6"
              variant="h6"
            >
              {title} Configuración Estudio{" "}
            </Typography>
          </Box>
          <Box>
            <form id="form" onSubmit={handlerSubmit}>
              <Box sx={{ m: 4 }}>
                <Box sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: "300px" }}
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
                    sx={{ width: "300px" }}
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
                <Box sx={{ m: 1 }}>
                  <DaysSelect
                    handleChange={handleChange}
                    valuesConfig={valuesConfig}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Seleccione su logo (jpg,png)
                  </Typography>
                  <TextField
                    sx={{ width: "300px" }}
                    id="logo"
                    name="logo"
                    inputProps={{ type: "file" }}
                    onChange={leerArchivo}
                  ></TextField>
                </Box>
                <Box sx={{ mt: 2 }}></Box>
                <Box sx={{ m: 1 }}>
                  <LoadingButton
                    sx={{ width: "300px" }}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </LoadingButton>
                </Box>
                {/* <RemSelect handleChange={handleChange} valuesConfig={valuesConfig} /> */}
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FrmConfig;
