import { ReactComponent as DashboardIcon } from "assets/svg/home.svg";
import { ReactComponent as CreateRequestIcon } from "assets/svg/note_add.svg";
import { ReactComponent as Requests } from "assets/svg/quick_reference_all.svg";
import { ReactComponent as PendingRequestuests } from "assets/svg/pending_request.svg";
import { ReactComponent as CompleteRequest } from "assets/svg/task.svg";
import { ReactComponent as Reports } from "assets/svg/contract.svg";
import { ReactComponent as ApprovedRequest } from "assets/svg/fact_check.svg";
import { ReactComponent as Solicitors } from "assets/svg/contacts.svg";
import dayjs from "dayjs";

// initial form values for creating a request

export const LimitedLiabilityFormInitialValues = {
  companyName: "",
  rcNumber: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  document: {
    cacDocument: "",
    document2: "",
    document3: "",
    document4: "",
    document5: "",
  },
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  secretaryName: "",
  shareholdingStructure: "",
  reason: "",
  staffUsername: "",
  companyType: "LIMITED_LIABILITY_COMPANY",
  directors: [],
  directorResidentialAddress: [],
  trustees: [],
};

export const TrusteeFormInitialValues = {
  companyName: "",
  rcNumber: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  document: {
    cacDocument: "",
    document2: "",
    document3: "",
    document4: "",
    document5: "",
  },
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  secretaryName: "",
  shareholdingStructure: "",
  reason: "",
  staffUsername: "",
  companyType: "INCORPORATED_TRUSTEES",
  directors: [],
  trusteeResidentialAddress: [],
  trustees: [],
};

export const BusinessReportInitialValues = {
  companyName: "",
  rcNumber: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  solicitorReportDocument1: "",
  solicitorReportDocument2: "",
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  secretaryName: "",
  shareholdingStructure: "",
  solicitorComment: "The Company is who they say they are",
  companyType: "BUSINESS_NAME",
  directors: [],
  trustees: [],
};

export const LimitedLiabilityReportInitialValues = {
  companyName: "",
  rcNumber: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  solicitorReportDocument1: "",
  solicitorReportDocument2: "",
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  secretaryName: "",
  shareholdingStructure: "",
  solicitorComment: "The Company is who they say they are",
  companyType: "LIMITED_LIABILITY_COMPANY",
  directors: [],
  directorResidentialAddress: [],
  trustees: [],
};

export const TrusteeReportInitialValues = {
  companyName: "",
  rcNumber: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  solicitorReportDocument1: "",
  solicitorReportDocument2: "",
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  secretaryName: "",
  shareholdingStructure: "",
  solicitorComment: "The Company is who they say they are",
  companyType: "INCORPORATED_TRUSTEES",
  directors: [],
  trusteeResidentialAddress: [],
  trustees: [],
};

export const createRequestFormInitialValues = {
  companyName: "",
  companyRegisteredAddress: "",
  companyRegistrationDate: "",
  companyType: "",
  directorName: "",
  directorResidentialAddress: "",
  // document: "",
  proprietorsName: "",
  proprietorsRegisteredAddress: "",
  rcNumber: "",
  reason: "",
  secretaryName: "",
  shareholdingStructure: "",
  staffUsername: "",
  trusteeName: "",
  trusteeResidentialAddress: "",
};

// initial menu values for creating a navigation optios
export const navigation = (role) => [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    href: "/app/dashboard",
    role: true,
  },
  {
    name: "Trade",
    icon: <Reports />,
    href: "/app/trade",
    role: true,
    dropdown: [
      {
        label: "Limit",
        href: "/app/trade/limit",
        role: [2].includes(role),
      },
      {
        label: "Approved Time",
        href: "/app/trade/approved-time",
        role: [2].includes(role),
      },
      {
        label: "Exception",
        href: "/app/trade/exceptional-trade",
        role: [2, 4].includes(role),
      }
    ],
  },
];

// initial table values columns for creating a table
// CSO table columns
export const csoDashboardTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 90,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];

export const csoCreateRequestTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 90,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];

// Legal table columns
export const LegalOfficerDashboardTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 120 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
    format: (val) => (
      <p className="capitalize">{val.replace(/_/g, " ").toLowerCase()}</p>
    ),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const LegalOfficerPendingCreateRequestTableColumns = [
  { id: "companyName", label: "Sol Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  // {
  //   id: "reason",
  //   label: "Reason",
  //   minWidth: 90,
  // },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const LegalOfficerCompleteCreateRequestTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "solicitor",
    label: "Solicitor",
    minWidth: 90,
    format: () => "Sol Ade Inc.",
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const LegalOfficerSolicitorsTableColumns = [
  { id: "nameOfLawFirm", label: "Firm Name", minWidth: 90 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "officialEmailAddressOfFirm",
    label: "Email",
    minWidth: 90,
  },
  {
    id: "nameOfPrincipalPartner",
    label: "Principal",
    minWidth: 90,
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    // format: (val, data) => (
    //   <button
    //     className="bg-darkYellow py-[5px] px-4 text-white rounded"
    //     onClick={() => {
    //       setActiveSolicitor(data);
    //       toggleModal();
    //     }}
    //   >
    //     {val}
    //   </button>
    // ),
  },
];
export const LegalOfficerUnassignedSolicitorsTableColumns = [
  { id: "nameOfLawFirm", label: "Firm Name", minWidth: 90 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "officialEmailAddressOfFirm",
    label: "Email",
    minWidth: 90,
  },
  {
    id: "nameOfPrincipalPartner",
    label: "Principal",
    minWidth: 90,
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "solicitorApprovalStatus",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "APPROVED"
            ? "text-[#009E19]"
            : val === "UNAPPROVED"
            ? "text-[#FD1515]"
            : ""
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    // format: (val, data) => (
    //   <button
    //     className="bg-darkYellow py-[5px] px-4 text-white rounded"
    //     onClick={() => {
    //       setActiveSolicitor(data);
    //       toggleModal();
    //     }}
    //   >
    //     {val}
    //   </button>
    // ),
  },
];
export const LegalOfficerReportsTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 90,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];

// Solicitor table columns
export const solicitorDashboardTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const solicitorPendingRequestTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  // {
  //   id: "reason",
  //   label: "Reason",
  //   minWidth: 90,
  // },
  {
    id: "status",
    label: "Status",
    minWidth: 90,
    format: (val) => (
      <p
        className={`${
          val === "UNASSIGNED"
            ? "text-[#FD1515]"
            : val === "ASSIGNED"
            ? "text-[#FDB815]"
            : "text-[#009E19]"
        } capitalize`}
      >
        {val.toLowerCase()}
      </p>
    ),
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const solicitorCompleteRequestTableColumns = [
  { id: "companyName", label: "Company Name", minWidth: 90 },
  { id: "rcNumber", label: "RC Number", minWidth: 100 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 90,
  },
  {
    id: "solicitor",
    label: "Solicitor",
    minWidth: 90,
    format: () => "Ade Inc.",
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];
export const solicitorApprovedRequestTableColumns = [
  { id: "nameOfLawFirm", label: "Firm Name", minWidth: 90 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "officialEmailAddressOfFirm",
    label: "Email",
    minWidth: 90,
  },
  {
    id: "nameOfPrincipalPartner",
    label: "Principal",
    minWidth: 90,
  },
  {
    id: "dateCreated",
    label: "Date",
    minWidth: 90,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    // format: (val, data) => (
    //   <button
    //     className="bg-darkYellow py-[5px] px-4 text-white rounded"
    //     onClick={() => {
    //       setActiveSolicitor(data);
    //       toggleModal();
    //     }}
    //   >
    //     {val}
    //   </button>
    // ),
  },
];

// initial dummy data values for creating the data in the table
export const DummyRowsBusiness = [
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-27 20:26:15",
    updatedBy: null,
    dateUpdated: null,
    requestId: 1,
    companyName: "Yaz Inc.",
    companyRegisteredAddress: "31 VI Lagos",
    companyRegistrationDate: "03-May-2010",
    rcNumber: "1234567809",
    companyType: "BUSINESS_NAME",
    shareholdingStructure:
      "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
    proprietorsName: "Nata Mike",
    secretaryName: "Secretary Clintons",
    proprietorsRegisteredAddress: "thee bahamas",
    directors: [],
    trustees: [],
    reason: "accountant opening",
    status: "UNASSIGNED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document3:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document4:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document5:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-27 20:26:15",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Nata Inc.",
      companyRegisteredAddress: "31 VI Lagos",
      companyRegistrationDate: "03-May-2010",
      rcNumber: "1234567809",
      companyType: "BUSINESS_NAME",
      shareholdingStructure:
        "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
      proprietorsName: "Nata Mike",
      secretaryName: "Secretary Clintons",
      proprietorsRegisteredAddress: "thee bahamas",
      directors: [],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-27 20:26:15",
    updatedBy: null,
    dateUpdated: null,
    requestId: 1,
    companyName: "Nata Inc.",
    companyRegisteredAddress: "31 VI Lagos",
    companyRegistrationDate: "03-May-2010",
    rcNumber: "1234567809",
    companyType: "LIMITED_LIABILITY_COMPANY",
    shareholdingStructure:
      "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
    proprietorsName: "Nata Mike",
    secretaryName: "Secretary Clintons",
    proprietorsRegisteredAddress: "thee bahamas",
    directors: [],
    trustees: [],
    reason: "accountant opening",
    status: "COMPLETED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document3:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document4:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document5:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-27 20:26:15",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Nata Inc.",
      companyRegisteredAddress: "31 VI Lagos",
      companyRegistrationDate: "03-May-2010",
      rcNumber: "1234567809",
      companyType: "BUSINESS_NAME",
      shareholdingStructure:
        "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
      proprietorsName: "Nata Mike",
      secretaryName: "Secretary Clintons",
      proprietorsRegisteredAddress: "thee bahamas",
      directors: [],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-27 20:26:15",
    updatedBy: null,
    dateUpdated: null,
    requestId: 1,
    companyName: "Nata Inc.",
    companyRegisteredAddress: "31 VI Lagos",
    companyRegistrationDate: "03-May-2010",
    rcNumber: "1234567809",
    companyType: "BUSINESS_NAME",
    shareholdingStructure:
      "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
    proprietorsName: "Nata Mike",
    secretaryName: "Secretary Clintons",
    proprietorsRegisteredAddress: "thee bahamas",
    directors: [],
    trustees: [],
    reason: "accountant opening",
    status: "UNASSIGNED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document3:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document4:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document5:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-27 20:26:15",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Nata Inc.",
      companyRegisteredAddress: "31 VI Lagos",
      companyRegistrationDate: "03-May-2010",
      rcNumber: "1234567809",
      companyType: "BUSINESS_NAME",
      shareholdingStructure:
        "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
      proprietorsName: "Nata Mike",
      secretaryName: "Secretary Clintons",
      proprietorsRegisteredAddress: "thee bahamas",
      directors: [],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-27 20:26:15",
    updatedBy: null,
    dateUpdated: null,
    requestId: 1,
    companyName: "Nata Inc.",
    companyRegisteredAddress: "31 VI Lagos",
    companyRegistrationDate: "03-May-2010",
    rcNumber: "1234567809",
    companyType: "BUSINESS_NAME",
    shareholdingStructure:
      "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
    proprietorsName: "Nata Mike",
    secretaryName: "Secretary Clintons",
    proprietorsRegisteredAddress: "thee bahamas",
    directors: [],
    trustees: [],
    reason: "accountant opening",
    status: "ASSIGNED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document3:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document4:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document5:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-27 20:26:15",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Nata Inc.",
      companyRegisteredAddress: "31 VI Lagos",
      companyRegistrationDate: "03-May-2010",
      rcNumber: "1234567809",
      companyType: "BUSINESS_NAME",
      shareholdingStructure:
        "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
      proprietorsName: "Nata Mike",
      secretaryName: "Secretary Clintons",
      proprietorsRegisteredAddress: "thee bahamas",
      directors: [],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-27 20:26:15",
    updatedBy: null,
    dateUpdated: null,
    requestId: 1,
    companyName: "Nata Inc.",
    companyRegisteredAddress: "31 VI Lagos",
    companyRegistrationDate: "03-May-2010",
    rcNumber: "1234567809",
    companyType: "BUSINESS_NAME",
    shareholdingStructure:
      "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
    proprietorsName: "Nata Mike",
    secretaryName: "Secretary Clintons",
    proprietorsRegisteredAddress: "thee bahamas",
    directors: [],
    trustees: [],
    reason: "accountant opening",
    status: "COMPLETED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document3:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document4:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
      document5:
        "C:/Users/NAgbara1/src/main/resources/static/nata inc./helloWord.pdf",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-27 20:26:15",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Nata Inc.",
      companyRegisteredAddress: "31 VI Lagos",
      companyRegistrationDate: "03-May-2010",
      rcNumber: "1234567809",
      companyType: "BUSINESS_NAME",
      shareholdingStructure:
        "Nathan holds 70% stake in Nate inc with 80% voting right while Williams hold 30%",
      proprietorsName: "Nata Mike",
      secretaryName: "Secretary Clintons",
      proprietorsRegisteredAddress: "thee bahamas",
      directors: [],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
];

export const DummyRowLimimted = [
  {
    createdBy: "nagbara@providusbank.com",
    dateCreated: "2023-08-01 17:29:39",
    updatedBy: "musa.yazid49@gmail.com",
    dateUpdated: "2023-08-10 11:27:18",
    requestId: 7,
    companyName: "Akoko",
    companyRegisteredAddress: "2, Makinde Estate",
    companyRegistrationDate: "29-May-2023",
    rcNumber: "0282984",
    companyType: "LIMITED_LIABILITY_COMPANY",
    shareholdingStructure: "30% interest rate",
    proprietorsName: null,
    secretaryName: null,
    proprietorsRegisteredAddress: null,
    directors: [
      {
        directorName: "Yazidaaaaa",
        directorResidentialAddress: "2, Alex Avenue",
      },
    ],
    trustees: [],
    reason: "Acc Open",
    status: "COMPLETED",
    solicitor: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-24 19:22:21",
      updatedBy: "ymusa@providusbank.com",
      dateUpdated: "2023-07-24 19:48:52",
      solicitorId: 7,
      nameOfLawFirm: "Ogba Cotjvpany",
      address: "Ogba User",
      officialEmailAddressOfFirm: "musa.yazid49@gmail.com",
      nameOfPrincipalPartner: "Ogba Ogba",
      bankAccountName: "Ogabausefulness",
      bankAccountNumber: "5634567935",
      solicitorApprovalStatus: "APPROVED",
      role: "Solicitor",
      mdApproval: "",
    },
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/akoko/Receipt002450528152556.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/akoko/153380941156449.pdf",
      document3: "",
      document4: "",
      document5: "",
    },
    solicitorReport: {
      createdBy: "nagbara@providusbank.com",
      dateCreated: "2023-08-01 17:29:39",
      updatedBy: null,
      dateUpdated: "2023-08-11 14:31:38",
      companyName: "ks",
      companyRegisteredAddress: "kjdh",
      companyRegistrationDate: "24-Aug-2023",
      rcNumber: "9283",
      companyType: "LIMITED_LIABILITY_COMPANY",
      shareholdingStructure: "jhda",
      proprietorsName: null,
      secretaryName: null,
      proprietorsRegisteredAddress: null,
      directors: [
        {
          directorName: "Yazidaaaaa",
          directorResidentialAddress: "2, Alex Avenue",
        },
      ],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
];

export const DummyRowsTrustees = [
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-08-01 16:54:31",
    updatedBy: "ymusa@providusbank.com",
    dateUpdated: "2023-08-01 17:37:56",
    requestId: 6,
    companyName: "Treys Socials",
    companyRegisteredAddress: "2, alex manches",
    companyRegistrationDate: "31-Aug-2023",
    rcNumber: "2098902",
    companyType: "INCORPORATED_TRUSTEES",
    shareholdingStructure: "50% shares increase",
    proprietorsName: null,
    secretaryName: null,
    proprietorsRegisteredAddress: null,
    directors: [],
    trustees: [
      {
        trusteeName: "2, deliquent close",
        trusteeResidentialAddress: "subomi",
      },
    ],
    reason: "Acc open",
    status: "ASSIGNED",
    solicitor: null,
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/treys socials/911788729684726 (4).pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/treys socials/153380941156449.pdf",
      document3: "",
      document4: "",
      document5: "",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-08-01 16:54:31",
      updatedBy: null,
      dateUpdated: null,
      companyName: "Treys Socials",
      companyRegisteredAddress: "2, alex manches",
      companyRegistrationDate: "31-Aug-2023",
      rcNumber: "2098902",
      companyType: "INCORPORATED_TRUSTEES",
      shareholdingStructure: "50% shares increase",
      proprietorsName: null,
      secretaryName: null,
      proprietorsRegisteredAddress: null,
      directors: [],
      trustees: [
        {
          trusteeName: "2, deliquent close",
          trusteeResidentialAddress: "subomi",
        },
      ],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
];

export const solicitorDummyData = [
  {
    createdBy: "test@providusbank.com",
    dateCreated: "2023-07-14 12:21:49",
    updatedBy: "test@providusbank.com",
    dateUpdated: "2023-07-21 12:53:44",
    solicitorId: 1,
    nameOfLawFirm: "Abiolw and co.",
    address: "Mainland Yaba",
    officialEmailAddressOfFirm: "abiola@sample.com",
    nameOfPrincipalPartner: "Abiola Atanda",
    bankAccountName: "Abiola and co",
    bankAccountNumber: "1023456789",
    solicitorApprovalStatus: "APPROVED",
    role: "Solicitor",
    mdApproval: "",
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-24 18:20:50",
    updatedBy: "ymusa@providusbank.com",
    dateUpdated: "2023-07-24 18:40:25",
    solicitorId: 5,
    nameOfLawFirm: "Exnenkst Cotjvpany",
    address: "Lagos phase 2",
    officialEmailAddressOfFirm: "yeezshlld@gmail.com",
    nameOfPrincipalPartner: "trello Strings",
    bankAccountName: "eljnskndt",
    bankAccountNumber: "1234567935",
    solicitorApprovalStatus: "APPROVED",
    role: "Solicitor",
    mdApproval: "",
    action: "ActionButton",
  },
  {
    createdBy: "test@providusbank.com",
    dateCreated: "2023-07-24 18:58:34",
    updatedBy: "headlegal@providusbank.com",
    dateUpdated: "2023-07-24 18:58:59",
    solicitorId: 6,
    nameOfLawFirm: "Nathan's law firm",
    address: "Mainland Yaba",
    officialEmailAddressOfFirm: "agbaranath@gmail.com",
    nameOfPrincipalPartner: "Nate Mike",
    bankAccountName: "Nathan's law firm",
    bankAccountNumber: "1123456789",
    solicitorApprovalStatus: "APPROVED",
    role: "Solicitor",
    mdApproval: "",
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-24 19:22:21",
    updatedBy: "ymusa@providusbank.com",
    dateUpdated: "2023-07-24 19:48:52",
    solicitorId: 7,
    nameOfLawFirm: "Ogba Cotjvpany",
    address: "Ogba User",
    officialEmailAddressOfFirm: "musa.yazid49@gmail.com",
    nameOfPrincipalPartner: "Ogba Ogba",
    bankAccountName: "Ogabausefulness",
    bankAccountNumber: "5634567935",
    solicitorApprovalStatus: "APPROVED",
    role: "Solicitor",
    mdApproval: "",
    action: "ActionButton",
  },
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-24 19:36:39",
    updatedBy: "ymusa@providusbank.com",
    dateUpdated: "2023-07-24 19:49:02",
    solicitorId: 8,
    nameOfLawFirm: "Ogba College",
    address: "Ogba College",
    officialEmailAddressOfFirm: "yazidmusa635j@gmail.com",
    nameOfPrincipalPartner: "Ogba College",
    bankAccountName: "Ogabausefulness",
    bankAccountNumber: "5634547935",
    solicitorApprovalStatus: "APPROVED",
    role: "Solicitor",
    mdApproval: "",
    action: "ActionButton",
  },
  // {
  //   createdBy: "test@providusbank.com",
  //   dateCreated: "2023-07-20 17:37:42",
  //   updatedBy: null,
  //   dateUpdated: null,
  //   solicitorId: 2,
  //   nameOfLawFirm: "Abiola and co.",
  //   address: "Mainland Yaba",
  //   officialEmailAddressOfFirm: "abiola@sample.com",
  //   nameOfPrincipalPartner: "Abiola Atanda",
  //   bankAccountName: "Abiola and co",
  //   bankAccountNumber: "1023456789",
  //   solicitorApprovalStatus: "NOT_APPROVED",
  //   role: "Solicitor",
  //   mdApproval: "",
  //   action: "ActionButton",
  // },
  // {
  //   createdBy: "ymusa@providusbank.com",
  //   dateCreated: "2023-07-21 08:45:38",
  //   updatedBy: null,
  //   dateUpdated: null,
  //   solicitorId: 3,
  //   nameOfLawFirm: "Exponent Company",
  //   address: "Guaganlada phase 2",
  //   officialEmailAddressOfFirm: "yazshrilld@gmail.com",
  //   nameOfPrincipalPartner: "My Yazid",
  //   bankAccountName: "exponent",
  //   bankAccountNumber: "1234567849",
  //   solicitorApprovalStatus: "NOT_APPROVED",
  //   role: "Solicitor",
  //   mdApproval: "",
  //   action: "ActionButton",
  // },
  // {
  //   createdBy: "ymusa@providusbank.com",
  //   dateCreated: "2023-07-21 12:27:19",
  //   updatedBy: null,
  //   dateUpdated: null,
  //   solicitorId: 4,
  //   nameOfLawFirm: "Exnent Company",
  //   address: "Guagan phase 2",
  //   officialEmailAddressOfFirm: "yazshlld@gmail.com",
  //   nameOfPrincipalPartner: "Yazid Ajinkumenh",
  //   bankAccountName: "expont",
  //   bankAccountNumber: "1234567895",
  //   solicitorApprovalStatus: "NOT_APPROVED",
  //   role: "Solicitor",
  //   mdApproval: "",
  //   action: "ActionButton",
  // },
  // {
  //   createdBy: "ymusa@providusbank.com",
  //   dateCreated: "2023-07-24 20:11:48",
  //   updatedBy: null,
  //   dateUpdated: null,
  //   solicitorId: 9,
  //   nameOfLawFirm: "Miami College",
  //   address: "Yazid College",
  //   officialEmailAddressOfFirm: "ymusa@gmail.com",
  //   nameOfPrincipalPartner: "Ogba College",
  //   bankAccountName: "College",
  //   bankAccountNumber: "3034547935",
  //   solicitorApprovalStatus: "NOT_APPROVED",
  //   role: "Solicitor",
  //   mdApproval: "",
  //   action: "ActionButton",
  // },
  // {
  //   createdBy: "ymusa@providusbank.com",
  //   dateCreated: "2023-07-26 17:30:20",
  //   updatedBy: null,
  //   dateUpdated: null,
  //   solicitorId: 10,
  //   nameOfLawFirm: "HTML name",
  //   address: "bet 9ja",
  //   officialEmailAddressOfFirm: "yoxose6765@ridteam.com",
  //   nameOfPrincipalPartner: "ben uzor",
  //   bankAccountName: "patricia",
  //   bankAccountNumber: "2233445678",
  //   solicitorApprovalStatus: "NOT_APPROVED",
  //   role: "Solicitor",
  //   mdApproval: "",
  //   action: "ActionButton",
  // },
];

export const AssignedDummyData = [
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-07-26 17:30:20",
    updatedBy: "sadeoye@providusbank.com",
    dateUpdated: "2023-08-05 22:21:26",
    solicitorId: 10,
    nameOfLawFirm: "HTML name",
    address: "bet 9ja",
    officialEmailAddressOfFirm: "yoxose6765@ridteam.com",
    nameOfPrincipalPartner: "ben uzor",
    bankAccountName: "patricia",
    bankAccountNumber: "2233445678",
    solicitorApprovalStatus: "NOT_APPROVED",
    role: "Solicitor",
    mdApproval: "",
  },
];

export const SolicitorReportData = [
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-08-07 12:26:01",
    updatedBy: "musa.yazid49@gmail.com",
    dateUpdated: "2023-08-10 13:39:20",
    requestId: 8,
    companyName: "Elshadai Ministeries",
    companyRegisteredAddress: "2, Ajankeba, street, bornoi",
    companyRegistrationDate: "30-Aug-2023",
    rcNumber: "34210896",
    companyType: "BUSINESS_NAME",
    shareholdingStructure: "40% insurance scheme",
    proprietorsName: "Ades",
    secretaryName: "desa",
    proprietorsRegisteredAddress: "2, Ajankeba, street, borno close",
    directors: [],
    trustees: [],
    reason: "Acc Opening",
    status: "COMPLETED",
    solicitor: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-24 19:22:21",
      updatedBy: "ymusa@providusbank.com",
      dateUpdated: "2023-07-24 19:48:52",
      solicitorId: 7,
      nameOfLawFirm: "Ogba Cotjvpany",
      address: "Ogba User",
      officialEmailAddressOfFirm: "musa.yazid49@gmail.com",
      nameOfPrincipalPartner: "Ogba Ogba",
      bankAccountName: "Ogabausefulness",
      bankAccountNumber: "5634567935",
      solicitorApprovalStatus: "APPROVED",
      role: "Solicitor",
      mdApproval: "",
    },
    document: {
      cacDocument:
        "C:/Users/NAgbara1/src/main/resources/static/elshadai ministeries/153380941156449.pdf",
      document2:
        "C:/Users/NAgbara1/src/main/resources/static/elshadai ministeries/911788729684726 (3).pdf",
      document3: "",
      document4: "",
      document5: "",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-08-07 12:26:01",
      updatedBy: "musa.yazid49@gmail.com",
      dateUpdated: "2023-08-11 16:39:07",
      companyName: "abc",
      companyRegisteredAddress: "def",
      companyRegistrationDate: "23-Aug-2023",
      rcNumber: "123",
      companyType: "BUSINESS_NAME",
      shareholdingStructure: "geh",
      proprietorsName: "lmn",
      secretaryName: "opq",
      proprietorsRegisteredAddress: "ijk",
      directors: [],
      trustees: [],
      solicitorReportDocument1:
        "C:/Users/nagbara/src/main/resources/static/abc/153380941156449.pdf",
      solicitorReportDocument2:
        "C:/Users/nagbara/src/main/resources/static/abc/Receipt002450528152556.pdf",
      solicitorComment: "The Company is who they say they are",
    },
    action: "ActionButton",
  },
];

export const DUMMY_SELECTED_ROWS = [
  {
    createdBy: "ymusa@providusbank.com",
    dateCreated: "2023-08-16 07:58:29",
    updatedBy: "ymusa@providusbank.com",
    dateUpdated: "2023-08-18 09:24:46",
    requestId: 24,
    companyName: "React Insurance",
    companyRegisteredAddress:
      "1, Arisile Street, Estate Avenue, Madueke LClose",
    companyRegistrationDate: "30-Aug-2023",
    rcNumber: "108121",
    companyType: "LIMITED_LIABILITY_COMPANY",
    shareholdingStructure: "42% rate increase",
    proprietorsName: null,
    secretaryName: null,
    proprietorsRegisteredAddress: null,
    directors: [
      {
        directorName: "Eliot Sans",
        directorResidentialAddress:
          "1, Arisile Street, Estate Avenue, Madueke  Avenuee",
      },
      {
        directorName: "Madueke Bright",
        directorResidentialAddress:
          "1o, Ogulawe Street, Estate Avenue, Madueke LClose",
      },
    ],
    trustees: [],
    reason: "Account Opening",
    status: "ASSIGNED",
    solicitor: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-07-24 19:22:21",
      updatedBy: "ymusa@providusbank.com",
      dateUpdated: "2023-07-24 19:48:52",
      solicitorId: 7,
      nameOfLawFirm: "Ogba Cotjvpany",
      address: "Ogba User",
      officialEmailAddressOfFirm: "musa.yazid49@gmail.com",
      nameOfPrincipalPartner: "Ogba Ogba",
      bankAccountName: "Ogabausefulness",
      bankAccountNumber: "5634567935",
      solicitorApprovalStatus: "APPROVED",
      role: "Solicitor",
      mdApproval: "",
    },
    document: {
      cacDocument:
        "C:/Users/nagbara/src/main/resources/static/react insurance/Receipt002450528152556.pdf",
      document2:
        "C:/Users/nagbara/src/main/resources/static/react insurance/Receipt002450528152556.pdf",
      document3: "",
      document4: "",
      document5: "",
    },
    solicitorReport: {
      createdBy: "ymusa@providusbank.com",
      dateCreated: "2023-08-16 07:58:29",
      updatedBy: null,
      dateUpdated: null,
      companyName: "React Insurance",
      companyRegisteredAddress:
        "1, Arisile Street, Estate Avenue, Madueke LClose",
      companyRegistrationDate: "30-Aug-2023",
      rcNumber: "108121",
      companyType: "LIMITED_LIABILITY_COMPANY",
      shareholdingStructure: "42% rate increase",
      proprietorsName: null,
      secretaryName: null,
      proprietorsRegisteredAddress: null,
      directors: [
        {
          directorName: "Eliot Sans",
          directorResidentialAddress:
            "1, Arisile Street, Estate Avenue, Madueke  Avenuee",
        },
        {
          directorName: "Madueke Bright",
          directorResidentialAddress:
            "1o, Ogulawe Street, Estate Avenue, Madueke LClose",
        },
      ],
      trustees: [],
      solicitorReportDocument1: null,
      solicitorReportDocument2: null,
      solicitorComment: null,
    },
    action: "ActionButton",
  },
];

export const LOGIN_DUMMY_DATA = [
  {
    status: "success",
    message: "Login successful",
    data: {
      emplId: "221005",
      unit: {
        name: "Application Development",
        id: 1,
      },
      role: "Application Developer",
      roleaccess: "",
      empName: "MUSA, YAZID TOPA",
      id: 1303,
      responseMessage: "Authenticated Successfully",
      department: {
        name: "Information Technology",
        id: 1,
      },
      braCode: {
        name: "Head Office",
        id: 1,
      },
      supervisor: {
        name: "NDUKWE, NNAMDI NDUKWE",
        id: 442,
      },
      responseCode: "00",
    },
  },
];

export const FXTX_DUMMY_DATA = [
  {
    status: "success",
    message: "Fetch Successful",
    data: {
      blotter: [
        {
          date_added: "9/08/2023 3:04:06 PM",
          action: "ActionButton",
          amount: 120.04,
          referenceNo: "test-12344Xs",
          narration: "Sell Fx to Bank with ref: test-12344Xs",
          channel: 2,
          source_account: "5900085856",
          fx_rate: 500.0,
          equ_amount: 60000.0,
          rowid: 1,
          destination_account: "1700085845",
        },
        {
          date_added: "9/08/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/09/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/09/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/10/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/10/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/11/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/11/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/11/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/11/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/12/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/13/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "9/22/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "10/12/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
        {
          date_added: "10/31/2023 3:05:20 PM",
          action: "ActionButton",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
      ],
      current_start_stop_flg: 1,
      responseMessage: "Successful",
      responseCode: "00",
      current_fx_rate: 461.59,
    },
  },
];

export const UPDATE_SUCCESS_STOP = [
  {
    status: "success",
    message: "Update Successful",
    data: {
      responseMessage: "Sell_fx module stopped successfully.",
      responseCode: "00",
    },
  },
];

export const UPDATE_SUCCESS_START = [
  {
    status: "success",
    message: "Update Successful",
    data: {
      responseMessage:
        "Sell_fx module started successfully. Current rate is: 461.59",
      responseCode: "00",
    },
  },
];

let formats = new Intl.NumberFormat("en-GB");
export const fxDataColumns = [
  {
    id: "source_account",
    label: "Source",
    minWidth: 70,
  },
  {
    id: "destination_account",
    label: "Beneficiary",
    minWidth: 70,
  },
  {
    id: "amount",
    label: "Amount Sent",
    minWidth: 70,
    format: (val) => <p>{`$${val.toLocaleString("en-US")}`}</p>,
  },
  {
    id: "equ_amount",
    label: "Equivalent Amount",
    minWidth: 70,
    format: (val) => <p>{`₦${val.toLocaleString("en-US")}`}</p>,
  },
  {
    id: "fx_rate",
    label: "FX Rate",
    minWidth: 70,
    format: (val) => <p>{`₦${val.toLocaleString("en-US")}`}</p>,
  },
  {
    id: "date_added",
    label: "Date",
    minWidth: 70,
    format: (value) => dayjs(value.split(" ")[0]).format("DD-MM-YYYY"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
  },
];

const DUMMY_WEBSOCKET_PAYLOAD = [
  { EIO: 4, transport: "polling", t: "Ogo8gRo", sid: "UW2UOTBMpxPQv_e1AB2v" },
];

export const DUMMY_SINGLE_TABLE_DATA = [
  {
    date_added: "9/12/2023 3:04:06 PM",
    amount: 120,
    referenceNo: "test-12344Xs",
    narration: "Sell Fx to Bank with ref: test-12344Xs",
    channel: 2,
    source_account: "5900085856",
    fx_rate: 500,
    equ_amount: 60000,
    rowid: 1,
    destination_account: "1700085845",
    rate: 759.71,
    action: "ActionButton",
  },
];
