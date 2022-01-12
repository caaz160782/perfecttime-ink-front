import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import clienteAxios from "../../utils/axios";

const SelectTatuador = ({ handleChangeDate }) => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [valStudio] = useLocalStorage("studioVal", "");

  const [rem, setRem] = useState([]);

  //.get("/findStaffByStudy", { headers: { apitoken: valToken.token } })
  useEffect(() => {
    clienteAxios
      .get(`/findStaffByStudy/${valStudio}`)
      .then((response) => {
        //console.log(response.data.payload);
        setRem(response.data.payload);
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
  }, [valToken.token]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Tatuador
        </InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          //onChange={handleChange("notifications")}
          onChange={handleChangeDate("tatuador")}
          //autoWidth
          label="Recordatorio"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {rem.map((r) => (
            <MenuItem key={r._id} value={r._id}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTatuador;
