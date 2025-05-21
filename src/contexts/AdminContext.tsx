
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin session exists in local storage
    const checkSession = () => {
      const adminSession = localStorage.getItem('portfolio_admin_session');
      setIsAdmin(!!adminSession);
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Fetch all admin password hashes (or plain text)
      const { data, error } = await supabase
        .from('admin_access')
        .select('password_hash');

      if (error) {
        throw error;
      }

      // Check if any password matches (plain or hashed)
      let passwordValid = false;
      for (const row of data) {
        if (row.password_hash === password) {
          passwordValid = true; // plain text match
          break;
        }
        if (await bcrypt.compare(password, row.password_hash)) {
          passwordValid = true; // bcrypt hash match
          break;
        }
      }

      if (passwordValid) {
        localStorage.setItem('portfolio_admin_session', 'true');
        setIsAdmin(true);
        setIsLoading(false);
        return true;
      } else {
        toast.error("Invalid password");
        setIsAdmin(false);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_session');
    setIsAdmin(false);
    toast.success("Logged out successfully");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
