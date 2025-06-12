import React from 'react';
import Navbar from "../Navbar.tsx";
import Sidebar, {SidebarItem} from "../Sidebar.tsx";
import {sidebarItems} from "../../data/sidebarItems.ts";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
  const [expanded, setExpanded] = React.useState(true)
  return (
    <>
      <Navbar />
      <div className="flex">
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

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;