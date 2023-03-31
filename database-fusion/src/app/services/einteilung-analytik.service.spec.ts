import { TestBed } from '@angular/core/testing';

import { EinteilungAnalytikService } from './einteilung-analytik.service';

describe('EinteilungAnalytikService', () => {
  let service: EinteilungAnalytikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinteilungAnalytikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
