import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import clienteAxios from "../../utils/axios";

const SelectTatuador = ({ handleChangeDate }) => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [valStudio] = useLocalStorage("studioVal", "");

  const [tatuadorValue, setValueTatuador] = useState([]);

  //.get("/findStaffByStudy", { headers: { apitoken: valToken.token } })
  useEffect(() => {
    clienteAxios
      .get(`/findStaffByStudy/${valStudio}`)
      .then((response) => {
        //console.log(response.data.payload);
        setValueTatuador(response.data.payload);
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
  }, [valStudio, valToken.token]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 230 }}>
        <InputLabel id="lblInpTat">Tatuador</InputLabel>
        <Select
          defaultValue=""
          labelId="lblInpTat"
          id="tatuador"
          onChange={handleChangeDate("id_tatuador")}
          autoWidth
          label="tatuador"
        >
          <MenuItem value="">
            <em>Selecciona un tatuador</em>
          </MenuItem>
          {tatuadorValue.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTatuador;
