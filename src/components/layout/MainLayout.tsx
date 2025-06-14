import React from 'react';
import Navbar from "../Navbar.tsx";
import Sidebar, {SidebarItem} from "../Sidebar.tsx";
import {sidebarItems} from "../../data/sidebarItems.ts";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
  const [expanded, setExpanded] = React.useState(() => {
    const stored = localStorage.getItem("sidebar-expanded");
    return stored ? JSON.parse(stored) : true;
  });

  React.useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(expanded));
  }, [expanded]);
  return (
    <div>
      <Navbar />
      <div className="h-full flex">
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              text={item.label}
              path={item.path}
            />
          ))}
        </Sidebar>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;