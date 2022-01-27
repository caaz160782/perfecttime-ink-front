import React, { useEffect, useState, useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import clienteAxios from "../../utils/axios";

const SelectClient = ({ handleChangeDate }) => {
  const { auth } = useContext(AuthContext);
  const [clientValue, setclientValue] = useState([]);

  useEffect(() => {
    clienteAxios
      .get(`/findClientByStudy/${auth.infoStudio.id}`)
      .then((response) => {
        //console.log(response.data.payload);
        setclientValue(response.data.payload);
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
      <FormControl sx={{ width: "280px" }}>
        <InputLabel id="lblInpCli">Cliente</InputLabel>
        <Select
          size="small"
          defaultValue=""
          labelId="lblInpCli"
          id="id_cliente"
          onChange={handleChangeDate("id_cliente")}
          autoWidth
          label="tatuador"
        >
          <MenuItem value="">
            <em>Selecciona un Cliente</em>
          </MenuItem>
          {clientValue.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectClient;
