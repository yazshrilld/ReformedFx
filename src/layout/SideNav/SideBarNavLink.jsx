import { Link, NavLink } from "react-router-dom";

const navClass =
  "flex items-center group relative h-[71px] text-font space-x-4 text-[20px] font-medium";

const SideBarNavLink = ({ title, icon, href, dropdown, handleSelection }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? `${navClass} nav-icon bg-primary` : navClass
      }
    >
      <span className="ml-6">{icon}</span>
      <span className="font-medium text-base">{title}</span>

      {dropdown?.length > 0 && (
        <div className="absolute z-[5] hidden group-hover:block w-[325px] text-base pb-[0px] rounded-[5px] shadow-[0px_4px_17px_4px_rgba(0,0,0,0.10)] left-[100px] bg-white top-[68px]">
          {dropdown.map(({ label, href }, idx) => (
            <Link
              key={idx}
              to={href}
              className="px-[30px] block py-[15px] hover:bg-slate-50"
              onClick={() => handleSelection(idx)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </NavLink>
  );
};

export default SideBarNavLink;
