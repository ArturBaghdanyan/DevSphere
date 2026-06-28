import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUser, setUser } from "../slices/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data.user));
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("accessToken", data.access_token);
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
        body: { refreshToken: localStorage.getItem("refreshToken") },
      }),
    }),

    register: builder.mutation({
      query: (body: {
        username: string;
        email: string;
        password: string;
        gender: string;
        role: string;
      }) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(clearUser());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
