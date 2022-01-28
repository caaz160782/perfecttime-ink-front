import React from "react";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const days = [
  "Ninguno",
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const DaysSelect = ({ handleChange, valuesConfig }) => {
  //console.log(valuesConfig.dayNotAvailables);
  return (
    <div>
      <FormControl sx={{ width: "300px" }}>
        <InputLabel id="chip-label">Días No Laborales</InputLabel>
        <Select
          labelId="chip-label"
          id="dayNotAvailables"
          multiple
          value={valuesConfig?.dayNotAvailables}
          onChange={handleChange(["dayNotAvailables"])}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DaysSelect;
