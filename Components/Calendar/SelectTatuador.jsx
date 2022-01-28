import React, { useEffect, useState, useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";

const SelectTatuador = ({
  tatuadorValue,
  setValueTatuador,
  handleChangeDate,
}) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    clienteAxios
      .get(`/findStaffByStudy/${auth.infoStudio.id}`)
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
  }, [auth?.infoStudio.id]);

  return (
    <div>
      <FormControl sx={{ width: "300px" }}>
        <InputLabel id="lblInpTat">Tatuador</InputLabel>
        <Select
          size="small"
          defaultValue=""
          labelId="lblInpTat"
          id="id_tatuador"
          onChange={handleChangeDate("id_tatuador")}
          autoWidth
          label="tatuador"
        >
          <MenuItem value="-1">
            <em>Selecciona un tatuador</em>
          </MenuItem>
          {tatuadorValue.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name} {t.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTatuador;
