import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@mui/material";
import clienteAxios from "../../utils/axios";

const RemSelect = ({handleChange}) => {
  const [valToken, setToken] = useLocalStorage("userVal", "");
  const [rem, setRem] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/clientRemember", { headers: { apitoken: valToken.token } })
      .then((response) => {        
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
        <InputLabel id="demo-simple-select-autowidth-label">Recordatorio</InputLabel>
        <Select
          defaultValue = ""
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange("notifications")}
          autoWidth
          label="Recordatorio"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         {
            rem.map((r) => (
            <MenuItem key={r._id} value={r._id}>{r.description}
            </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default RemSelect;
