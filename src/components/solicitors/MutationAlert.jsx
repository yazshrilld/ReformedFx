import { useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { getAllSolicitorFn } from "utils/ApiFactory/solicitors";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { assignRequestToSolicitorFn } from "utils/ApiFactory/request";
import Modal from "@mui/material/Modal";
import Button from "components/BaseButton";
import * as Yup from "yup";
import { UserContext } from "context/UserContext";

const initialValues = {
  selectSolicitor: "",
};

const AssignSolicitorRequest = ({ open, createdRequest, handleClose }) => {
  const { user, showToast } = useContext(UserContext);
  const requestId = createdRequest?.requestId;
  const userEmail = user.email;
  const solicitorId = user.solicitorId;
  // console.log("createdRequest: ", createdRequest);

  const sortBy = "solicitorApprovalStatus";
  const sortOrder = "ASC";

  const { data: allSolicitors } = useQuery({
    queryKey: ["all-solicitors", sortBy, sortOrder],
    queryFn: () =>
      getAllSolicitorFn({
        page: 0,
        size: 50,
        sortBy,
        sortOrder,
      }),
    select: (transformedData) => {
      const transform = transformedData.data.data.content.map(
        ({ solicitorId, nameOfLawFirm, solicitorApprovalStatus }) => ({
          solicitorId,
          nameOfLawFirm,
          solicitorApprovalStatus,
        })
        //This map here shows that you dont necessarily have to return a div, you can alo return values
      );
      return transform;
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error?.response?.data?.detail || "An error occurred.",
      });
    },
  });

  const { mutate: assignSolicitor, isLoading } = useMutation({
    // mutationKey: "assignSolicitor",
    mutationFn: assignRequestToSolicitorFn,
    onSuccess: () => {
      handleClose();
      showToast({
        severity: "success",
        message: "Request successfully assigned",
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error?.response?.data?.detail || "An error occurred.",
      });
    },
  });

  const validationSchema = Yup.object({
    selectSolicitor: Yup.string().required("Please Select a solicitor"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        solicitorApprovalStatus: JSON.parse(values.selectSolicitor)
          .solicitorApprovalStatus,
        staffUsername: user.email,
      };

      assignSolicitor({
        id: JSON.parse(values.selectSolicitor).solicitorId,
        payload,
      });
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
      label: "Residential Address of Proprietor",
      value: createdRequest?.proprietorsRegisteredAddress,
    },
    { label: "Status", value: createdRequest?.status },
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
                      <p className="">MD Approval</p>
                      <a href="http://" target="_blank" rel="noreferrer">
                        <EyeOpenIcon className="w-5 h-5 ml-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={formik.handleSubmit} className="flex flex-col">
                <div className="mt-5 px-5">
                  <p className="text-lg text-[#495057]">Solicitor</p>
                  <select
                    name="selectSolicitor"
                    className=" bg-[#F8F8F8] px-4 w-full h-[40px] outline-none rounded-[5px]"
                    value={formik.values.selectSolicitor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select Solicitor
                    </option>

                    {allSolicitors?.map(
                      ({
                        solicitorId,
                        nameOfLawFirm,
                        solicitorApprovalStatus,
                      }) => (
                        <option
                          key={solicitorId}
                          value={JSON.stringify({
                            solicitorId,
                            solicitorApprovalStatus,
                          })}
                        >
                          {nameOfLawFirm}
                        </option>
                      )
                    )}
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
                    isLoading={isLoading}
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

export default AssignSolicitorRequest;
