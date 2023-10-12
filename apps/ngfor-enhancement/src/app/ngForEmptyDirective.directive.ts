import { NgFor } from '@angular/common';
import {
  Directive,
  inject,
  ViewContainerRef,
  Input,
  TemplateRef,
  EmbeddedViewRef,
  DoCheck,
} from '@angular/core';

// Enhance ngFor directive
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
  hostDirectives: [
    // to avoid importing ngFor in component provider array
    {
      directive: NgFor,
      // exposing inputs and remapping them
      inputs: ['ngForOf:ngForEmptyOf'],
    },
  ],
})
class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  // check if list is undefined or empty
  @Input() ngForEmptyOf: T[] | undefined;

  @Input() ngForEmptyElse!: TemplateRef<unknown>;

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForEmptyOf || this.ngForEmptyOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmptyElse);
    }
  }
}

// we export our directive with a smaller and nicer name
export { NgForEmptyDirective as NgForEmpty };
