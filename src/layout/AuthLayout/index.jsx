import { useEffect } from "react";
import { Grid } from "@mui/material";
import { ReactComponent as ForexIcon } from "assets/svg/forex.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Logo from "assets/svg/logo2.png";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("__tk")) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <div className="bg-[#FDB815] min-h-screen">
      <Grid container className="max-w-[1280px] mx-auto">
        <Grid item xs={6}>
          <div className="px-6 pt-6 pb-10 mt-10 rounded-[10px]">
            <p className="text-3xl font-medium text-white max-w-[247px] mb-6">
              FX Transaction Portal
            </p>

            <p className="text-lg mb-14 max-w-[415px] leading-[24px]">
              Experience efficiency and convenience with precise and up-to-date
              results in one centralised portal.
            </p>
            <Avatar
              sx={{
                width: "28.35rem",
                height: "28.875rem",
                bgcolor: "transparent",
              }}
            >
              <ForexIcon />
            </Avatar>
          </div>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              px: { xs: 3, xl: 5 },
              pt: { xs: 3, xl: 5 },
              pb: { xs: 5, xl: 5 },
              width: "80%",
              minHeight: "90vh",
              mx: "auto",
              bgcolor: "background.main",
              borderTop: "0px",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
            className="flex items-stretch flex-col"
          >
            <div className="mt-3 w-fit ml-auto">
              <img className="w-[120px] h-[50px]" src={Logo} alt="Providus Logo"/>
            </div>
            <div className="mt-[149px] flex-1 flex flex-col">
              <Outlet />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthLayout;
