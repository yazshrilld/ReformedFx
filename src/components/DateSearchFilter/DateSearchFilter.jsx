import { ReactComponent as TodayIcon } from "assets/svg/event.svg";
import InputFormField from "components/InputFormField";
import IconButton from "@mui/material/IconButton";
import Button from "components/BaseButton";

const DateSearchFilter = ({ formik, isFetching }) => {
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
              max={formik.values.rawEndDate}
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
              min={formik.values.rawStartDate}
              onChange={formik.handleChange}
              touched={formik.touched.rawEndDate}
              error={formik.errors.rawEndDate}
            />
          </div>
          <Button
            type="submit"
            customStyle={`w-[100px] inline-block rounded-[10px] px-2 text-black h-[38px] ${
              !formik.values.rawStartDate ? "cursor-not-allowed" : ""
            }`}
            variant="primary"
            isLoading={isFetching}
            disabled={!formik.values.rawEndDate}
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default DateSearchFilter;
