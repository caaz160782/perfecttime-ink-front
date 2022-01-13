import React from "react";
import { Box, Select, InputLabel, FormControl, MenuItem } from "@mui/material";

const SelectDuracion = ({ handleChangeDate }) => {
  const hrsSesion = [
    "0:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 230 }}>
        <InputLabel id="lblSesionTime">Tiempo Sesión</InputLabel>
        <Select
          defaultValue=""
          labelId="lblSesionTime"
          id="idSesionTime"
          onChange={handleChangeDate("timeSesion")}
          label="Tiempo Sesión"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hrsSesion.map((sesionTime) => (
            <MenuItem key={sesionTime} value={sesionTime}>
              {sesionTime}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SelectDuracion;
