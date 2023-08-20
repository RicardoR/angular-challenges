import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="isLoading | async" class="overlay">
      <mat-spinner class="spinner"> </mat-spinner>
    </div>
  `,
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  isLoading: Observable<boolean> = this.loaderService.getLoadingStatus();
}
