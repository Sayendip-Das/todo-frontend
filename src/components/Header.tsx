import type { User } from "../types/user";

interface HeaderProps {
  currentUser: User | null;
  onAddTodo: () => void;
  onLogout: () => void;
}

function Header({ onAddTodo, onLogout, currentUser }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">TodoApp</h1>

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <button
            type="button"
            onClick={onAddTodo}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Todo
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
