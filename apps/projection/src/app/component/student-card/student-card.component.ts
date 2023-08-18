import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }
}
