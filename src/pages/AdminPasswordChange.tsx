
import React from 'react';
import { PasswordChangeForm } from "@/components/admin/PasswordChangeForm";

export default function AdminPasswordChange() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Settings</h1>
      <PasswordChangeForm />
    </div>
  );
}
