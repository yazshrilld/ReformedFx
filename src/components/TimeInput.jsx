const TimeInput = ({
    type = "time",
    touched,
    error,
    label,
    appendIcon,
    containerClassName,
    ...props
  }) => {
    return (
      <div className="flex flex-col mt-4">
        {label && (
          <label htmlFor="time" className="text-sm mb-1 block font-medium">
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            className="appearance-none px-10 py-4 focus:outline-none rounded-[10px] cursor-pointer"
            pattern="[0-9]{2}:[0-9]{2}"
            minLength={5}
            maxLength={5}
            {...props}
          />
          {appendIcon}
        </div>
        {touched && error && (
          <p className="text-center text-xs block text-red-500 border-none">
            {error}
          </p>
        )}
      </div>
    );
  };
  
  export default TimeInput;
  