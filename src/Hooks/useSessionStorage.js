export const useSessionStorage = () => {
  const setSessionStorage = (key, loggedInUserData) =>
    sessionStorage.setItem(`__${key}`, loggedInUserData);

  const getSessionStorage = (key) =>
    JSON.parse(sessionStorage.getItem(`__${key}`));

  const removeItem = (key) => sessionStorage.removeItem(`__${key}`);

  return { setSessionStorage, getSessionStorage, removeItem };
};
