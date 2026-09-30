import type { Todo } from "../types/todo";

interface TodoCardProps {
  todo: Todo;
  onToggle: (todoId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
}

const TodoCard = ({ todo, onToggle, onEdit, onDelete }: TodoCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 cursor-pointer"
        />

        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>

          <p
            className={`mt-1 text-sm ${
              todo.completed ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>

          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
