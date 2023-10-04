import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

const Warning = ({ open, createdRequest: request, handleClose }) => {
  const value = request?.date_added || "";
  console.log({value});
  const txDate = dayjs(value.split(" ")[0]).format("DD-MMM-YYYY");
  console.log({txDate});

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute w-[40%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem_2rem]">
        <h1 className="text-[#15fd8d] font-bold capitalize text-[20px] mb-3">
          FX SALES{" "}
          <strong className="text-dark">{`[ ₦${request?.fx_rate} ]`}</strong>
        </h1>
        <p>
          {`Your transaction for Source `}
          <strong>{`[ ${request?.source_account} ]`}</strong>
        </p>
        <p>
          Beneficiary: <strong>{`[ ${request?.destination_account} ]`}</strong>
        </p>
        <p>
          Amount Sent: <strong>{`[ $${request?.amount} ]`}</strong>
        </p>
        <p>
          Amount Received:{" "}
          <strong>{`[ ₦${request?.equ_amount} ]`}</strong>
        </p>
        <p>
          Date of Transaction: <strong>{txDate}</strong>
        </p>
      </div>
    </Modal>
  );
};

export default Warning;
