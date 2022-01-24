import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import clienteAxios from "../../utils/axios";

const SelectSize = ({ handleChangeDate }) => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [sizeValue, setSizeTatuador] = useState([]);

  useEffect(() => {
    clienteAxios
      .get(`/sizes`)
      .then((response) => {
        setSizeTatuador(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
    return () => {
      //   cleanup
    };
  }, []);

  return (
    <div>
      <FormControl sx={{ width: "26ch" }}>
        <InputLabel id="lblInpSize">Tamaño</InputLabel>
        <Select
          defaultValue=""
          size="small"
          labelId="lblInpSize"
          id="size"
          onChange={handleChangeDate("id_size")}
          autoWidth
          label="Tamaño"
        >
          <MenuItem value="">
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
