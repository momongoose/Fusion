import { TestBed } from '@angular/core/testing';

import { EinteilungPraeService } from './einteilung-prae.service';

describe('EinteilungPraeService', () => {
  let service: EinteilungPraeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinteilungPraeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
