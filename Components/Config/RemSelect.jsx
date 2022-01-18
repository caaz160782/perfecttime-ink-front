import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import clienteAxios from "../../utils/axios";

const RemSelect = ({ handleChange, valuesConfig }) => {
  const { auth } = useContext(AuthContext);
  const [rem, setRem] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/clientRemember")
      .then((response) => {
        setRem(response.data.payload);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          // console.log(error);
        }
      });
    return () => {
      //   cleanup
    };
  }, [auth?.token]);

  return (
    <Box>
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Recordatorio
        </InputLabel>
        <Select
          defaultValue=""
          value={valuesConfig?.notifications}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange("notifications")}
          autoWidth
          label="Recordatorio"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {rem.map((r) => (
            <MenuItem key={r._id} value={r._id}>
              {r.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default RemSelect;
