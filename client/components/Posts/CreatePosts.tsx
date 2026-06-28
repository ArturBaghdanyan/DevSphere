"use client";
import { useState } from "react";
import { useCreatePostMutation } from "@/store/post/post.api";

export default function CreatePost() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        ...formData,
        content_type: "text", 
      }).unwrap();
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error("Failed to create:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-[#1e1e1e] rounded-lg"
    >
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="p-2 bg-[#2a2a2a] text-white rounded"
      />
      <input
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="p-2 bg-[#2a2a2a] text-white rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 rounded font-bold"
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
