import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
  }
}
