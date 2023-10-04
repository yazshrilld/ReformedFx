import { useState } from "react";

const FileUpload = ({
  label,
  value,
  name,
  placeholder,
  multiple,
  formik,
  touched,
  error,
  types,
  onChange,
  payloadKey,
}) => {
  const [fileNames, setFileNames] = useState({});

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  
  const handleUpload = (event) => {
    for (const file of event.target.files) {
      blobToBase64(file).then((res) => {
        if (onChange) {
          const lengthOfValues = Object.values(fileNames).length;

          formik.setFieldValue(name, {
            ...formik.values[name],
            [`document${lengthOfValues + 2}`]: `data:application/pdf;name=${
              file.name
            };${res.replace("data:application/pdf;", "")}`,
          });
          setFileNames((prevS) => ({
            ...prevS,
            [`document${lengthOfValues}`]: file.name,
          }));
        } else {
          formik.setFieldValue(name, {
            ...formik.values[name],
            [payloadKey]: `data:application/pdf;name=${file.name};${res.replace(
              "data:application/pdf;",
              ""
            )}`,
          });
          setFileNames((prevS) => ({ ...prevS, [payloadKey]: file.name }));
        }
      });
    }
  };

  return (
    <div>
      <label htmlFor="name" className="text-sm mb-1 block font-medium">
        {label}
      </label>
      <div className="bg-[#F8F8F8] rounded-[10px] relative flex items-center px-4 h-[61px]">
        <input
          type="file"
          multiple={multiple}
          onChange={handleUpload} //change this to handleUpload when you call the handlehange and  set it to handleUpload, write the handleUpload code where you wpuld use it.
          name={name}
          accept={types}
          value={value}
          className="appearance-none cursor-pointer absolute top-0 left-0 opacity-0 bg-[#F8F8F8] px-4 block w-full h-full outline-none  border border-transparent focus-within:border-[#FDB815]"
        />
        <span className="text-gray-400">
          {Object.values(fileNames).length > 0
            ? Boolean(payloadKey)
              ? fileNames[payloadKey]
              : Object.values(fileNames).length > 0
              ? `${
                  Object.values(fileNames).length > 1
                    ? `${Object.values(fileNames).length} documents added`
                    : `${Object.values(fileNames).length} document added`
                }`
              : placeholder
            : placeholder}
        </span>
      </div>
      {touched && error && (
        <span component="p" className="text-xs mt-[5px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
