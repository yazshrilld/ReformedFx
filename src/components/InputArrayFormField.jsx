import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

const InputArrayFormField = ({
  type = "text",
  label,
  name,
  onChange,
  onKeyDown,
  value,
  containerClassName,
  placeholder,
  formik,
  touched,
  error,
  ...props
}) => {
  const [data, setData] = useState("");
  const handleNameChange = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log("FormikValues[name]: ", formik.values[name]);
      if (formik.values[name]?.includes(data)) {
        const p = formik.values[name].filter((itm) => itm !== data);
        formik.setFieldValue(name, p);
      } else {
        formik.values[name] &&
          (formik.setFieldValue(name, [
            ...formik.values[name],
            data,
          ]));
      }
      setData("");
    }
  };

  const handleRemove = (id) => {
    const p = formik.values[name].filter((itm) => itm !== id);
    formik.setFieldValue(name, p);
  };

  return (
    <>
      <div className={`relative  ${containerClassName}`}>
        {label && (
          <label htmlFor="name" className="text-sm mb-1 block font-medium">
            {label}
          </label>
        )}
        <div className="relative bg-[#F8F8F8] rounded-[10px] flex items-center">
          <input
            type={type}
            name={name}
            onChange={handleNameChange}
            onKeyDown={handleEnter}
            value={data}
            className={`appearance-none bg-[#F8F8F8] px-4 block w-full h-[61px] outline-none rounded-[10px] border border-transparent focus-within:border-[#FDB815]`}
            {...props}
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {formik.values[name]?.map((name) => (
            <div
              key={name}
              className="rounded-[35px] py-1 px-4 bg-black text-white"
            >
              <span className="gap-4">
                {name}
                <span
                  className="ml-2 text-gray-300 font-bold cursor-pointer"
                  onClick={() => handleRemove(name)}
                >
                  X
                </span>
              </span>
            </div>
          ))}
        </div>
        {touched && error && (
          <span component="p" className="text-xs mt-[5px] text-red-500">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default InputArrayFormField;
