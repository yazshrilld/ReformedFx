import Modal from "@mui/material/Modal";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";

const RejectedRequestModal = ({
  open,
  createdRequest,
  handleClose,
  myRole,
}) => {

//   const topDetails = [
//     { label: "Company Name", value: createdRequest?.companyName },
//     { label: "Date Submitted", value: createdRequest?.dateCreated },
//   ];

  

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
        {/* <div className="">
          <h1 className="text-xl font-bold mb-3">View Details</h1>
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
            </div>
          </div>
        </div> */}
        <h1 className="text-red-500 font-bold capitalize text-[20px] mb-3">!!! Rejected Report !!!</h1>
         <p>{`Your report for `}<strong>{`[ ${createdRequest?.companyName} ]`}</strong>{` has been accessed but failed to meet the standard we expected, please refer to your mail for more details on how to proceed from here. Thank you`}</p>
      </div>
    </Modal>
  );
};

export default RejectedRequestModal;
