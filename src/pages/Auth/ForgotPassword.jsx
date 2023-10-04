import { useMutation } from "@tanstack/react-query";
// import { providusLoginFn } from "utils/ApiFactory/auth";
import { useState } from "react";
import { useFormik } from "formik";
import { ValidateEmailSchema } from "utils/Yup/YupSchemas";
import { useNavigate } from "react-router-dom";
import { validateUserFn } from "utils/ApiFactory/user";
import InputFormField from "components/InputFormField";
import BaseButton from "components/BaseButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialValues = {
  username: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidateEmailSchema,
    onSubmit: (values) => {
      validateEmail(values.username);
    },
  });

  const { mutate: validateEmail, isLoading: EmailIsLoading } = useMutation({
    mutationKey: "validateEmail",
    mutationFn: validateUserFn,
    onSuccess: (data) => {
      // console.log("FromValidateUser: ", data);
      // navigate(`/auth/reset-password?p=${btoa(userNameEmail)}`);
      navigate(`/auth/reset-password?p=${userNameEmail}`);
    },

    // for testing purposes.

    // onError: (error) => {
    //   console.log("ErrorValidateEmail: ", error);
    //   showToast({
    //     severity: "success",
    //     message: error.response.data.detail || "Attempted submission was succeful.",
    //   });
    //   setTimeout(() => {
    //     navigate(`/auth/reset-password?p=${btoa(userNameEmail)}`)
    //   }, 6000);
    // },

    onError: (error) => {
      // console.log(error);
      showToast({
        severity: "error",
        message: error.response.data.detail || "An error occurred.",
      });
    },
  });

  // const handleSubmit = (values) => {
  //   // console.log("SubmitedEmailValues: ", values);
  //   console.log("I am clicked");
  // };

  const userNameEmail = formik.values.username;

  // console.log("Email: ", userNameEmail);

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

      <div className="flex flex-col pb-8 justify-end flex-1">
        <p className="text-3xl mb-1 font-bold">Forgot Password</p>
        <p className="text-[#C2C2C2] text-sm mb-8">
          Enter your email address, and a password reset link will be sent your
          mail
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <InputFormField
            label="Email Address"
            placeholder="Email Address"
            name="username"
            value={formik.values.username}
            type="username"
            containerClassName="mb-8"
            onChange={formik.handleChange}
            touched={formik.touched.username}
            error={formik.errors.username}
          />

          <BaseButton
            type="submit"
            isLoading={EmailIsLoading}
            customStyle="w-full"
          >
            Continue
          </BaseButton>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
