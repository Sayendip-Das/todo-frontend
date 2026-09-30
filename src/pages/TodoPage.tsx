import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import Loader from "../components/Loader";
import type { Todo, TodoCreate } from "../types/todo";
import {
  getTodos,
  createTodo,
  updateTodo,
  partialUpdateTodo,
  deleteTodo,
} from "../services/todoApi";
import { logoutUser, getCurrentUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { logout, setCurrentUser } from "../features/auth/authSlice";
import {
  setTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  clearTodos,
} from "../features/todos/todoSlice";

const TodoPage = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [editOrCreateTodo, setEditOrCreateTodo] = useState<Todo | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!accessToken) {
        return;
      }

      try {
        const userData = await getCurrentUser(accessToken);

        dispatch(setCurrentUser(userData));
      } catch {
        toast.error("Unable to load user profile");
      }
    };

    fetchCurrentUser();
  }, [accessToken, dispatch]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);

        const responseData = await getTodos(accessToken);

        dispatch(setTodos(responseData.todos));
      } catch {
        toast.error("Unable to load Todos");
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, [accessToken, dispatch]);

  const handleAddTodo = () => {
    setEditOrCreateTodo(undefined);
    setIsFormOpen(true);
  };

  const handleSubmitTodo = async (todoData: TodoCreate) => {
    if (!accessToken) {
      return;
    }
    try {
      if (editOrCreateTodo) {
        const responseData = await updateTodo(
          editOrCreateTodo.id,
          todoData,
          accessToken,
        );

        dispatch(replaceTodo(responseData.todo));

        // setTodos((currentTodos) =>
        //   currentTodos.map((todo) => {
        //     if (todo.id === editOrCreateTodo.id) {
        //       return responseData.todo;
        //     }
        //     return todo;
        //   }),
        // );
        toast.success(responseData.message);
      } else {
        const responseData = await createTodo(todoData, accessToken);
        // setTodos((currentTodos) => [...currentTodos, responseData.todo]);
        dispatch(addTodo(responseData.todo));
        toast.success(responseData.message);
      }

      setEditOrCreateTodo(undefined);
      setIsFormOpen(false);
    } catch {
      toast.error(
        editOrCreateTodo ? "Unable to update Todo" : "Unable to create Todo",
      );
    }
  };

  const handleCancelForm = () => {
    setEditOrCreateTodo(undefined);
    setIsFormOpen(false);
  };

  const handleToggleTodo = async (todoId: string) => {
    const selectedTodo = todos.find((todo) => todo.id === todoId);

    if (!selectedTodo || !accessToken) return;

    try {
      const responseData = await partialUpdateTodo(
        todoId,
        {
          completed: !selectedTodo.completed,
        },
        accessToken,
      );

      // setTodos((currentTodos) =>
      //   currentTodos.map((todo) => {
      //     if (todo.id === todoId) {
      //       return responseData.todo;
      //     }
      //     return todo;
      //   }),
      // );

      dispatch(replaceTodo(responseData.todo));
      toast.success(responseData.message);
    } catch {
      toast.error("Unable to update Todo status");
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditOrCreateTodo(todo);
    setIsFormOpen(true);
  };

  const handleDeleteTodo = async (todoId: string) => {
    if (!accessToken) {
      return;
    }

    try {
      const responseData = await deleteTodo(todoId, accessToken);
      // setTodos((currentTodos) =>
      //   currentTodos.filter((todo) => todo.id !== todoId),
      // );
      dispatch(removeTodo(todoId));
      toast.success(responseData.message);
    } catch {
      toast.error("Unable to delete Todo");
    }
  };

  const handleLogout = async () => {
    try {
      const responseData = await logoutUser();

      dispatch(clearTodos());
      dispatch(logout());

      toast.success(responseData.message);

      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Failed to logout");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        currentUser={currentUser}
        onAddTodo={handleAddTodo}
        onLogout={handleLogout}
      />

      <div className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800">
          My Todos
          {currentUser && (
            <span className="ml-2 text-md font-medium text-blue-600">
              ({currentUser?.name})
            </span>
          )}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Keep track of things you need to get done.
        </p>

        <div className="mt-6">
          {isFormOpen && (
            <TodoForm
              key={editOrCreateTodo?.id ?? "create"}
              initialTodo={editOrCreateTodo}
              onSubmit={handleSubmitTodo}
              onCancel={handleCancelForm}
            />
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
