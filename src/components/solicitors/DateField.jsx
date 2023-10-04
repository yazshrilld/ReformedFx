// const DateField = ({
//   type = "date",
//   touched,
//   error,
//   label,
//   appendIcon,
//   pattern,
//   containerClassName,
//   ...props
// }) => {
//   return (
//     <div className={`relative ${containerClassName}`}>
//       {label && (
//         <label htmlFor="name" className="text-sm mb-1 block font-medium">
//           {label}
//         </label>
//       )}
//       <div className="relative bg-[#F8F8F8] rounded-[10px] flex items-center">
//         <input
//           type={type}
//           className="appearance-none bg-[#F8F8F8] px-4 block w-full h-[61px] outline-none rounded-[10px] border border-transparent focus-within:border-[#FDB815]"
//           {...props}
//         />
//         {appendIcon}
//       </div>
//       {touched && error && (
//         <span className="text-xs mt-[5px] block text-red-500">{error}</span>
//       )}
//     </div>
//   );
// };

// export default DateField;
