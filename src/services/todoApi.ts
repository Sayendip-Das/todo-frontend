import axios from "axios";
import type {
  TodoCreate,
  TodoListResponse,
  TodoResponse,
  TodoUpdate,
  TodoPatch,
  MessageResponse,
} from "../types/todo";

// GET API - To Fetch All Todos
export const getTodos = async (
  accessToken: string,
): Promise<TodoListResponse> => {
  // const accessToken = getAccessToken();
  const response = await axios.get<TodoListResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/todo/get-todos`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// POST API - To Create a new Todo
export const createTodo = async (
  todoData: TodoCreate,
  accessToken: string,
): Promise<TodoResponse> => {
  const response = await axios.post<TodoResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/todo/create-todo`,
    todoData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// PUT API - Completely update an existing Todo
export const updateTodo = async (
  todoId: string,
  todoData: TodoUpdate,
  accessToken: string,
): Promise<TodoResponse> => {
  const response = await axios.put<TodoResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/todo/update-todo/${todoId}`,
    todoData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

// PATCH API - Update only selected Todo fields
export const partialUpdateTodo = async (
  todoId: string,
  todoData: TodoPatch,
  accessToken: string,
): Promise<TodoResponse> => {
  const response = await axios.patch<TodoResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/todo/update-todo/${todoId}`,
    todoData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

// DELETE API - Delete an existing Todo
export const deleteTodo = async (
  todoId: string,
  accessToken: string,
): Promise<MessageResponse> => {
  const response = await axios.delete<MessageResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/todo/delete-todo/${todoId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
