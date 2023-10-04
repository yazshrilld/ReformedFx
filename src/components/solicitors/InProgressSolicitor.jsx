import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import Button from "components/BaseButton";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const InProgressSolicitor = ({
  open,
  createdRequest: request,
  handleClose,
}) => {
  let showSubmitBtn = true;

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

  const sideDetails = [
    {
      label: "Status",
      value: request?.status,
      // value: createdRequest?.status.toLowerCase(),
    },
    { label: "Company Name", value: request?.companyName },
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InProgressSolicitor;
