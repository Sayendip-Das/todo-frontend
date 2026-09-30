// Represents a complete Todo returned by the backend
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Data sent to the backend when creating a new Todo
// The ID is not included because the backend creates it
export interface TodoCreate {
  title: string;
  description: string;
  completed: boolean;
}

// Data sent when completely updating a Todo using PUT
// All fields are required because PUT replaces the complete Todo information
export interface TodoUpdate {
  title: string;
  description: string;
  completed: boolean;
}

// Data sent when partially updating a Todo using PATCH
// Fields are optional because only the changed fields need to be sent
export interface TodoPatch {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Response returned when the backend creates, fetches,
// updates, or deletes a single Todo
export interface TodoResponse {
  message: string;
  error?: string | null;
  todo: Todo;
}

// Response returned when the backend fetches all Todos
export interface TodoListResponse {
  message: string;
  error?: string | null;
  todos: Todo[];
}

// General response used when the backend only returns
// a success or error message without Todo data
export interface MessageResponse {
  message: string;
  error?: string | null;
}
