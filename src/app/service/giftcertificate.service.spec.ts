import { TestBed } from '@angular/core/testing';

import { CertificateService } from './giftcertificate.service';

describe('SpaceyService', () => {
  let service: CertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
