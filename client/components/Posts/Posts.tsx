"use client"
import { useFetchPostQuery } from "@/store/post/post.api";
import { PostType } from "@/types/postType";

const Posts = () => {
  const { data: posts, isLoading } = useFetchPostQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {posts?.map((post: PostType) => (
        <ul key={post.id}>
          <li>{post.title}</li>
          <li>{post.description}</li>
        </ul>
      ))}
    </div>
  );
};

export default Posts;
