import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCertificateFindComponent } from './modalcertificatefind.component';

describe('ModalCertificateFindComponent', () => {
  let component: ModalCertificateFindComponent;
  let fixture: ComponentFixture<ModalCertificateFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCertificateFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCertificateFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
