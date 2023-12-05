import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "context/UserContext";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { LimitSchema } from "utils/Yup/YupSchemas";
import InputFormField from "components/InputFormField";
import Button from "components/BaseButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialValues = {
  limit: "",
};

const Limit = () => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LimitSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-[80px] flex items-center justify-evenly">
        <InputFormField
          placeholder="Enter Limit"
          name="limit"
          value={formik.values.limit}
          type="number"
          containerClassName="w-1/5 rounded-[10px]"
          onChange={formik.handleChange}
          touched={formik.touched.limit}
          error={formik.errors.limit}
        />
        <Button
          customStyle="w-[100px] rounded-[10px] h-[38px]"
          variant="primary"
          isLoading={false}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Limit;
