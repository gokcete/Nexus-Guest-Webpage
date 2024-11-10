// components/AccountPageClient.js
"use client";

import { useState } from "react";
import AccountModal from "@/components/AccountModal";

export default function AccountPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className=" md:mx-auto md:px-4 md:py-8 ">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className=" md:mx-auto">
        <AccountModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
