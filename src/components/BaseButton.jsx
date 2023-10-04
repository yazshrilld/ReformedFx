const BaseButton = ({
  type = "button",
  handleClick,
  variant = "primary",
  children,
  customStyle,
  disabled,
  isLoading,
  ...props
}) => {
  const variants = {
    primary: "bg-[#FDB815] hover:bg-[#FDB815]/[0.8] ",
    success: "bg-[#009E19] hover:bg-[#009E19]/[0.8] ",
    warning: "bg-[#B2B2B2] hover:bg-[#B2B2B2]/[0.8] ",
    error: "bg-red-500 hover:bg-red-500/[0.8] ",
  };
  return (
    <button
      type={type}
      className={`rounded-[10px] text-white font-medium h-[54px] disabled:bg-primary disabled:cursor-not-allowed ${customStyle} ${variants[variant]}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <div className="border-2 mx-auto border-r-[#FDB815] animate-spin border-white w-8 h-8 rounded-full" />
      ) : (
        children
      )}
    </button>
  );
};

export default BaseButton;
