"use client";

import { useState } from "react";
import { useLoginMutation } from "@/store/services/auth.api";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await login(form).unwrap();
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
