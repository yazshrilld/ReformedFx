export const resolveUserRoleAccess = (role) => {
  const ROLES_MAP = {
    "Solicitor": 1,
    "Customer Service Officer": 2,
    "Legal Officer": 3,
    "Team Lead, Legal Services": 5,
    "Application Developer": 4,
    "Project Management Officer":6,
    "Testing and Quality Assurance Officer":7,
  };

  return ROLES_MAP?.[role] ?? null; //this is using the object name to get the value
};