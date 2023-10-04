// import { useFormik } from "formik";
import { ReactComponent as TodayIcon } from "assets/svg/event.svg";
// import { ReactComponent as DoneIcon } from "assets/svg/done.svg";
// import { ReactComponent as ResetIcon } from "assets/svg/restart_alt.svg";
// import * as Yup from "yup";
import InputFormField from "components/InputFormField";
import IconButton from "@mui/material/IconButton";
import Button from "components/BaseButton";
// import { fetchFxFn } from "utils/ApiFactory/fxTxApi";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import dayjs from "dayjs";
// import BaseTable from "components/BaseTable";
// import { fxDataColumns } from "assets/data";

// const DATE_FIELD_VALUES = {
//   rawStartDate: "",
//   rawEndDate: "",
// };

// const validationSchema = Yup.object().shape({
//   rawStartDate: Yup.date().when("rawEndDate", (rawEndDate, schema) => {
//     return schema.test({
//       test: (rawStartDate) => rawStartDate,
//       message: () => "Start date cannot be lesser than end date",
//     });
//   }),
//   rawEndDate: Yup.date().max(
//     new Date(),
//     "End date cannot be beyond today's date"
//   ),
// });

const DateSearchFilter = ({ formik, isFetching }) => {
  // const {
  //   data: SearchedData,
  //   isFetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["date-fetch-fx"],
  //   queryFn: () =>
  //     fetchFxFn({
  //       startdate: dayjs(formik.values.rawStartDate).format("DD-MMM-YYYY"),
  //       enddate: dayjs(formik.values.rawEndDate).format("DD-MMM-YYYY"),
  //     }),
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   select: (data) => {
  //     const rate = data?.data?.data?.current_fx_rate;
  //     const fxBlotterData = data?.data?.data?.blotter?.map((itm) => ({
  //       ...itm,
  //       action: "ActionButton",
  //     }));
  //     // setFxRates(rate)
  //     console.log("From Select: ", { rate, data, fxBlotterData });
  //     return { rate, fxBlotterData };
  //   },
  //   enabled: false,
  // });

  // const handleSubmit = async (values, { resetForm }) => {
  //   // const { rawStartDate, rawEndDate } = values;
  //   refetch();
  //   // console.log("Search Values: ", ...rest);
  // };

  // const formik = useFormik({
  //   initialValues: DATE_FIELD_VALUES, // from props/parent
  //   validationSchema: validationSchema,
  //   onSubmit: handleSubmit, // from props/p
  // });

  // console.log("From Search Query: ", SearchedData);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center gap-3 justify-between">
          <IconButton>
            <TodayIcon className="w-7 h-7" />
          </IconButton>
          <div className="min-h[100px] flex items-center flex-col">
            <InputFormField
              name="rawStartDate"
              placeholder="Start Date"
              value={formik.values.rawStartDate}
              pattern="\d{2}-\d{2}-\d{4}"
              type="date"
              onChange={formik.handleChange}
              touched={formik.touched.rawStartDate}
              error={formik.errors.rawStartDate}
            />
          </div>
          <div className="min-h[100px] flex items-center flex-col">
            <InputFormField
              name="rawEndDate"
              placeholder="End Date"
              value={formik.values.rawEndDate}
              pattern="\d{2}-\d{2}-\d{4}"
              type="date"
              onChange={formik.handleChange}
              touched={formik.touched.rawEndDate}
              error={formik.errors.rawEndDate}
            />
          </div>
          <Button
            type="submit"
            customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px] mb-1"
            variant="primary"
            // onClick={() => searchFxData(SearchedData)}
            // onClick={console.log("I am clicked")}
            isLoading={isFetching}
            disabled={!formik.values.rawEndDate}
          >
            Search
          </Button>
          {/* <IconButton className="">
          <DoneIcon className="w-7 h-7" />
        </IconButton>
        <IconButton className="">
          <ResetIcon className="w-7 h-7" />
        </IconButton> */}
        </div>
      </form>

      {/* <BaseTable 
          rows={data?.fxBlotterData || []}
          columns={fxDataColumns}
          page={page}
      
      /> */}
    </>
  );
};

export default DateSearchFilter;
