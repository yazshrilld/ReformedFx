import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const InputField = ({ label, value, name, handleChange, placeholder, style }) => {
  return (
    <Box padding="1px" mt={"0.8rem"}>
      <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }} gutterBottom>
        {label}
      </Typography>
      <TextField
        fullWidth
        value={value}
        name={name}
        type={name}
        onChange={handleChange}
        placeholder={placeholder}
        style={style}
        required
        sx={{
          height: "auto",
          color: "primary.lightGray",
          mt: 1,
          bgcolor: 'primary.lightGray',
          border: 'none',
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline ": {
              borderRadius: '10px',
              outline: 'none',
            },
            "&.Mui-focused fieldset": {
              borderColor: 'primary.darkYellow',
            },
          },
        }}
      />
    </Box>
  );
};

export default InputField;
