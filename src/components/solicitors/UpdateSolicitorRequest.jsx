import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { UserContext } from "context/UserContext";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Button from "components/BaseButton";
import Modal from "@mui/material/Modal";

const initialValues = {
  selectStatus: "",
};

const statusOptions = {
  INP: {
    name: "INP",
    value: "In-Progress",
    payloadValue: "IN_PROGRESS",
  },
  // CPD: {
  //   name: "CPD",
  //   value: "Completed",
  //   payloadValue: "COMPLETED",
  // },
};

const VALUES_MAP = Object.values(statusOptions);

const UpdateSolicitorRequest = ({
  open,
  createdRequest: request,
  handleClose,
}) => {
  const { user, showToast } = useContext(UserContext);
  const requestId = request?.requestId;
  const solicitorEmail = user.officialEmailAddressOfFirm;
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const validationSchema = Yup.object({
    selectStatus: Yup.string().required("Please Select a status"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        requestRejectedReason: "",
        requestStatus: values.selectStatus,
        staffUsername: solicitorEmail,
      };
      
    },
  });

  const topDetails = [
    { label: "Company Name", value: request?.companyName },
    { label: "Date Submitted", value: request?.dateCreated },
    {
      label: "Company Registered Address",
      value: request?.companyRegisteredAddress,
    },
    { label: "RC Number", value: request?.rcNumber },
    { label: "Reason", value: request?.reason },
    { label: "Company Type", value: request?.companyType },
    {
      label: "Date Registered",
      value: request?.companyRegistrationDate,
    },
  ];

  const bottomDetails = [
    {
      label: "Shareholding Structure",
      value: request?.shareholdingStructure,
    },
    request?.reason
      ? {
          label: "Reason",
          value: request?.reason,
        }
      : {},
    { label: "Status", value: request?.status },
    request?.proprietorsName?.length > 0
      ? {
          label: "Proprietor's Name",
          value: request?.proprietorsName,
        }
      : request?.directors?.length > 0
      ? {
          label: "Directors's Name",
          value: request?.directors?.[0]?.directorName,
        }
      : request?.trustees?.length > 0
      ? {
          label: "Trustee's Name",
          value: request?.trustees?.[0]?.trusteeName,
        }
      : {},
    request?.proprietorsRegisteredAddress?.length > 0
      ? {
          label: "Proprietor's Registration Address",
          value: request?.proprietorsRegisteredAddress,
        }
      : request?.directors?.length > 0
      ? {
          label: "Directors's Registration Address",
          value: request?.directors?.[0]?.directorResidentialAddress,
        }
      : request?.trustees?.length > 0
      ? {
          label: "Trustee's Registration Address",
          value: request?.trustees?.[0]?.trusteeResidentialAddress,
        }
      : {},
    request?.secretaryName?.length > 0
      ? { label: "Secetary's Name", value: request?.secretaryName }
      : {},
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute w-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem]">
        <CloseIcon
          className="absolute w-6 h-6 top-5 right-5 hover:scale-150 transition-all cursor-pointer"
          onClick={handleClose}
        />
        <div className="">
          <h1 className="text-xl font-bold mb-3">Solicitor Reports</h1>
          <div className="grid grid-cols-9 ">
            <div className="col-span-5">
              <div className="grid grid-cols-2 border-r border-b gap-3 pb-5">
                {topDetails?.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#C2C2C2] text-[13px]">{label}</p>
                    <p className="text-[black] text-[16px] font-bold capitalize">
                      {value?.replace(/_/g, " ").toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 border-r gap-3 pt-4">
                {bottomDetails?.map(({ label, value }) => (
                  <div
                    key={label}
                    className={`${value?.length > 20 ? "col-span-2" : ""}`}
                  >
                    <p className="text-[#C2C2C2] text-[13px] mt-2">{label}</p>
                    <p
                      className={`text-[#263238] font-bold ${
                        value?.length > 20 ? "text-xs" : "text-base"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-1">
              <div className="grid grid-cols-1 gap-1 pb-3 h-fit border-b px-5 text-xs">
                <div className="">
                  <div className="flex items-center text-[#C2C2C2] font-medium">
                    <p className="">Document</p>
                    <a
                      rel="noreferrer"
                      href="http://192.168.51.11:9000/api/v1/file?fileName=C:/Users/nagbara/src/main/resources/static/yaz%20enterpice/GST%20104.pdf"
                      target="_blank"
                    >
                      <EyeOpenIcon className="w-5 h-5 ml-3" />
                    </a>
                  </div>
                </div>
              </div>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="flex flex-col"
              >
                <div className="mt-5 px-5">
                  <p className="text-lg text-[#495057]">Status</p>
                  <select
                    name="selectStatus"
                    className="bg-[#F8F8F8] px-4 w-full h-[40px] outline-none rounded-[5px]"
                    value={formik.values.selectStatus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    {VALUES_MAP.map(({ name, value, payloadValue }) => (
                      <option key={name} value={payloadValue}>
                        {value}
                      </option>
                    ))}
                  </select>
                  {formik.touched.selectStatus && formik.errors.selectStatus ? (
                    <div className="error text-red-500 text-xs">
                      {formik.errors.selectStatus}
                    </div>
                  ) : null}
                </div>

                {request.status?.toLowerCase() !== "completed" && (
                  <div className="flex justify-end flex-1 mt-[2.75rem] px-5">
                    <Button
                      type="button"
                      customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                      variant="warning"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      customStyle="w-[100px] inline-block rounded-[10px] ml-[15px] self-end h-[38px]"
                      variant="primary"
                      type="submit"
                    >
                      Update
                    </Button>
                  </div>
                )}
                {(request.status?.toLowerCase() === "completed" ||
                  showSubmitBtn) && (
                  <div className="mt-10 px-5 ml-[40px]">
                    <Link
                      to={`/app/reports/new-report?a=${
                        request?.requestId
                      }&s=${request?.companyType?.toLowerCase()}`}
                    >
                      <Button
                        customStyle="w-[80%] relative inline-block rounded-[10px] h-[40px]  text-black"
                        variant="primary"
                      >
                        {`Submit report for ${request?.companyName}`}
                      </Button>
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateSolicitorRequest;
