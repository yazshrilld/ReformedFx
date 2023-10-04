import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { approveSolicitorFn } from "utils/ApiFactory/solicitors";
import { UserContext } from "context/UserContext";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "components/BaseButton";

const ApproveSolicitorModal = ({
  open,
  solicitor,
  handleClose,
  handleFile,
  myRole,
}) => {
  const { showToast } = useContext(UserContext);
  const [showPopUp, setShowPopUp] = useState({
    open: false,
    type: "approve",
  });

  const [fileFetchError, setFileFetchError] = useState("");
  const [isFetchingError, setIsFetchingError] = useState(false);

  const handleFileClick = async () => {
    await handleFile(
      solicitor?.mdApproval,
      setFileFetchError,
      setIsFetchingError
    );
  };

  const details = [
    { label: "Name of Law Firm", value: solicitor?.nameOfLawFirm },
    { label: "Address", value: solicitor?.address },
    { label: "Email", value: solicitor?.officialEmailAddressOfFirm },
    { label: "Principal Partner", value: solicitor?.nameOfPrincipalPartner },
    { label: "Bank Account Name", value: solicitor?.bankAccountName },
    { label: "Bank Account Number", value: solicitor?.bankAccountNumber },
    { label: "Status", value: solicitor?.solicitorApprovalStatus },
  ];

  const { mutate: approveSolicitor, isLoading } = useMutation({
    mutationKey: ["approveSolicitor"],
    mutationFn: approveSolicitorFn,
    onSuccess: () => {
      handleClose();
      showToast({
        severity: "success",
        message: "Solicitor approved successfully",
      });
      setShowPopUp({ open: false, type: "" });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error?.response?.data?.detail || "Could not process request.",
      });
    },
  });

  const handleSubmit = () => {
    if (showPopUp.type === "approve") {
      approveSolicitor({
        id: solicitor.solicitorId,
        staffEmail: "headlegal@providusbank.com",
        solicitorEmail: solicitor.officialEmailAddressOfFirm,
      });
    } else {
      // console.log("jdhkjshbkj");
    }
  };

  const handlePopUp = (type) => {
    setShowPopUp({
      open: true,
      type,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute w-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem_2rem]">
        <Dialog
          open={showPopUp.open}
          onClose={() => setShowPopUp({ open: false, type: "" })}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>CONFIRM</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Kindly confirm if you want to ${showPopUp.type} this solicitor`}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mt-6 mb-3">
            <Button
              variant="warning"
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              onClick={() => setShowPopUp({ open: false, type: "" })}
            >
              No
            </Button>
            <Button
              variant={`${showPopUp.type === "decline" ? "error" : "success"}`}
              // variant="success"
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* {JSON.stringify(solicitor)} */}
        <div>
          <h1 className="text-xl font-bold mb-5">Solicitor Details</h1>
          <div className="grid grid-cols-9">
            <div className="col-span-6 grid grid-cols-2 gap-6 border-r">
              {details.map(({ label, value }) => (
                <div key={label} className="">
                  <p className="text-[#C2C2C2] text-[13px] font-medium">
                    {label}
                  </p>
                  <p className="text-[#263238] font-bold capitalize text-[20px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="col-span-3 px-6 text-[#344248] font-medium">
              <h2 className="">Uploaded Documents</h2>

              <div className="flex items-center mt-3">
                <p className="text-[#C2C2C2] text-[13px]">Documents</p>
                <span className="cursor-pointer">
                  <EyeOpenIcon
                    className="w-5 h-5 ml-3"
                    onClick={handleFileClick}
                  />
                </span>
              </div>
              {isFetchingError ? (
                <span className="text-red-500 font-medium">
                  {fileFetchError}
                </span>
              ) : null}
            </div>
          </div>

          {(myRole === 4 || myRole === 5) && (
            <div className="flex justify-end gap-5">
              <Button
                variant="error"
                customStyle="w-[150px] block mt-8 h-[34px] rounded-[6px] text-sm"
                onClick={() => handlePopUp("decline")}
              >
                Decline
              </Button>
              <Button
                variant="success"
                customStyle="w-[150px] block mt-8 h-[34px] rounded-[6px] text-sm"
                onClick={() => handlePopUp("approve")}
              >
                Approve
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ApproveSolicitorModal;
