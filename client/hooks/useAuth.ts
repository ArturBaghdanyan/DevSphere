"use client";

import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from "../store/services/auth.api";
import { useSelector } from "react-redux";

type RegisterData = {
  username: string;
  email: string;
  password: string;
  gender: string;
  role: "User" | "Admin";
};

type RootState = {
  auth: {
    user: any;
    isAuthenticated: boolean;
  };
};

export const useAuth = () => {
  const [loginTrigger, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerTrigger, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [logoutTrigger, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const login = async (email: string, password: string) => {
    return await loginTrigger({ email, password }).unwrap();
  };

  const register = async (userData: RegisterData) => {
    return await registerTrigger(userData).unwrap();
  };

  const logout = async () => {
    return await logoutTrigger().unwrap();
  };

  return {
    user,
    isAuthenticated,
    loading: isLoginLoading || isRegisterLoading || isLogoutLoading,
    login,
    register,
    logout,
  };
};
