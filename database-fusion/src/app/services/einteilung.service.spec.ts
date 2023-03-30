import { TestBed } from '@angular/core/testing';

import { EinteilungService } from './einteilung.service';

describe('EinteilungService', () => {
  let service: EinteilungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinteilungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
