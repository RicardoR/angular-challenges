import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, map } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';

const TODO_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const HEADERS = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList = new BehaviorSubject<Todo[]>([]);
  private http = inject(HttpClient);

  todoList$ = this.todoList.asObservable();

  loadTodos(): void {
    this.http
      .get<Todo[]>(TODO_BASE_URL)
      .subscribe((todos: Todo[]) => this.todoList.next(todos));
  }

  updateTodo(todo: Todo): void {
    this.http
      .put<Todo>(
        `${TODO_BASE_URL}/${todo.id}`,
        this.todoToString(todo),
        HEADERS
      )
      .pipe(map((todoUpdated: Todo) => this.mapTodos(todoUpdated)))
      .subscribe((todos: Todo[]) => this.todoList.next([...todos]));
  }

  deleteTodo(todo: Todo): void {
    this.http
      .delete<Todo>(`${TODO_BASE_URL}/${todo.id}`)
      .pipe(map(() => this.todoList.value.filter((t) => t.id != todo.id)))
      .subscribe((data: Todo[]) => this.todoList.next([...data]));
  }

  private mapTodos(todoUpdated: Todo): Todo[] {
    return this.todoList.value.map((todo: Todo) => {
      return todo.id === todoUpdated.id ? todoUpdated : todo;
    });
  }

  private todoToString(todo: Todo): string {
    return JSON.stringify({
      todo: todo.id,
      title: randText(),
      userId: todo.userId,
    });
  }
}
