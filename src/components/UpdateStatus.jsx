import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
// import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

const status = ["Completed", "Inprogress", "Assigned", "Unassigned"];

const UpdateStatus = () => {
  const [getStatus, setGetStatus] = useState();

  const handleChange = (event) => {
    setGetStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150, mr: "3rem" }}>
      <FormControl fullWidth>
        <Select
          labelId="update-status"
          label=""
          id="update-status-selectn"
          value={getStatus}
          onChange={handleChange}
          sx={{
            mt: 1,
            border: "none",
            height: '3rem',
            bgcolor: "primary.lightGray",
            "&.MuiInputBase-root": {
              borderRadius: "10px",
              outline: "none",
              "&.Mui-focused fieldset": {
                borderColor: "primary.mediumGray",
              },
            },
          }}
        >
          {status.map((stat) => (
            <MenuItem value={stat} key={stat}>
              <ListItemText primary={stat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UpdateStatus;
