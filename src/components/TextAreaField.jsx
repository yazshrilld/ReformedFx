const TextAreaField = ({
  rows,
  name,
  placeholder,
  disabled = false,
  label,
  containerClassName,
  error,
  touched,
  ...props
}) => {
  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <textarea
        className={`peer block min-h-[auto] bg-[#F8F8F8] rounded-[10px] px-3 py-[0.5rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${containerClassName}`}
        rows={rows}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      ></textarea>
      <label
        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] font-medium  dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-dark text-xl peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3`}
      >
        {label}
      </label>
      {touched && error && (
        <span className="text-xs mt-[5px] block text-red-500">{error}</span>
      )}
    </div>
  );
};

export default TextAreaField;
