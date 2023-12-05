import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "context/UserContext";

import {
  csoDashboardTableColumns,
  LegalOfficerDashboardTableColumns,
  solicitorDashboardTableColumns,
} from "assets/data";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import BaseTable from "components/BaseTable";
import CompareReportsModal from "components/solicitors/CompareReportsModal";
import AsReAssignSlicitorRequest from "components/solicitors/AsReAssignSlicitorRequest";
import InputFormField from "components/InputFormField";
import UpdateSolicitorRequest from "components/solicitors/UpdateSolicitorRequest";
import Warning from "components/solicitors/Warning";
import Button from "components/BaseButton";
import DateSearchFilter from "components/DateSearchFilter/DateSearchFilter";
import InProgressSolicitor from "components/solicitors/InProgressSolicitor";
import { fxDataColumns } from "assets/data";
import { FXTX_DUMMY_DATA } from "assets/data";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { fetchFxFn } from "utils/ApiFactory/fxTxApi";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useFormik } from "formik";

//
const validationSchema = Yup.object().shape({
  rawStartDate: Yup.date().when("rawEndDate", (rawEndDate, schema) => {
    return schema.test({
      test: (rawStartDate) => rawStartDate,
      message: () => "Start date cannot be lesser than end date",
    });
  }),
  rawEndDate: Yup.date().max(
    new Date(),
    "End date cannot be beyond today's date"
  ),
});

const DashboardNew = () => {
  const { user, fxSocketStatus, setFxRates } = useContext(UserContext);
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  // const data = FXTX_DUMMY_DATA;
  // const fxData = data[0]?.data?.blotter;
  // const myRole = resolveUserRoleAccess(user.role);
  // console.log("Length Of Fx :", fxData.length);
  console.log({ user });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fxSearchedData, setFxSearchedData] = useState([]);

  const { getSessionStorage } = useSessionStorage;
  const fxValue = sessionStorage.getItem("start");
  // const fxStatus = sessionStorage.getItem("status");
  // console.log({ fxValue, fxStatus });
  const fxRatess = sessionStorage.getItem("fxRate");

  // const [allSelectedRows, setAllSelectedRows] = useState([]);
  // const branchCode = sessionStorage.getItem("__brc");
  // const [setSearch] = useState("");
  const [search, setSearch] = useState("");

  const showBatchModal = () => {
    setOpenModal("batchAssign");
  };
  const tableColumns = {
    1: solicitorDashboardTableColumns,
    2: csoDashboardTableColumns,
    3: LegalOfficerDashboardTableColumns,
    5: LegalOfficerDashboardTableColumns,
    // 4: solicitorDashboardTableColumns,
    // 4: csoDashboardTableColumns,
    // 4: LegalOfficerDashboardTableColumns,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetch-fx-now"],
    queryFn: () =>
      fetchFxFn({
        startdate: new Date(),
        enddate: new Date(),
      }),
    onSuccess: (data) => {
      console.log(data, "I have loaded the darta");
    },
    select: (data) => {
      const rate = data?.data?.data?.current_fx_rate;
      const fxBlotterData = data?.data?.data?.blotter?.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));
      setFxRates(rate);
      // console.log("From Select: ", { rate, data, fxBlotterData });
      return { rate, fxBlotterData };
    },
    cacheTime: 0,
    staleTime: 0,
  });

  const toggleModal = (_, _1, row) => {
    setActiveCreatedRequest(row);
    setOpenModal((prevS) => !prevS);

    if (myRole === 1 && row.status === "ASSIGNED") {
      setOpenModal("updateSolicitor");
    } else if (myRole === 1 && row.status === "COMPLETED") {
      setOpenModal("warning");
    } else if (myRole === 1 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgressSolicitor");
    } else if (myRole === 2) {
      setOpenModal("viewDetails");
    } else if (myRole === 3 && row.status === "UNASSIGNED") {
      setOpenModal("unassign");
    } else if (myRole === 3 && row.status === "ASSIGNED") {
      setOpenModal("reassign");
    } else if (myRole === 3 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgress");
    } else if (myRole === 3 && row.status === "COMPLETED") {
      setOpenModal("complete");
    } else if (myRole === 5 && row.status === "UNASSIGNED") {
      setOpenModal("unassign");
    } else if (myRole === 5 && row.status === "ASSIGNED") {
      setOpenModal("reassign");
    } else if (myRole === 5 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgress");
    } else if (myRole === 5 && row.status === "COMPLETED") {
      setOpenModal("complete");
    } else {
      setOpenModal("warning");
    }
  };

  const searchFxData = (mySearchedData) => {
    setFxSearchedData((prevS) => ({
      ...prevS,
      fxSearchedData: mySearchedData,
    }));
  };

  // console.log("From Date Filter: ", data);

  //

  const DATE_FIELD_VALUES = {
    rawStartDate: dayjs().format("YYYY-MM-DD"),
    rawEndDate: dayjs().format("YYYY-MM-DD"),
  };

  const handleSubmit = async (values, { resetForm }) => {
    refetch();
    // console.log("Search Values: ", ...rest);
  };

  const formik = useFormik({
    initialValues: DATE_FIELD_VALUES, // from props/parent
    validationSchema: validationSchema,
    onSubmit: handleSubmit, // from props/p
  });

  const {
    data: SearchedData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["date-fetch-fx"],
    queryFn: () =>
      fetchFxFn({
        startdate: dayjs(formik.values.rawStartDate).format("DD-MMM-YYYY"),
        enddate: dayjs(formik.values.rawEndDate).format("DD-MMM-YYYY"),
      }),
    onSuccess: (data) => {
      // console.log(data, "from search query");
    },
    select: (data) => {
      const rate = data?.data?.data?.current_fx_rate;
      const fxBlotterData = data?.data?.data?.blotter?.map((itm) => ({
        ...itm,
        rate,
        action: "ActionButton",
      }));
      // setFxRates(rate)
      // console.log("From Select: ", { rate, data, fxBlotterData });
      return fxBlotterData;
    },
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  });

  // console.log(SearchedData.length);

  //
  return (
    <>
      <AsReAssignSlicitorRequest
        open={openModal === "reassign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <CompareReportsModal
        open={openModal === "complete"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        myRole={myRole}
      />
      <UpdateSolicitorRequest
        open={openModal === "updateSolicitor"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <Warning
        open={openModal === "warning"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        // yaz
      />
      <InProgressSolicitor
        open={openModal === "inProgressSolicitor"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        // yaz
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <div className="relative">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <button
                className={`absolute right-0 top-0 -translate-y-2 translate-x-4 h-[12px] w-[12px]  border-2 border-solid border-blue rounded-[50%] ${
                  fxSocketStatus ? "bg-green-500" : "bg-red-500 animate-ping"
                  // fxStatus ? "bg-green-500" : "bg-red-500"
                }`}
              ></button>
            </div>
            <div
              className={`ml-5 font-medium border-l px-4 ${
                fxSocketStatus ? "text-green-500" : "text-red-500"
              }`}
            >
              FX STATUS: {fxSocketStatus ? "ACTIVE" : "STOPPED"}
              {/* FX STATUS: {fxStatus ? "ACTIVE" : "STOPPED"} */}
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 p-8 gap-14">
            <DateSearchFilter formik={formik} isFetching={isFetching} />
          </div>
        </div>
        {/* {
          isLoading && (
            <h1>Loading Data...</h1>
          )
        } */}
      </div>
      {SearchedData?.length > 0 || data?.fxBlotterData?.length > 0 ? (
        <BaseTable
          rows={
            formik.values.rawStartDate && formik.values.rawEndDate
              ? SearchedData || data?.fxBlotterData || []
              : data?.fxBlotterData || []
          }
          // rows={data?.fxBlotterData || []}
          columns={fxDataColumns}
          // columns={tableColumns[myRole]}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          // isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          T
          // totalPage={fxData?.length}
          // totalPage={data?.fxBlotterData?.length}
          // allCheckboxOnChange={allCheckboxOnChange}
          search={search}
          filterKey="companyName"
        />
      ) : (
        <div>
          <h1 className={`font-semibold mb-1 text-lg`}>No Records Found</h1>
          <p>{`You have no records for `}<strong>{`[ ${dayjs(new Date()).format(
            "DD-MM-YYYY HH:mm A"
          )} ]`}</strong></p>
        </div>
      )}
    </>
  );
};

export default DashboardNew;
