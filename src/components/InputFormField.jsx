const InputFormField = ({
  type = "text",
  touched,
  error,
  label,
  appendIcon,
  containerClassName,
  ...props
}) => {
  return (
    <div className={`relative  ${containerClassName}`}>
      {label && (
        <label htmlFor="name" className="text-sm mb-1 block font-medium">
          {label}
        </label>
      )}
      <div className="relative bg-[#F8F8F8] rounded-[10px] flex items-center mb-2 shadow-[0px_4px_17px_4px_rgba(0,0,0,0.10)]">
        <input
          type={type}
          className="appearance-none bg-[#F8F8F8] px-4 block w-full h-[61px] outline-none rounded-[10px] border border-transparent"
          {...props}
        />
        {appendIcon}
      </div>
      {touched && error && (
        <p className="text-center text-xs block text-red-500 border-none">{error}</p>
      )}
    </div>
  );
};

export default InputFormField;
