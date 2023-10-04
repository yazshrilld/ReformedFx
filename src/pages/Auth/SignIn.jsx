import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { providusLoginFn, solicitorsLoginFn } from "utils/ApiFactory/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "utils/Yup/YupSchemas";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { useState, useEffect } from "react";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { ReactComponent as EyeClosedIcon } from "assets/svg/eye-closed.svg";
import io from "socket.io-client";
import InputFormField from "components/InputFormField";
import BaseButton from "components/BaseButton";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const navigate = useNavigate();
  const { setSessionStorage } = useSessionStorage();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const STAFF_ROLE = [
    "Application Developer",
    "Customer Service Officer",
    "Legal Officer",
    "Team Lead, Legal Services",
    "Project Management Officer",
    "Testing and Quality Assurance Officer",
  ];

  const socket = io.connect("http://192.168.52.173:4201");
  useEffect(() => {
    socket.on('connect', () => {
      // console.log('WebSocket connected');
    });
  }, [socket])

  const handleSubmit = (values) => {
    if (
      values.userName.toLowerCase().includes("@") &&
      !values.userName.toLowerCase().includes("@providusbank.com")
    ) {
      solicitorLogin(values);
    } else {
      login({
        userId: values.userName,
        password: btoa(values.password),
        linkId: "",
      });
    }
  };

  useEffect(() => {
    const __username = sessionStorage.getItem("__username");
    const __password = sessionStorage.getItem("__password");
    if (__username && __password) {
      // console.log("Session Details: ", { __username, __password });
      // login({
      //   userId: __username,
      //   password: btoa(__password),
      //   linkId: "",
      // });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: LoginSchema,
  });

  // Providus users login
  const { mutate: login, isLoading: PIsLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: providusLoginFn,
    onSuccess: (data) => {
      const staffRole = data?.data?.role;
      if (!STAFF_ROLE.includes(staffRole)) {
        showToast({
          severity: "warning",
          message: "Sorry, You are not profiled for this application.",
        });
        return;
      }
      setSessionStorage("tk", data?.data?.token);
      setSessionStorage("role", data?.data?.role);
      setSessionStorage("uem", formik.values.userName);
      setSessionStorage("brc", data?.data?.braCode?.code);
      const branchCode = data?.data?.braCode?.code;
      
      socket.emit("authenticate", data?.data?.token);
      STAFF_ROLE.includes(staffRole) && navigate("/app/dashboard");

      return { branchCode };
      // navigate("/app/dashboard");
    },
    onError: (error, data) => {
      // console.log(error);
      showToast({
        severity: "error",
        message:
          error.response.data.detail ||
          "Invalid User Credentials, Failed to authenticate user.",
      });
    },
  });

  // solicitors login
  const { mutate: solicitorLogin, isLoading: SIsLoading } = useMutation({
    mutationKey: ["slicitor-login"],
    mutationFn: solicitorsLoginFn,
    onSuccess: (data) => {
      const payload = data.data.data;
      payload.exp = (Date.now() + 86400000) / 1000;
      const tk = btoa(JSON.stringify(payload));
      setSessionStorage("tk", `ghjmmnbvxghjknnbv.${tk}.dfghjnbvgfdfh`);
      setSessionStorage("role", data?.data?.data?.role);
      navigate("/app/dashboard");
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error.response.data.detail || "Invalid User Credentials, Failed to authenticate user.",
      });
    },
  });

  const handleShowPasswordVisibility = () => {
    setShowPassword((prevS) => !prevS);
  };

  const handleClose = () => {
    setSnackBar((prevS) => ({
      ...prevS,
      open: false,
    }));
  };

  const showToast = ({ severity, message }) => {
    setSnackBar({
      open: true,
      severity,
      message,
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
      <p className="text-3xl mb-1 font-bold">Login</p>
      <p className="text-[#C2C2C2] text-sm mb-6">
        Enter your valid login credentials
      </p>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <InputFormField
          label="Username"
          placeholder="Username"
          name="userName"
          value={formik.values.userName}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.userName}
          error={formik.errors.userName}
        />

        <InputFormField
          label="Password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          error={formik.errors.password}
          appendIcon={
            showPassword ? (
              <EyeOpenIcon
                className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                onClick={handleShowPasswordVisibility}
              />
            ) : (
              <EyeClosedIcon
                className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                onClick={handleShowPasswordVisibility}
              />
            )
          }
        />

        <div className="flex justify-between items-center pb-8 ">
          <label className="flex justify-between items-center select-none opacity-0">
            <Checkbox
              size="small"
              onChange={() => setRememberMe(!rememberMe)}
            />
            <p className="text-xs font-medium ">Remember me</p>
          </label>

          <Link
            to="/auth/forgot-password"
            style={{ textDecoration: "none" }}
            className=""
          >
            <span className="text-xs font-medium">Forgot Password?</span>
          </Link>
        </div>

        <BaseButton
          type="submit"
          isLoading={PIsLoading || SIsLoading}
          customStyle="w-full"
        >
          Login
        </BaseButton>
      </form>
    </>
  );
};

export default SignIn;
