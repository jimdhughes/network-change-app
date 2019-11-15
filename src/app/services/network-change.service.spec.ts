import { TestBed } from '@angular/core/testing';

import { NetworkChangeService } from './network-change.service';

describe('NetworkChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkChangeService = TestBed.get(NetworkChangeService);
    expect(service).toBeTruthy();
  });
});
