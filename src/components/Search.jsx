import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";

const Search = ({ value, handleChange, name, handleSubmit }) => {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="search"
        type="search"
        value={value}
        name={name}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ pr: 2 }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: "primary.lightGray",
          width: "22.125rem",
          border: "none",
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline ": {
              borderRadius: "10px",
              outline: "none",
            },
            "&.Mui-focused fieldset": {
              borderColor: "secondary.mediumOrange",
            },
          },
        }}
      />
    </Box>
  );
};

export default Search;
