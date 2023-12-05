import dayjs from "dayjs";
import Axios from "utils/axios";

export const fetchFxFn = async ({ startdate, enddate }) => {
  const res = await Axios.get(
    // `/fetch?startdate=22-Sep-2023&enddate=22-Sep-2023`
    // `/fetch?startdate=11-Sep-2023&enddate=12-Sep-2023`
    `/fetch?startdate=${dayjs(startdate).format('DD-MMM-YYYY')}&enddate=${dayjs(enddate).format('DD-MMM-YYYY')}`
  );
  return res;
};

export const updateStatusFn = async (payload) => {
  const res = await Axios.post(`/start_stop`, payload);
  return res;
};

export const validateLimitFn = async (payload) => {
  const res = await Axios.post(``, payload);
  return res;
};
