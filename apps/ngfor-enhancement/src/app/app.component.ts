import { Component } from '@angular/core';
import { NgForEmpty } from './ngForEmptyDirective.directive';

@Component({
  standalone: true,
  imports: [NgForEmpty], // no need to import ngFor
  selector: 'app-root',
  template: `
    <div *ngForEmpty="let person of persons; else: empty">
      {{ person }}
    </div>
    <ng-template #empty>The list is empty !!</ng-template>
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
  `,
})
export class AppComponent {
  persons?: string[] = undefined;

  clear() {
    this.persons = [];
  }
  add() {
    if (!this.persons) this.persons = [];
    this.persons?.push('tutu');
  }
}
