import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [fxStatus, setfxStatus] = useState(false);
  const [fxStatusIsLoading, setfxStatusIsLoading] = useState(true);
  const [fxRates, setFxRates] = useState("")
  const [fxSocketStatus, setFxSocketStatus] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const tk = sessionStorage.getItem("__tk");
  const userEmail = sessionStorage.getItem("__uem");
  const user = tk ? JSON.parse(atob(tk?.split(".")[1])) : null;
  if (userEmail) {
    if (userEmail.toLocaleLowerCase().includes("@providusbank.com")) {
      user.email = userEmail;
    } else {
      user.email = `${userEmail}@providusbank.com`;
    }
  }

  const handleClose = () => {
    setSnackbar((prevS) => ({ ...prevS, open: false }));
  };

  const showToast = ({ severity, message }) => {
    setSnackbar({ open: true, severity, message });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedOut,
        setIsLoggedOut,
        showToast,
        fxStatus,
        setfxStatus,
        fxStatusIsLoading,
        setfxStatusIsLoading,
        fxSocketStatus,
        setFxSocketStatus,
        fxRates,
        setFxRates,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
