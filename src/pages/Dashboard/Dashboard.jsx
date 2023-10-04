import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRequestFn } from "utils/ApiFactory/request";
import { Link } from "react-router-dom";
import {
  csoDashboardTableColumns,
  LegalOfficerDashboardTableColumns,
  solicitorDashboardTableColumns,
} from "assets/data";
import AssignSolicitorRequest from "components/solicitors/AssignSolicitorRequest";
import BaseTable from "components/BaseTable";
import Statistics from "components/Statistics/Statistics";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import CompareReportsModal from "components/solicitors/CompareReportsModal";
import ReAssignSolicitorModal from "components/solicitors/ReAssignSolicitorModal";
import ApproveSolicitorModal from "components/solicitors/ApproveSolicitorModal";
import SolicitorSubmitReport from "components/solicitors/SolicitorSubmitReport";
import UpdateSolicitorRequest from "components/solicitors/UpdateSolicitorRequest";

const Dashboard = () => {
  // const { user } = useContext(UserContext);
  // const myRole = resolveUserRoleAccess(user.role);

  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);

  const tableColumns = {
    1: solicitorDashboardTableColumns,
    2: csoDashboardTableColumns,
    3: LegalOfficerDashboardTableColumns,
    // 4: solicitorDashboardTableColumns,
    // 4: csoDashboardTableColumns,
    // 4: LegalOfficerDashboardTableColumns,
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(false);
  // const [openModal, setOpenModal] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { data: AllRequests, isLoading } = useQuery({
    queryKey: [
      "all-requests",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      },
    ],
    queryFn: () =>
      getAllRequestFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      }),
    select: (data) => {
      const transform = data.data.data.content.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));
      return transform;
    },
  });

  const toggleModal = (_, _1, row) => {
    
    setActiveCreatedRequest(row);
    setOpenModal((prevS) => !prevS);
    // if (row.status === "UNASSIGNED") {
    //   setOpenModal('assign');
    // } else if (row.status === "ASSIGNED" || row.status === "IN_PROGRESS") {
    //   setOpenModal('reassign');
    // } else if (row.status === "COMPLETED") {
    //   setOpenModal('complete');
    // }
  };

  return (
    <>
      <SolicitorSubmitReport
        open={openModal}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal(false)}
      />   
      {/* <AssignSolicitorRequest
        open={openModal === "assign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <CompareReportsModal
        open={openModal === "reassign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <ApproveSolicitorModal
        open={openModal === "complete"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      /> */}

      <Statistics />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Link
            className="text-xs px-6 py-1 bg-primaryDark rounded text-white"
            to="/app/dashboard"
          >
            View All
          </Link>
        </div>

        <BaseTable
          rows={AllRequests || []}
          columns={tableColumns[myRole]}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
        />
      </div>
    </>
  );
};

export default Dashboard;
