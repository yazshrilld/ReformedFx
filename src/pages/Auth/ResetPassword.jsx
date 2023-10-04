import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "utils/Yup/YupSchemas";
// import { useEffect, useState } from "react";
import { useState } from "react";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { ReactComponent as EyeClosedIcon } from "assets/svg/eye-closed.svg";
import { useSearchParams } from "react-router-dom";
import { resetSolicitorPasswordFn } from "utils/ApiFactory/solicitors";
import { otpFn } from "utils/ApiFactory/auth";
// import { validateUserFn, resetSolicitorPasswordFn,
// } from "utils/ApiFactory/solicitors";
import InputFormField from "components/InputFormField";
import BaseButton from "components/BaseButton";
import ReactOtp from "components/otp";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SetPassword = () => {
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const username = searchParams.get("p");
  const [otp, setOtp] = useState("");

  const { mutate: otpCall } = useMutation({
    mutationKey: ["otpCall"],
    mutationFn: otpFn,
    onSuccess: (data, variables, context) => {
      // console.log("MyDataFromOtp: ", data);
      // console.log({ data, variables, context });
      // console.log("MyDataFromOtp: ", "I am clicked");
      setSearchParams({ q: "otp", p: username });
      // navigate(`/auth/reset-password?p=${username}&q=otp`);
      // console.log("I am Yazid");
    },
    
    onError: (error) => {
      // console.log("FromOtpCall: ", error);
      showToast({
        severity: "error",
        message: error?.response?.data?.detail || "Could not process request.",
      });
    },
  });

  const {
    mutate: resetSolicitorPassword,
    isLoading, //watch out for this as it facilitates the mutation
  } = useMutation({
    mutationKey: ["resetSolicitorPassword"],
    mutationFn: resetSolicitorPasswordFn,
    onSuccess: () => {
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      // console.log("FromresetSolicitorPassword: ", error.toJSON());
      showToast({
        severity: "error",
        message: error.response.data.detail || "Could not process request.",
      });
    },
  });

  const handleSubmit = () => {
    otpCall({
      // username: atob(username),
      otpUrl: "https://providusbank.com",
      username: username,
    });
    // setSearchParams({ q: "otp", p: username });

    // console.log("OTPCALL: ", {
    //   username: username,
    //   otpUrl: "https://providusbank.com",
    // })
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: handleSubmit,
  });

  const handleShowPasswordVisibility = (objKey) => {
    setShowPassword((prevS) => ({ ...prevS, [objKey]: !prevS[objKey] }));
  };

  const handlePasswordReset = () => {
    alert(
      `submit ${JSON.stringify({
        password: formik.values.password,
        otp,
        // solicitorId: "string",
        userName: username,
      })} to backend`
    );

    resetSolicitorPassword({
      newPassword: formik.values.password,
      otp,
      // solicitorId: "string",
      userName: username,
    });
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

  // console.log("SearchParams: ", searchParams.get("p"));

  return query === "otp" ? (
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

      <div className="flex flex-col pb-8 justify-end flex-1">
        <p className="text-3xl mb-1 font-bold">Enter OTP</p>
        <p className="text-[#C2C2C2] text-sm mb-6">
          An OTP has been sent to your mails
        </p>

        <ReactOtp
          value={otp}
          onChange={setOtp}
          numInputs={4}
          shouldAutoFocus
          containerStyle="space-x-4 mb-[70px] w-fit mx-auto"
          inputStyle="w-[65px!important] h-[60px] bg-[#F8F8F8] p-0 rounded outline-[none] border-none focus:outline-none font-semibold"
          renderInput={(props) => <input {...props} />}
        />

        <BaseButton disabled={otp.length < 4} handleClick={handlePasswordReset}>
          Verify
        </BaseButton>
      </div>
    </>
  ) : (
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

      <div>
        <p className="text-3xl mb-1 font-bold">Reset Password</p>
        <p className="text-[#C2C2C2] text-base mb-6">Set your new password</p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <InputFormField
            label="Password"
            placeholder="New Password"
            name="password"
            value={formik.values.password}
            type={showPassword.password ? "text" : "password"}
            onChange={formik.handleChange}
            touched={formik.touched.password}
            error={formik.errors.password}
            appendIcon={
              showPassword.password ? (
                <EyeOpenIcon
                  className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                  onClick={() => handleShowPasswordVisibility("password")}
                />
              ) : (
                <EyeClosedIcon
                  className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                  onClick={() => handleShowPasswordVisibility("password")}
                />
              )
            }
          />
          <InputFormField
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            type={showPassword.confirmPassword ? "text" : "password"}
            onChange={formik.handleChange}
            touched={formik.touched.confirmPassword}
            error={formik.errors.confirmPassword}
            appendIcon={
              showPassword.confirmPassword ? (
                <EyeOpenIcon
                  className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                  onClick={() =>
                    handleShowPasswordVisibility("confirmPassword")
                  }
                />
              ) : (
                <EyeClosedIcon
                  className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                  onClick={() =>
                    handleShowPasswordVisibility("confirmPassword")
                  }
                />
              )
            }
          />

          <div className="pt-10">
            <BaseButton
              isLoading={isLoading}
              customStyle="w-full"
              type="submit"
            >
              Continue
            </BaseButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default SetPassword;
