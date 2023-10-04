import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { useContext, useEffect, useState } from "react";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { useQuery } from "@tanstack/react-query";
import { fetchFxFn } from "utils/ApiFactory/fxTxApi";
import AccountMenu from "components/AccountMenu";
import io from "socket.io-client";
import "./AppLayout.styles.scss";
import SideNav from "../SideNav/SideNav";
import axios from "axios";

const AppLayout = ({ handleSelection }) => {
  const {
    user,
    showToast,
    fxStatus,
    setfxStatus,
    fxStatusIsLoading,
    setfxStatusIsLoading,
    fxSocketStatus,
    setFxSocketStatus,
  } = useContext(UserContext);
  const staff = user.username;
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const baseURL = process.env.REACT_APP_TEST_BASE_URL;
  const token = sessionStorage.getItem("__tk");
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    const trimStr = (str) => {
      if (str !== null && str !== undefined) {
        return str.trim();
      }
      return "";
    };
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
        const successMessage = res?.data?.data?.responseMessage;
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
    // startFxFn();
    sendStatus(ToggleTradStart);
  };

  const stopFxAndSocket = () => {
    // stopFxFn();
    sendStatus(ToggleTradStop);
  };

  socket.on("StartTrade", (message) => {
    // console.log("Received message from server start:", message);
    setFxSocketStatus(true)
    // setAbc((prevS) => ({
    //   ...prevS,
    //   abc: message,
    // }))
  });

  socket.on("StopTrade", (message) => {
    // console.log(socket);
    setFxSocketStatus(false)
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

  useEffect(() => {
    if (!user?.exp || user.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("__tk");
      sessionStorage.removeItem("__role");
      navigate("/auth/sign-in", { replace: true });
    }
  }, [pathname, navigate, user.exp]);

  const { isLoading } = useQuery({
    queryKey: ["fetch-fx-now-layout"],
    queryFn: () =>
      fetchFxFn({
        startdate: new Date(),
        enddate: new Date(),
      }),
    onSuccess: (data) => {
      const status = data.data.data.current_start_stop_flg > 0;
      setfxStatus(status);
      setfxStatusIsLoading(false);
    },
  });

  return (
    <div className="overflow-hidden layout grid w-full h-screen grid-cols-1">
      <SideNav handleSelection={handleSelection} />
      <div className="content overflow-y-auto h-screen bg-[#F4F4F4]">
        
        <AccountMenu />


        <div className="m-6 rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
