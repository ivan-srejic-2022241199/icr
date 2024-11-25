"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone_number: string;
  city: string;
  postal_code: string;
  address: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user", {
        withCredentials: true,
      });
      setUser(response.data.user || null);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
