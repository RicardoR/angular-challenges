import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLoadingStatus should return the isLoading obs', () => {
    const isLoading = service.getLoadingStatus();
    expect(isLoading).toBeDefined();
  });

  it('should emit true when show is called', fakeAsync(() => {
    service.show();
    flush();
    service.getLoadingStatus().subscribe((v) => expect(v).toBe(true));
  }));

  it('should emit false when hide is called', fakeAsync(() => {
    service.hide();
    flush();
    service.getLoadingStatus().subscribe((v) => expect(v).toBe(false));
  }));
});
