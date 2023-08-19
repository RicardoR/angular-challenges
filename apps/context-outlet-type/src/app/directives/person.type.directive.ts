import { Directive } from '@angular/core';

export interface PersonContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonTypeDirective {
  static ngTemplateContextGuard(
    directive: PersonTypeDirective,
    context: unknown
  ): context is PersonContext {
    return true;
  }
}
