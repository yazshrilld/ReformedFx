// import Dashboard from "pages/Dashboard/Dashboard";
import { useState } from "react";
import DashboardNew from "pages/Dashboard/DashboardNew";
import SignIn from "pages/Auth/SignIn";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileDeviceNotAllowed from "components/MobileDeviceNotAllowed";
import "./index.css";
import AppLayout from "layout/AppLayout/AppLayout";
import AuthLayout from "layout/AuthLayout";
import UserContextProvider from "context/UserContext";
import Trade from "pages/Trade/Trade";
import ExceptinalTrade from "pages/Trade/ExceptinalTrade";
import Limit from "pages/Trade/Limit";
import ApprovedTime from "pages/Trade/ApprovedTime";

function App() {
  const matches = useMediaQuery("(min-width:600px)");
  const [difyForm, setDifyForm] = useState(null);

  const handleSelection = (createForm) => {
    setDifyForm(createForm);
  };
  // console.log("MyForm: ", difyForm);

  return matches ? (
    <div className="App">
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>

        <Route
          path="/app"
          element={
            <UserContextProvider>
              <AppLayout handleSelection={handleSelection} />
            </UserContextProvider>
          }
        >
          <Route path="dashboard" element={<DashboardNew />} />
          <Route path="trade" element={<Trade />} />
          <Route path="trade/exceptional-trade" element={<ExceptinalTrade />} />
          <Route path="trade/approved-time" element={<ApprovedTime />} />
          <Route path="trade/limit" element={<Limit />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  ) : (
    <MobileDeviceNotAllowed />
  );
}

export default App;
