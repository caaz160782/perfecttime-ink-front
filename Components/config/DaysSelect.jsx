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
  { id: 0, day: "Domingo" },
  { id: 1, day: "Lunes" },
  { id: 2, day: "Martes" },
  { id: 3, day: "Miercoles" },
  { id: 4, day: "Jueves" },
  { id: 5, day: "Viernes" },
  { id: 6, day: "Sabado" },
];

const DaysSelect = ({ handleChange, valuesConfig }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="chip-label">Días Laborales</InputLabel>
        <Select
          labelId="chip-label"
          id="multiple-chip"
          multiple
          value={valuesConfig.dayAvailables}
          onChange={handleChange(["dayAvailables"])}
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
            <MenuItem key={day.id} value={day.day} name={day.day}>
              {day.day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DaysSelect;
