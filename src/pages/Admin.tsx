
import { useState } from 'react';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

function AdminContent() {
  const { isAdmin, isLoading } = useAdmin();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}

export default function Admin() {
  return (
    <AdminProvider>
      <div className="container py-8">
        <AdminContent />
      </div>
    </AdminProvider>
  );
}
