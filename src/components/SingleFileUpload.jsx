import { useState } from "react";

const SingleFileUpload = ({
  label,
  value,
  name,
  placeholder,
  multiple,
  formik,
  touched,
  error,
  types,
}) => {
  const [fileNames, setFileNames] = useState([]);

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
        formik.setFieldValue(name, `data:application/pdf;name=${file.name};${res.replace(
          "data:application/pdf;",
          ""
        )}`);
        setFileNames((prevS) => [...prevS, ...file.name]);
      });
    }
  };

  return (
    <div>
      <label htmlFor="name" className="text-sm mb-1 block font-medium">
        {label}{" "}<span className={`${ fileNames.length > 0 ? "text-green-500" : "text-red-500"}`}>[Only pdf files are allowed]</span>
      </label>
      <div className="bg-[#F8F8F8] rounded-[10px] relative flex items-center px-4 h-[61px]">
        <input
          type="file"
          multiple={false}
          onChange={handleUpload} //change this to handleUpload when you call the handlehange and  set it to handleUpload, write the handleUpload code where you wpuld use it.
          name={name}
          accept={types}
          value={value}
          className="appearance-none cursor-pointer absolute top-0 left-0 opacity-0 bg-[#F8F8F8] px-4 block w-full h-full outline-none  border border-transparent focus-within:border-[#FDB815]"
        />
        <span className="text-gray-400">
          {fileNames.length > 0 ? fileNames : placeholder}
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

export default SingleFileUpload;
