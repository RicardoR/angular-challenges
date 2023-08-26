/* eslint-disable @angular-eslint/directive-selector */
import { NgIfContext } from '@angular/common';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input('hasRole') role: Role | Role[] | undefined = undefined;

  @Input('hasRoleIsAdmin') isAdmin = false;

  @Input('hasRoleIsAdminElseTemplate')
  elseTemplate?: TemplateRef<NgIfContext> | null;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private store: UserStore
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.store.isAdmin$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((isAdmin) =>
          isAdmin ? this.addTemplate() : this.addElseTemplate()
        );
    } else if (this.role) {
      this.store
        .hasAnyRole(this.role)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((hasPermission) => {
          hasPermission ? this.addTemplate() : this.addElseTemplate();
        });
    } else {
      this.addTemplate();
    }
  }

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private addElseTemplate() {
    this.viewContainer.clear();
    this.elseTemplate &&
      this.viewContainer.createEmbeddedView(this.elseTemplate);
  }
}
