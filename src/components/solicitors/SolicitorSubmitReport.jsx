import Modal from "@mui/material/Modal";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
// import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
// import UpdateStatus from "components/UpdateStatus";
import Button from "components/BaseButton";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// import { Checkbox } from "@mui/material";

const initialValues = {
  selectStatus: "",
};

const statusOptions = {
  INP: {
    name: "INP",
    value: "In-Progress",
    payloadValue: "IN_PROGRESS",
  },
  CPD: {
    name: "CPD",
    value: "Completed",
    payloadValue: "COMPLETED",
  },
};

const VALUES_MAP = Object.values(statusOptions);

const SolicitorSubmitReport = ({ open, createdRequest, handleClose }) => {

  const validationSchema = Yup.object({
    selectStatus: Yup.string().required("Please Select a status"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSUbmit: (values) => {
      // console.log("Status: ", values);
    },
  });

  const topDetails = [
    { label: "Company Name", value: createdRequest?.companyName },
    { label: "Date Submitted", value: createdRequest?.dateCreated },

    {
      label: "Company Registered Address",
      value: createdRequest?.companyRegisteredAddress,
    },
    { label: "RC Number", value: createdRequest?.rcNumber },
    { label: "Reason", value: createdRequest?.reason },
    { label: "Company Type", value: createdRequest?.companyType },
    {
      label: "Date Registered",
      value: createdRequest?.companyRegistrationDate,
    },
  ];

  const bottomDetails = [
    {
      label: "Shareholding Structure",
      value: createdRequest?.shareholdingStructure,
    },
    createdRequest?.reason
      ? {
          label: "Reason",
          value: createdRequest?.reason,
        }
      : {},
    { label: "Status", value: createdRequest?.status },
    createdRequest?.proprietorsName?.length > 0
      ? {
          label: "Proprietor's Name",
          value: createdRequest?.proprietorsName,
        }
      : createdRequest?.directors?.length > 0
      ? {
          label: "Directors's Name",
          value: createdRequest?.directors?.[0]?.directorName,
        }
      : createdRequest?.trustees?.length > 0
      ? {
          label: "Trustee's Name",
          value: createdRequest?.trustees?.[0]?.trusteeName,
        }
      : {},
    createdRequest?.proprietorsRegisteredAddress?.length > 0
      ? {
          label: "Proprietor's Registration Address",
          value: createdRequest?.proprietorsRegisteredAddress,
        }
      : createdRequest?.directors?.length > 0
      ? {
          label: "Directors's Registration Address",
          value: createdRequest?.directors?.[0]?.directorResidentialAddress,
        }
      : createdRequest?.trustees?.length > 0
      ? {
          label: "Trustee's Registration Address",
          value: createdRequest?.trustees?.[0]?.trusteeResidentialAddress,
        }
      : {},
    createdRequest?.secretaryName?.length > 0
      ? { label: "Secetary's Name", value: createdRequest?.secretaryName }
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
                {[...Array(4).keys()].map((itm) => (
                  <div key={itm} className="">
                    <div className="flex items-center text-[#C2C2C2] font-medium">
                      <p className="">MD Approval</p>
                      <a href="http://" target="_blank" rel="noreferrer">
                        <EyeOpenIcon className="w-5 h-5 ml-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <form action="">
                <div className="mt-5 px-5">
                  <p className="text-lg text-[#495057]">Status</p>
                  <select
                    name="selectStatus"
                    className="bg-[#F8F8F8] px-4 w-full h-[40px] outline-none rounded-[5px]"
                    value={formik.values.selectStatus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select status</option>
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
                <div className="flex justify-end flex-1 mt-8 px-5">
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
                    isLoading={false}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
                {formik.values.selectStatus === "COMPLETED" && (
                  <div className="mt-10 px-5 ml-[40px]">
                    {createdRequest?.companyType === "BUSINESS_NAME" ? (
                      <Link to="/app/reports/new-report?s=business_name">
                        <Button
                          customStyle="w-[80%] relative inline-block rounded-[10px] h-[40px]  text-black"
                          variant="primary"
                        >
                          {`Submit report for ${createdRequest?.companyName}`}
                        </Button>
                      </Link>
                    ) : createdRequest?.companyType ===
                      "LIMITED_LIABILITY_COMPANY" ? (
                      <Link to="/app/reports/new-report?s=limited_liability_company">
                        <Button
                          customStyle="w-[80%] relative inline-block rounded-[10px] h-[40px] text-black"
                          variant="primary"
                        >
                          {`Submit report for ${createdRequest?.companyName}`}
                        </Button>
                      </Link>
                    ) : createdRequest?.companyType ===
                      "INCORPORATED_TRUSTEES" ? (
                      <Link to="/app/reports/new-report?s=incorporated_trustees">
                        <Button
                          customStyle="w-[80%] relative inline-block rounded-[10px] h-[40px]  text-black"
                          variant="primary"
                        >
                          {`Submit report for ${createdRequest?.companyName}`}
                        </Button>
                      </Link>
                    ) : (
                      ""
                    )}
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

export default SolicitorSubmitReport;
