import * as Yup from "yup";

export const LoginSchema = Yup.object({
  userName: Yup.string().required("username is required"),
  password: Yup.string().required("Password is required"),
});

export const CreateSolicitorSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  bankAccountName: Yup.string().required("Bank account name is required"),
  bankAccountNumber: Yup.string()
    .min(10)
    .max(10)
    .required("Bank account number is required"),
  mdApproval: Yup.string().required("MD approval is required"),
  nameOfLawFirm: Yup.string().required("Name of law firm is required"),
  nameOfPrincipalPartner: Yup.string().required(
    "Name of principal partner is required"
  ),
  officialEmailAddressOfFirm: Yup.string()
    .email()
    .required("Official email address of firm is required"),
  staffUsername: Yup.string().email().required("Staff username is required"),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Must be more than 7 characters")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match"),
});
export const UpdateSolicitorSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  bankAccountName: Yup.string().required("Bank account name is required"),
  bankAccountNumber: Yup.string()
    .min(10)
    .max(10)
    .required("Bank account number is required"),
  mdApproval: Yup.string().required("MD approval is required"),
  nameOfLawFirm: Yup.string().required("Name of law firm is required"),
  nameOfPrincipalPartner: Yup.string().required(
    "Name of principal partner is required"
  ),
  officialEmailAddressOfFirm: Yup.string()
    .email()
    .required("Official email address of firm is required"),
  staffUsername: Yup.string().email().required("Staff username is required"),
  roleacess: Yup.string()
    .min(1)
    .max(1)
    .required("Bank account number is required"),
});

export const UpdateSolicitorApprovalSchema = Yup.object({
  solicitorApprovalStatus: Yup.string().required("Address is required"),
  staffUsername: Yup.string().email().required("Staff username is required"),
});

export const SolicitorReportSchema = Yup.object({
  companyName: Yup.string().required("Address is required"),
  companyRegisteredAddress: Yup.string().required("Address is required"),
  companyRegistrationDate: Yup.string().required("Address is required"),
  companyType: Yup.string().required("Address is required"),
  directors: Yup.array().of(
    Yup.object({
      directorName: Yup.string().required("Address is required"),
      directorResidentialAddress: Yup.string().required("Address is required"),
    })
  ),
  proprietorsName: Yup.string().required("Address is required"),
  proprietorsRegisteredAddress: Yup.string().required("Address is required"),
  rcNumber: Yup.string().required("Bank account number is required"),
  secretaryName: Yup.string().required("Bank account number is required"),
  shareholdingStructure: Yup.string().required(
    "Bank account number is required"
  ),
  solicitorComment: Yup.string().required("Bank account number is required"),
  solicitorReportDocument1: Yup.string().required(
    "Bank account number is required"
  ),
  solicitorReportDocument2: Yup.string().required(
    "Bank account number is required"
  ),
  trustees: Yup.array().of(
    Yup.object({
      trusteeName: Yup.string().required("Address is required"),
      trusteeResidentialAddress: Yup.string().required("Address is required"),
    })
  ),
});

export const SolicitorsLoginSchema = Yup.object({
  userName: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});

export const SetPasswordSchema = Yup.object({
  newPassword: Yup.string().required("password is required"),
  otp: Yup.string().required("password is required"),
  // solicitorId: Yup.string().required("password is required"),
  userName: Yup.string().email().required("Staff username is required"),
});

export const BusinessFormSchema = Yup.object({
  companyAccountName: Yup.string().required("Company Account Name is required"),
  companyAccountNumber: Yup.string()
  .min(10)
  .max(10)
  .required("Bank account number is required"),
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  document: Yup.object({
    cacDocument: Yup.string().required("Documents are required"),
  }),
  proprietorsName: Yup.string().required("Proprietor's name is required"),
  proprietorsRegisteredAddress: Yup.string().required(
    "Proprietor's address is required"
  ),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  reason: Yup.string().required("Reason is required"),
  requestOriginatingBranch: Yup.string().required("Branch Code is required"),
  staffUsername: Yup.string().required("Staff Username is required"),
  companyType: Yup.string().required("Staff Username is required"),
});

export const LimitedLiabilityFormSchema = Yup.object({
  companyAccountName: Yup.string().required("Company Account Name is required"),
  companyAccountNumber: Yup.string()
  .min(10)
  .max(10)
  .required("Bank account number is required"),
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  document: Yup.object({
    cacDocument: Yup.string().required("Documents are required"),
  }),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  reason: Yup.string().required("Reason is required"),
  requestOriginatingBranch: Yup.string().required("Branch Code is required"),
  staffUsername: Yup.string().required("Staff Username is required"),
  companyType: Yup.string().required("Staff Username is required"),
  directors: Yup.array().min(1, "Director is required"),
});

export const TrusteeFormSchema = Yup.object({
  companyAccountName: Yup.string().required("Company Account Name is required"),
  companyAccountNumber:Yup.string()
  .min(10)
  .max(10)
  .required("Bank account number is required"),
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  document: Yup.object({
    cacDocument: Yup.string().required("Documents are required"),
  }),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  reason: Yup.string().required("Reason is required"),
  requestOriginatingBranch: Yup.string().required("Branch Code is required"),
  staffUsername: Yup.string().required("Staff Username is required"),
  companyType: Yup.string().required("Staff Username is required"),
  trustees: Yup.array().min(1, "Trustee is required"),
});

export const BusinessReportSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  solicitorReportDocument1: Yup.string().required("Documents are required"),
  solicitorReportDocument2: Yup.string().required("Documents are required"),
  proprietorsName: Yup.string().required("Proprietor's name is required"),
  proprietorsRegisteredAddress: Yup.string().required(
    "Proprietor's address is required"
  ),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  solicitorComment: Yup.string().required("Comment is required"),
  companyType: Yup.string().required("Staff Username is required"),
});

export const LimitedLiabilityReportSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  solicitorReportDocument1: Yup.string().required("Documents are required"),
  solicitorReportDocument2: Yup.string().required("Documents are required"),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  solicitorComment: Yup.string().required("Comment is required"),
  companyType: Yup.string().required("Staff Username is required"),
  directors: Yup.array().min(1, "Director is required"),
});

export const TrusteeReportSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  rcNumber: Yup.string().required("RC Number is required"),
  companyRegisteredAddress: Yup.string().required(
    "Company's Registered Address is required"
  ),
  companyRegistrationDate: Yup.date().required("Date is required"),
  solicitorReportDocument1: Yup.string().required("Documents are required"),
  solicitorReportDocument2: Yup.string().required("Documents are required"),
  secretaryName: Yup.string().required("Secretary name is required"),
  shareholdingStructure: Yup.string().required(
    "Shareholding structure is required"
  ),
  solicitorComment: Yup.string().required("Comment is required"),
  companyType: Yup.string().required("Staff Username is required"),
  trustees: Yup.array().min(1, "Trustee is required"),
});

export const UpdateRequestFormSchema = Yup.object({
  companyName: Yup.string().required("password is required"),
  companyRegisteredAddress: Yup.string().required("password is required"),
  companyRegistrationDate: Yup.string().required("password is required"),
  companyType: Yup.string().required("password is required"),
  directors: Yup.array().of(
    Yup.object({
      directorName: Yup.string().required("Address is required"),
      directorResidentialAddress: Yup.string().required("Address is required"),
    })
  ),
  document: Yup.object({
    cacDocument: Yup.string().required("Address is required"),
    document2: Yup.string().required("Address is required"),
    document3: Yup.string().required("Address is required"),
    document4: Yup.string().required("Address is required"),
    document5: Yup.string().required("Address is required"),
  }),
  proprietorsName: Yup.string().required("Address is required"),
  proprietorsRegisteredAddress: Yup.string().required("Address is required"),
  rcNumber: Yup.string().required("Address is required"),
  reason: Yup.string().required("Address is required"),
  secretaryName: Yup.string().required("Address is required"),
  shareholdingStructure: Yup.string().required("Address is required"),
  staffUsername: Yup.string().required("Address is required"),
  trustees: Yup.array().of(
    Yup.object({
      trusteeName: Yup.string().required("Address is required"),
      trusteeResidentialAddress: Yup.string().required("Address is required"),
    })
  ),
});

export const UpdateStatusRequestSchema = Yup.object({
  requestStatus: Yup.string().required("Address is required"),
  staffUsername: Yup.string().email().required("Staff username is required"),
});

export const ValidateEmailSchema = Yup.object({
  username: Yup.string().email().required("Email is required"),
});
