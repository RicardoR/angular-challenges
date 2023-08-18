import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styles: [],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }
}
