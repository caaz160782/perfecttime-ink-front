import React, { useEffect, useState, useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";

const SelectTatuador = ({ handleChangeDate }) => {
  const { auth } = useContext(AuthContext);
  const [tatuadorValue, setValueTatuador] = useState([]);

  //.get("/findStaffByStudy", { headers: { apitoken: valToken.token } })
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
  }, [auth.infoStudio.id]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 230 }}>
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
          <MenuItem value="">
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
