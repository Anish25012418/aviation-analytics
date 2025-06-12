import type {SidebarItem} from "../types/sidebarItem.ts";
import {AiFillHome} from "react-icons/ai";
import {MdFlightTakeoff} from "react-icons/md";

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: "Home",
    icon: AiFillHome,
    path: "/"
  },
  {
    id: 2,
    label: "Flights",
    icon: MdFlightTakeoff,
    path: "/flights"
  }
]