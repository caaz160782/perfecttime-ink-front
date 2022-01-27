import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import clienteAxios from "../../utils/axios";

const SelectSize = ({ handleChangeDate, sizeValue, valueDate }) => {
  //console.log(sizeValue);
  return (
    <div>
      <FormControl sx={{ width: "280px" }}>
        <InputLabel id="lblInpSize">Tamaño</InputLabel>
        <Select
          //defaultValue=""
          value={valueDate?.id_size}
          size="small"
          labelId="lblInpSize"
          id="size"
          onChange={handleChangeDate("id_size")}
          autoWidth
          label="Tamaño"
        >
          <MenuItem value="-1">
            <em>Selecciona el tamaño</em>
          </MenuItem>
          {sizeValue.map((sv) => (
            <MenuItem key={sv._id} value={sv._id}>
              {sv.descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSize;
