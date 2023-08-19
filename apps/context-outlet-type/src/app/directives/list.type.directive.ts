import { Directive, Input } from '@angular/core';

interface ListTemplateContext<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListTypeDirective<T> {
  // To give our directive the type of our list, we need to pass this type to our directive. In Angular, the only way to give this information at compile time is through Inputs.
  @Input('appList') list!: T[];

  static ngTemplateContextGuard<TContext>(
    directive: ListTypeDirective<TContext>,
    context: unknown
  ): context is ListTemplateContext<TContext> {
    return true;
  }
}
