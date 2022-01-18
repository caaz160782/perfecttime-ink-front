import React from "react";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";

const LocalidadSelect = ({ valuesConfigStudio, handleChange, localidad }) => {
  //console.log(valuesConfigStudio);
  return (
    <Box>
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Localidad
        </InputLabel>
        <Select
          defaultValue=""
          value={valuesConfigStudio?.city}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange("city")}
          autoWidth
          required
          label="Localidad"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {localidad.map((loc) => (
            <MenuItem key={loc._id} value={loc.localidad}>
              {loc.localidad}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LocalidadSelect;
