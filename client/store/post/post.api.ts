import { PostType } from "@/types/postType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/posts" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<PostType, Partial<PostType>>({
      query: (newPost) => ({
        url: "/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    fetchPost: builder.query<PostType[], void>({
      query: () => "/",
      providesTags: ["Post"],
    }),
  }),
});

export const { useCreatePostMutation, useFetchPostQuery } = postApi;
