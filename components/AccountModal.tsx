"use client";

import { UserProfile } from "@clerk/nextjs";
import { Dialog } from "@/components/ui/dialog";

export default function AccountModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <UserProfile path="/dashboard/account" routing="path" />
    </Dialog>
  );
}
