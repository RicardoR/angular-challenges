import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngIf="todoList$ | async as todos">
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  todoList$!: Observable<Todo[]>;

  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.loadTodos();
    this.todoList$ = this.todoService.todoList$;
  }

  update(todo: Todo): void {
    this.todoService.updateTodo(todo);
  }
}
