// components/CustomUserButton.js
"use client";

import { useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import AccountModal from "@/components/AccountModal";

export default function CustomUserButton() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { signOut } = useAuth();

  const handleManageAccount = () => {
    setIsAccountModalOpen(true);
  };

  return (
    <>
      <UserButton
        afterSignOutUrl="/"
        userProfileMode="modal"
        userProfileOptions={{
          manageAccountHandler: handleManageAccount,
        }}
        userMenuOptions={{
          items: [
            { label: "Manage Account", onClick: handleManageAccount },
            { label: "Sign Out", onClick: signOut },
          ],
        }}
      />
      {isAccountModalOpen && (
        <AccountModal
          open={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
        />
      )}
    </>
  );
}
