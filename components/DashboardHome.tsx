"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dashboardLinks } from "@/utils/dashboardLinks";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

// SidebarDemo component
export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-screen-2xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen " // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {dashboardLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <UserButton />
        </SidebarBody>
      </Sidebar>

      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} alt="logo" width={60} height={60} />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Nexus
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} alt="logo" width={80} height={80} />
    </Link>
  );
};

// Dummy dashboard component with content
// Dashboard component
export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" overflow-y-auto w-full min-h-screen">
      <div className="p-2  border-s border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full min-h-full">
        <div className="p-2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-1rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};
