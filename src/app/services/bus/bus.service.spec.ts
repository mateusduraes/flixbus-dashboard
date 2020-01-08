import { TestBed } from '@angular/core/testing';

import { BusService } from './bus.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: BusService = TestBed.get(BusService);
    expect(service).toBeTruthy();
  });
});
