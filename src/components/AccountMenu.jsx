import { useState } from "react";
import { ReactComponent as UserIcon } from "assets/svg/Avatar.svg";
import { ReactComponent as ChevronDownIcon } from "assets/svg/expand_more.svg";
import { ReactComponent as ProvidusLogo } from "assets/svg/providus.svg";
import { ReactComponent as Hamburger } from "assets/svg/hamburger.svg";
import { UserContext } from "context/UserContext";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { useQuery } from "@tanstack/react-query";
import { fetchFxFn } from "utils/ApiFactory/fxTxApi";
import { useContext } from "react";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "components/BaseButton";
import Loader from "./loading";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { removeItem } = useSessionStorage();
  const {
    user,
    setIsLoggedOut,
    showToast,
    setfxStatus,
    setfxStatusIsLoading,
    fxSocketStatus,
    setFxSocketStatus,
    fxRates,
  } = useContext(UserContext);

  const staff = user.username;
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const token = sessionStorage.getItem("__tk");

  const baseURL = process.env.REACT_APP_TEST_BASE_URL;

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsLoggedOut(true);
    removeItem("tk");
    removeItem("role");

    navigate("/auth/sign-in", { replace: true });
  };

  const socket = io.connect("http://192.168.52.173:4201");

  let ToggleTradStart = {
    updated_by: "ymusa",
    start_stop_flg: 1,
  };

  let ToggleTradStop = {
    updated_by: "ymusa",
    start_stop_flg: 0,
  };

  const sendStatus = (ToggleTrad) => {
    socket.emit("TradeAction", ToggleTrad);
  };

  const [showPopUp, setShowPopUp] = useState({
    open: false,
    type: "start",
  });
  const [apiRequest, setApiRequest] = useState({
    isStartLoading: false,
    isStopLoading: false,
  });

  const startFxFn = async () => {
    const url = `${baseURL}/start_stop`;
    const payload = {
      updated_by: staff,
      start_stop_flg: 1,
    };
    setApiRequest((prevS) => ({
      ...prevS,
      isStartLoading: true,
    }));
    try {
      const res = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        // console.log({ res });
        if (showPopUp.type === "start") {
          showToast({
            severity: "success",
            message: "Fx has succesfully started",
          });
          setShowPopUp({
            open: false,
            type: "",
          });
          // setfxStatus(true);
          setFxSocketStatus(true);
        }
        sessionStorage.setItem("start", true);
        sessionStorage.setItem("status", "Active");
      }
    } catch (error) {
      if (error) {
        // console.log("First Error: ", { error });
        showToast({
          severity: "error",
          message:
            error?.response?.data?.data?.responseMessage ||
            "Could not process request.",
        });
      }
    } finally {
      setApiRequest((prevS) => ({
        ...prevS,
        isStartLoading: false,
      }));
    }
  };

  const stopFxFn = async () => {
    const url = `${baseURL}/start_stop`;
    const payload = {
      updated_by: staff,
      start_stop_flg: 0,
    };
    setApiRequest((prevS) => ({
      ...prevS,
      isStopLoading: true,
    }));
    try {
      const res = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        // console.log({ res });
        if (showPopUp.type === "stop") {
          showToast({
            severity: "success",
            message: "Fx has succesfully stopped",
          });
          setShowPopUp({
            open: false,
            type: "",
          });
          // setfxStatus(false);
          setFxSocketStatus(false);
        }
        sessionStorage.setItem("start", false);
        sessionStorage.setItem("status", "Stop");
      }
    } catch (error) {
      if (error) {
        // console.log("First Error: ", { error });
        showToast({
          severity: "error",
          message:
            error?.response?.data?.data?.responseMessage ||
            "Could not process request.",
        });
      }
    } finally {
      setApiRequest((prevS) => ({
        ...prevS,
        isStopLoading: false,
      }));
    }
  };

  const handleIsToggle = () => {
    // if (fxStatus) {
    //   handlePopUp("stop");
    // } else {
    //   handlePopUp("start");
    // }

    if (fxSocketStatus) {
      handlePopUp("stop");
    } else {
      handlePopUp("start");
    }
  };

  const handlePopUp = (type) => {
    setShowPopUp({
      open: true,
      type,
    });
  };

  const startFxAndSocket = () => {
    startFxFn();
    sendStatus(ToggleTradStart);
  };

  const stopFxAndSocket = () => {
    stopFxFn();
    sendStatus(ToggleTradStop);
  };

  socket.on("StartTrade", (message) => {
    // console.log("Received message from server start:", message);
    setFxSocketStatus(true);
    // setAbc((prevS) => ({
    //   ...prevS,
    //   abc: message,
    // }))
  });

  socket.on("StopTrade", (message) => {
    // console.log(socket);
    setFxSocketStatus(false);
    // setAbc((prevS) => ({
    //   ...prevS,
    //   abc: message,
    // }))

    // console.log("Received message from server stop:", message);
  });
  // const handleStartorStop = () => {
  //   if (showPopUp.type === "start") {
  //     return startFxFn();
  //   } else {
  //     return stopFxFn();
  //   }
  // };

  const handleStartorStop = () => {
    // console.log("I am clickeeeeeeeeeeeeed: ", showPopUp.type);
    if (showPopUp.type === "start") {
      return startFxAndSocket();
    } else {
      return stopFxAndSocket();
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["fetch-fx-now"],
    queryFn: () =>
      fetchFxFn({
        startdate: new Date(),
        enddate: new Date(),
      }),
    onSuccess: (data) => {
      const status = data.data.data.current_start_stop_flg > 0;
      setFxSocketStatus(status);
      // setfxStatus(status);
      setfxStatusIsLoading(false);
    },
  });

  return (
    <>
      <div className="sticky top-0 z-[20] flex justify-between bg-white h-[91px] px-[30px] xl:px-[55px]">
        <Dialog
          open={showPopUp.open}
          onClose={() => setShowPopUp({ open: false, type: "" })}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            CONFIRM TO {`${showPopUp.type.toUpperCase()} FX`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Kindly confirm if you want to ${showPopUp.type} FX sales`}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mt-6 mb-3">
            <Button
              variant="warning"
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              onClick={() =>
                setShowPopUp({ open: false, type: showPopUp.type })
              }
              // onClick={rejectReport}
            >
              No
            </Button>
            <Button
              isLoading={apiRequest.isStartLoading || apiRequest.isStopLoading}
              variant={`${showPopUp.type === "stop" ? "error" : "success"}`}
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              // onClick={() => console.log("I am clicked")}
              onClick={handleStartorStop}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div className="flex items-center space-x-4 xl:hidden">
          <Hamburger className="" />
          <ProvidusLogo className="w-[100px] h-[40px]" />
        </div>
        <div className="flex items-center gap-3">
          {(myRole === 6 || myRole === 4 || myRole === 7) && (
            <div className="flex items-center gap-3">
              {/* <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="success"
                // onClick={() => handlePopUp("start")}
                onClick={sendStatus}
                disabled={false}
              >
                Socket
              </Button>
              <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="error"
                onClick={() => handlePopUp("stop")}
                disabled={false}
              >
                Stop Fx
              </Button> */}

              <div
                onClick={handleIsToggle}
                // onClick={() => setIsSelected(!isSelected)}
                className={`flex w-10 h-5 rounded-full transition-all duration-500 ${
                  // selected.isSuccess ? "bg-green-500" : "bg-gray-500"
                  fxSocketStatus ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`h-5 w-5  bg-gray-50 cursor-pointer rounded-full transition-all duration-500 shadow-2xl ${
                    fxSocketStatus ? "ml-5" : ""
                  }`}
                ></span>
              </div>
            </div>
          )}

          <div
            className={`ml-5 p-[16px_20px] bg-transparent rounded-[10px] shadow-md font-medium`}
            // className={`ml-5 p-[16px_20px] bg-transparent rounded-[10px] shadow-md font-medium ${
            //   !fxSocketStatus ? "line-through" : ""
            // }`}
          >
            {fxRates ? `FX RATE: ₦${fxRates}` : `FX RATE: ₦ --.--`}
          </div>
        </div>

        <div className="ml-auto w-fit flex items-center" onClick={handleClick}>
          <div sx={{ ml: "1.75rem" }}>
            <Avatar sx={{ width: "3.18rem", height: "3.18rem" }}>
              <UserIcon />
            </Avatar>
          </div>
          <div>
            <IconButton>
              <ChevronDownIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ml: -4,
            "& .MuiAvatar-root": {
              width: 52,
              height: 52,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 34,
              width: 10,
              height: 10,
              bgcolor: "colors.lightAsh",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem>
          <Avatar>
            <UserIcon />
          </Avatar>
          <div className="ml-2">
            <p className="font-semibold text-base text-font capitalize">
              {user?.name ?? user?.nameOfLawFirm}
            </p>
            <p className="text-sm text-fontLight font-medium">{user?.role}</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut}>
          <span className="font-medium ">Logout</span>
        </MenuItem>
      </Menu>
      {isLoading ? (
        <Loader text="Waiting for today's data" bgColor="rgba(0,0,0,0.12)" />
      ) : null}
    </>
  );
};

export default AccountMenu;
