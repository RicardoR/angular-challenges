import { DebugElement, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  private isAdmin = new BehaviorSubject<boolean>(false);

  user$ = this.user.asObservable();
  isAdmin$ = this.isAdmin.asObservable();

  add(user: User): void {
    this.user.next(user);
    this.isAdmin.next(user.isAdmin);
  }

  hasAnyRole(role: Role | Role[]): Observable<boolean | undefined> {
    return this.user$.pipe(
      map((user) => {
        if (user?.isAdmin) return true;

        const roles: Role[] = Array.isArray(role) ? role : [role];
        return roles.length === 0 || user?.roles.some((r) => roles.includes(r));
      })
    );
  }
}
