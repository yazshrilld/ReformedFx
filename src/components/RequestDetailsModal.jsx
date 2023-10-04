import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { Divider } from "@mui/material";
import UpdateStatus from "./UpdateStatus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.main",
  boxShadow: 24,
  p: "3rem 2rem 3rem 2rem",
  borderRadius: "9px",
};

const RequestDetailsModal = ({ value, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          textTransform: "capitalize",
          fontSize: "0.8rem",
          fontWeight: 400,
          cursor: "pointer",
          color: "colors.lightAsh",
          bgcolor: "colors.mediumYellow",
          "&:hover": {
            color: "secondary.mediumOrange",
          },
        }}
      >
        {value}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-moda-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>Request Details</Typography>
            <IconButton
              sx={{
                bgcolor: "primary.mediumGray",
                p: 1,
                "&:hover ": {
                  bgcolor: "primary.orangeYellow",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container sx={{ bgcolor: "transparent" }}>
              <Grid item xs={6} sx={{ p: 2 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Company Name
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>

                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Date Submitted
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                </Box>
                <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                  Company's Registered Address
                  <Typography sx={{ fontWeight: "700", color: "primary.dark" }}>
                    {data.cName}
                  </Typography>
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  justifyContent="space-between"
                  mb="0.5rem"
                >
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    RC Number
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Reason
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Company Type
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Date Registered
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                </Box>
                <Divider />
                <Typography
                  sx={{ mt: "0.5rem", color: "primary.mediumGray", mb: 2 }}
                >
                  Sharing Holding Structure as stated on the CAC Document
                  <Typography sx={{ fontWeight: "700", color: "primary.dark" }}>
                    {data.cName}
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Poprietors Name
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Secetary's Name
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Residential Address of Proprietors
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "primary.mediumGray", mb: 2 }}>
                    Status
                    <Typography
                      sx={{ fontWeight: "700", color: "primary.dark" }}
                    >
                      {data.cName}
                    </Typography>
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={1}>
                <Divider orientation="vertical" />
              </Grid>
              
              <Grid item xs={5} sx={{ p: 2 }}>
                <Box mb="0.5rem">m</Box>
                <Divider />
                <Box mt="0.5rem">
                  <Typography
                    sx={{
                      fontWeight: "700",
                      color: "primary.dark",
                      mt: "2rem",
                    }}
                  >
                    Status
                  </Typography>
                  <UpdateStatus />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RequestDetailsModal;
