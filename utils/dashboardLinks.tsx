import { FaTachometerAlt, FaRobot, FaBed, FaUser } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
// import { Md360 } from "react-icons/md"; // Importing from Material Design for 360 tour

export const dashboardLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <FaTachometerAlt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Virtual Assistant",
    href: "/dashboard/virtual-assistant",
    icon: (
      <FaRobot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },

  {
    label: "Rooms",
    href: "/dashboard/rooms",
    icon: (
      <FaBed className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Explore",
    href: "/dashboard/explore",
    icon: (
      <BiSolidOffer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: (
      <FaUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
