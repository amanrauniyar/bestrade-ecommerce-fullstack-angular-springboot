import { TestBed } from '@angular/core/testing';

import { BesTradeFormService } from './bes-trade-form.service';

describe('BesTradeFormService', () => {
  let service: BesTradeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BesTradeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
