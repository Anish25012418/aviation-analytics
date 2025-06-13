import {LuChevronFirst, LuChevronLast} from "react-icons/lu";
import React from "react";
import type {IconType} from "react-icons";
import {useLocation, useNavigate} from "react-router-dom";

type SidebarContextType = {
  expanded: boolean;
};

type SidebarProps = {
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

const Sidebar = ({ children, expanded, setExpanded }: SidebarProps) => {

  return (
    <aside className={`${expanded ? "max-w-60" : "max-w-18"} mt-0.5 border-r-gray-900 shadow-sm`}>
      <nav className="h-full flex flex-col bg-white ">
        <div className="p-3 pb-2 flex justify-between items-center">
          {expanded && (
            <p className="font-semibold text-xl">Menu</p>
          )}
          <button onClick={() => setExpanded((curr) => !curr)}
                  className="items-center py-2 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
            {expanded ? <LuChevronFirst size={25}/> : <LuChevronLast size={30}/>}
          </button>
        </div>

        <SidebarContext.Provider value={{expanded}}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;

export const SidebarItem = ({icon: Icon, text, path}: {
  icon: IconType;
  text: string;
  path: string;
}) => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }
  const {expanded} = context;


  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname === path;

  const handleClick = () => {
    if (active) return
    navigate(path);
  }

  return (
    <li
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }
    `}
    >
      <Icon className="text-2xl" />
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

