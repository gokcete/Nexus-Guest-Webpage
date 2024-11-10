"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/moving-border";

import { UserImage } from "./UserImage";

export default function NavBarTop() {
  const pathName = usePathname();
  const menuItems = [
    "Rooms",
    "Booking",
    "Contact",
    "Restaurant",
    "FitnessClub  ",
  ];

  const navLinks = [
    { href: "/rooms", label: "Rooms" },

    { href: "/contact", label: "Contact" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/fitnessclub", label: "FitnessClub" },
  ];

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            NEXUS
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            NEXUS
          </Link>
        </NavbarBrand>
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              className={`${
                pathName === link.href ? "text-zinc-900" : "text-zinc-400"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          borderRadius="1.75rem"
          className="
          bg-[rgb(171,164,147)] 
          dark:bg-slate-900 
          text-white dark:text-white 
          border-neutral-200 dark:border-slate-800 
          hidden sm:flex
          rounded-none sm:rounded-[1.75rem_1rem] 
          shadow-[0_0_15px_rgb(171,164,147)] 
          hover:shadow-[0_0_25px_rgb(171,164,147)] 
          transition-shadow duration-300 ease-in-out
        "
        >
          <Link className="text-white font-bold" href="/booking">
            Book now
          </Link>
        </Button>

        {<UserImage />}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
