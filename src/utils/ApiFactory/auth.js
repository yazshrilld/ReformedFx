import axios from "axios";
import Axios from "utils/axios";

export const providusLoginFn = async (payload) => {
  const res = await axios.post(`${process.env.REACT_APP_AD_VERIFY}`, payload);
  return res;
};

// export const providusLoginFn = async (payload) => {
//   const res = await axios.post(`${process.env.REACT_APP_AD_VERIFY}/login`, payload);
//   return res;
// };


export const solicitorsLoginFn = async (payload) => {
  const res = await axios.post(
    process.env.REACT_APP_BASE_URL_EMAIL_SOLICITORS + "/api/v1/user/login",
    payload
  );
  return res;
};

export const otpFn = async ({ otpUrl, username }) => {
  const res = await Axios.get(`otp/send/${username}?otpUrl=${otpUrl}`);
  return res;
};

