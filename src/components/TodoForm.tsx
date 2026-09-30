import { useState, type SubmitEvent } from "react";
import type { TodoCreate, Todo } from "../types/todo";

interface TodoFormProps {
  initialTodo?: Todo;
  onSubmit: (todoData: TodoCreate) => void;
  onCancel: () => void;
}

const TodoForm = ({ initialTodo, onSubmit, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState(initialTodo?.title ?? "");

  const [description, setDescription] = useState(
    initialTodo?.description ?? "",
  );

  const [completed, setCompleted] = useState(initialTodo?.completed ?? false);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoData: TodoCreate = {
      title,
      description,
      completed,
    };

    onSubmit(todoData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {initialTodo ? "Edit Todo" : "Add Todo"}
      </h2>

      <div className="mt-4">
        <label
          htmlFor="todo-title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="Enter Todo title"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="todo-description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="todo-description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder="Enter Todo description"
          rows={4}
          required
          className="mt-1 w-full resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => {
            setCompleted(event.target.checked);
          }}
          className="h-4 w-4"
        />
        Mark as completed
      </label>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {initialTodo ? "Update Todo" : "Create Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
