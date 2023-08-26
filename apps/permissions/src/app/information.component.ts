import {
  Role,
  client,
  everyone,
  manager,
  reader,
  readerAndWriter,
} from './user.model';
import { HasRoleDirective } from './has-role.directive';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleIsAdmin="true">visible only for super admin</div>
    <div *hasRole="MANAGER_ROLES">visible if manager</div>
    <div *hasRole="MANAGER_READER_ROLES">visible if manager and/or reader</div>
    <div *hasRole="READER_WRITER_ROLES">visible if manager and/or writer</div>
    <div *hasRole="CLIENT_ROLES">visible if client</div>
    <div *hasRole="EVERYONE_ROLES">visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  READER_WRITER_ROLES = readerAndWriter.roles;
  MANAGER_ROLES = manager.roles;
  MANAGER_READER_ROLES = [...manager.roles, ...reader.roles];
  CLIENT_ROLES = [...client.roles];
  EVERYONE_ROLES = [...everyone.roles];

  user$ = this.userStore.user$;
  constructor(private userStore: UserStore) {}
}
