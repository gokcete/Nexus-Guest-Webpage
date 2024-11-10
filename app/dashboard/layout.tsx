// app/dashboard/layout.tsx

import { SidebarDemo } from "@/components/DashboardHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative z-10 h-screen min-h-screen overflow-hidden w-full">
      <div className=" mb-8">
        <SidebarDemo> {children} </SidebarDemo>
      </div>
      <ToastContainer />
    </main>
  );
}
