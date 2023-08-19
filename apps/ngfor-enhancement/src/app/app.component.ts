import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './directives/ngforEmpty.directive';
import { randFirstName } from '@ngneat/falso';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmptyDirective, NgFor],
  selector: 'app-root',
  template: `
    <div
      *ngFor="
        let person of persons;
        empty: emptyList;
        currentSize: persons.length
      ">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <p><button (click)="addPerson()">Add Person</button></p>
    <p><button (click)="clearPersons()">Clear Persons</button></p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  addPerson(): void {
    this.persons.push({ name: randFirstName() });
  }

  clearPersons(): void {
    this.persons = [];
  }
}
