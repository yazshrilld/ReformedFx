import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ErrorMessage = ({ error, style, header }) => {
  return (
    <Box
      component="div"
      sx={{
        px: 2,
        py: 4,
        borderRadius: "10px",
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          mb: 2,
          color: "red",
        }}
      >
        {header}
      </Typography>
      <Typography component="p" sx={{ color: "black", fontWeight:"normal" }}>
        {error}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
