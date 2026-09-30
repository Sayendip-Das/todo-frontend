import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../types/todo";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    replaceTodo: (state, action: PayloadAction<Todo>) => {
      const updatedTodo = action.payload;

      state.todos = state.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }

        return todo;
      });
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;

      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },

    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { setTodos, addTodo, replaceTodo, removeTodo, clearTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
