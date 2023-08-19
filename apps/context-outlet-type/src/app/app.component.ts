import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from './list.component';
import { PersonComponent } from './person.component';
import { PersonTypeDirective } from './directives/person.type.directive';
import { ListTypeDirective } from './directives/list.type.directive';

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    PersonTypeDirective,
    ListTypeDirective,
  ],
  selector: 'app-root',
  template: `
    <p>
      <a
        href="https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6"
        target="_blank">
        Ver la explicación</a
      >
    </p>
    <person [person]="person">
      <ng-template person let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template [appList]="students" let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template [appList]="cities" let-list let-city let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
