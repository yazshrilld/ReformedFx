import { ReactComponent as MoreIcon } from "assets/svg/more.svg";
import { useState, useRef } from "react";
import useClickAway from "Hooks/useClickAway";

const TableMoreDetails = ({ itemOnClick, options }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(null);

  const moreOnClick = () => {
    setOpen((prevS) => !prevS);
  };

  const handleItemOnClick = (itm) => {
    itemOnClick(itm);
    moreOnClick();
  };

  const callBack = () => {
    if (open) {
      setOpen(false);
    }
  };

  useClickAway(container, callBack);

  return (
    <div ref={container} className="relative">
      <MoreIcon
        className="cursor-pointer block mx-auto peer"
        onClick={moreOnClick}
      />

      {open && (
        <ul className="absolute right-0 bg-white shadow-2xl z-[2]">
          {options.map((itm) => (
            <li
              key={itm}
              className="min-w-max px-8 py-5 hover:bg-slate-50 cursor-pointer border-b last:border-b-0"
              onClick={() => handleItemOnClick(itm)}
            >
              {itm}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableMoreDetails;
