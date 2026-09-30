import TodoCard from "./TodoCard";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (todoId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
}

const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
        <h3 className="text-lg font-medium text-gray-700">No Todos yet</h3>

        <p className="mt-1 text-sm text-gray-500">
          Click Add Todo to create your first Todo.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
