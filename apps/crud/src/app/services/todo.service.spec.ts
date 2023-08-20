import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

const TODO_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const todo: Todo = {
  userId: 4,
  id: 5,
  completed: false,
  title: 'The super todo',
};

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the todoList as observable', () => {
    expect(service.todoList$ instanceof Observable).toBeTruthy();
  });

  it('should get the todos in the expected url with the expected method', () => {
    service.loadTodos();
    const req = httpMock.expectOne(TODO_BASE_URL);

    expect(req.request.method).toBe('GET');
  });

  it('should be able to update a todo', () => {
    service.updateTodo(todo);
    const req = httpMock.expectOne(`${TODO_BASE_URL}/${todo.id}`);

    expect(req.request.method).toBe('PUT');
  });

  it('should be able to delete a todo', () => {
    service.deleteTodo(todo);
    const req = httpMock.expectOne(`${TODO_BASE_URL}/${todo.id}`);

    expect(req.request.method).toBe('DELETE');
  });
});
