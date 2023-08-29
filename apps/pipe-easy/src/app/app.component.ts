import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ConcatPipe } from './concat.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ConcatPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | concat : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
