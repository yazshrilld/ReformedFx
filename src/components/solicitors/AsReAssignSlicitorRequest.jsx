import { useContext, useState } from "react";
import { useFormik } from "formik";
import { UserContext } from "context/UserContext";
import { Checkbox } from "@mui/material";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import Modal from "@mui/material/Modal";
import Button from "components/BaseButton";
import * as Yup from "yup";

const initialValues = {
  selectSolicitor: "",
};

const AsReAssignSlicitorRequest = ({ open, createdRequest, handleClose }) => {
  const { user, showToast } = useContext(UserContext);

  const [chek, setChek] = useState(false);

  const handleCheck = (e) => {
    setChek(e.target.checked);
  };

  const sortBy = "solicitorApprovalStatus";
  const sortOrder = "ASC";

  

  

  const validationSchema = Yup.object({
    selectSolicitor: Yup.string().required("Please Select a solicitor"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      
      // console.log(
      //   "SolicitorId: ",
      //   JSON.parse(values.selectSolicitor)?.solicitorId
      // );
      // console.log("StaffUserName: ", userEmail);
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
    {
      label: "Date Registered",
      value: createdRequest?.companyRegistrationDate,
    },
    {
      label: "Company Type",
      value: createdRequest?.companyType,
      format: (val) => (
        <p className="capitalize">{val.replace(/_/g, " ").toLowerCase()}</p>
      ),
    },
  ];

  const bottomDetails = [
    {
      label: "Shareholding Structure",
      value: createdRequest?.shareholdingStructure,
    },
    { label: "Secetary's Name", value: createdRequest?.secretaryName },
    { label: "Proprietor's Name", value: createdRequest?.proprietorsName },
    {
      label: "Residebtial Address of Proprietor",
      value: createdRequest?.proprietorsRegisteredAddress,
    },
    { label: "Status", value: createdRequest?.status },
  ];

  const sideDetails = [
    {
      label: "Status",
      value: createdRequest?.status,
      // value: createdRequest?.status.toLowerCase(),
    },
    { label: "Solicitor", value: createdRequest?.solicitor?.nameOfLawFirm },
    // { label: "Solicitor", value: JSON.stringify(formik.values?.selectSolicitor?.nameOfLawFirm) },
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
          <h1 className="text-xl font-bold mb-3">Request Details</h1>
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
                      <p className="">Documents</p>
                      <a href="http://" target="_blank" rel="noreferrer">
                        <EyeOpenIcon className="w-5 h-5 ml-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 mt-5 px-5">
                {sideDetails?.map(({ label, value }) => (
                  <div key={label}>
                    <p className={`text-[#C2C2C2] text-[13px] fone-medium `}>
                      {label}
                    </p>
                    <p
                      className={`text-[#263238] font-bold ${
                        value === "unassigned"
                          ? "text-[#FD1515] first-letter:capitalize"
                          : value === "assigned"
                          ? "text-[#FDB815] first-letter:capitalize"
                          : "text-[black] first-letter:capitalize"
                      } }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <label className="flex items-center select-none px-2 mt-5">
                <Checkbox size="small" onChange={handleCheck} />
                <p className="text-xs font-medium">Re-Assign</p>
              </label>

              <form onSubmit={formik.handleSubmit} className="flex flex-col">
                <div className="mt-5 px-5">
                  <p className="text-lg text-[#495057]">Solicitor</p>
                  <select
                    name="selectSolicitor"
                    className=" bg-[#F8F8F8] px-4 w-full h-[40px] outline-none rounded-[5px]"
                    value={formik.values.selectSolicitor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!chek}
                  >
                    <option value="" disabled>
                      Select Solicitor
                    </option>

                    
                  </select>
                  {formik.touched.selectSolicitor &&
                  formik.errors.selectSolicitor ? (
                    <div className="error text-red-500 text-xs">
                      {formik.errors.selectSolicitor}
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
                    type="submit"
                  >
                    Assign
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AsReAssignSlicitorRequest;
