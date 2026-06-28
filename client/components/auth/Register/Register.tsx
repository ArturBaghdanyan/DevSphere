"use client";

import { useState } from "react";
import { useRegisterMutation } from "@/store/services/auth.api";

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    role: "user",
  });

  const handleLogin = async () => {
    try {
      await register(form).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <input
        placeholder="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
    </div>
  );
}
