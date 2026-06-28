import CreatePost from "@/components/Posts/CreatePosts";
import Posts from "@/components/Posts/Posts";
import React from "react";

const AllPosts = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost />
      <Posts />
    </div>
  );
};

export default AllPosts;
