import { TestBed } from '@angular/core/testing';

import { EinteilungAnalService } from './einteilung-anal.service';

describe('EinteilungAnalService', () => {
  let service: EinteilungAnalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinteilungAnalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
