import { Todo } from './todo.model';

export interface AppState {
  todos: Todo[];
  loading: boolean;
  error?: string;
}
