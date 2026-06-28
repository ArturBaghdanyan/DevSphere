"use client";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Modal from "./Modal";

interface ISignUp {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ onClose, onSwitchToLogin }: ISignUp) {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        gender: "MALE",
        role: "User",
      });

      alert("Registration successful! Please sign in.");
      onClose();
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Registration failed.";
      alert(errorMessage);
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSwitch={onSwitchToLogin}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      fields={["username", "email", "password"]}
      isRegister={true}
      text1="Sign Up"
      text2="Sign Up"
      text3="Sign In"
    />
  );
}
