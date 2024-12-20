import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApiSlice = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["Todos"],
      keepUnusedDataFor: 3 / 60
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos/add",
        method: "POST",
        body: todo,
      }),
      // invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, completed}) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: {
          completed,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todosApiSlice;