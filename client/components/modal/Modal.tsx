"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import { Password } from "../ui/icons/PasswordIcon";
import { Email } from "../ui/icons/EmailIcon";
import { Google } from "../ui/icons/GoogleIcon";
import { Close } from "../ui/icons/CloseIcon";

interface FormState {
  username?: string;
  email: string;
  phone?: string;
  password: string;
}

interface IModalProps {
  onClose: () => void;
  onLoginSuccess?: () => void;
  onSwitch?: () => void;
  text1: string;
  text2: string;
  text3: string;
  onSubmit?: (e: React.FormEvent) => void;
  fields: ("username" | "email" | "password")[];
  formData: FormState;
  isRegister?: boolean;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Modal = ({
  onClose,
  onSubmit,
  onSwitch,
  text1,
  text2,
  text3,
  formData,
  setFormData,
  fields = []
}: IModalProps) => {
  const { loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-xl w-full bg-[#1e1e1e] rounded-2xl relative px-8 py-10 mx-auto">
      {" "}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-gray-400 hover:text-white transition-colors"
      >
        <Close />
      </button>
      <h1 className="text-white text-center text-[32px] mb-8 font-bold">
        {text1}
      </h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        {/* Username Field */}
        {fields.includes("username") && (
          <div className="relative">
            <input
              placeholder="Username"
              value={formData.username || ""}
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
        )}

        {/* Email Field */}
        {fields.includes("email") && (
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ""}
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <div className="absolute right-3 top-3 text-gray-500">
              <Email />
            </div>
          </div>
        )}

        {/* Password Field */}
        {fields.includes("password") && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password || ""}
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <svg /* ... */ /> : <Password />}
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-[#0056d2] hover:bg-[#004bb8] text-white font-bold py-3 rounded-lg transition-colors mt-2"
          disabled={loading}
        >
          {loading ? "Processing..." : text2}
        </button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700 border-dotted"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1e1e1e] text-gray-400">Or</span>
        </div>
      </div>
      <div className="mx-auto w-full flex justify-center">
        <Google />
      </div>
      <p className="text-center text-sm text-gray-400 mt-6">
        {text3 === "Sign Up"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          className="text-blue-500 hover:-translate-y-1 transition-transform"
          onClick={onSwitch}
        >
          {text3}
        </button>
      </p>
    </div>
  );
};
export default Modal;
