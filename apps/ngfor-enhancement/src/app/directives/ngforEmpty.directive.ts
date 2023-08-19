import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
export class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  @Input() ngForOf?: T[] = undefined;

  @Input() ngForEmpty!: TemplateRef<unknown>;

  @Input() set ngForCurrentSize(size: number | undefined) {
    console.log('current size', size);
  }

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();
    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmpty);
    }
  }
}
