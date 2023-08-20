import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [LoaderService],
    });

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
  });

  it('should define the loader attr', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('should hide the spinner when loaderService hide the spinner', () => {
    loaderService.hide();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const spinnerElement = compiled.querySelector('.spinner');
    expect(spinnerElement).toBeFalsy();
  });

  it('should display the spinner when loaderService show the spinner', () => {
    loaderService.show();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const spinnerElement = compiled.querySelector('.spinner');
    expect(spinnerElement).toBeTruthy();
  });
});
