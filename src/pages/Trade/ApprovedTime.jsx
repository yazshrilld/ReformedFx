import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { ApprovedTimeSchema } from "utils/Yup/YupSchemas";
import { getCurrentTime } from "utils/getCurrentTime";
import TimeInput from "components/TimeInput";
import Button from "components/BaseButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialValues = {
  startTime: getCurrentTime(),
  endTime: getCurrentTime(),
};

const ApprovedTime = () => {
  const timeRef = useRef(null);
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ApprovedTimeSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  console.log({formik})

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-evenly">
          <div className="flex items-center gap-4">
            <TimeInput
              label="Start Time"
              name="startTime"
              value={formik.values.startTime}
              type="time"
              onChange={formik.handleChange}
              max={formik.values.endTime}
              touched={formik.touched.startTime}
              error={formik.errors.startTime}
            />
            <TimeInput
              label="End Time"
              name="endTime"
              value={formik.values.endTime}
              type="time"
              onChange={formik.handleChange}
              min={formik.values.startTime}
              touched={formik.touched.endTime}
              error={formik.errors.endTime}
            />
          </div>
          <Button
            customStyle="w-[100px] rounded-[10px] h-[38px] mt-[40px]"
            variant="primary"
            isLoading={false}
            type="submit"
            // disabled={!formik.dirty}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default ApprovedTime;
