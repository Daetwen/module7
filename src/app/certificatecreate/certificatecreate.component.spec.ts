import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CertificateCreateComponent} from './certificatecreate.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('CertificateCreateComponent', () => {
  let component: CertificateCreateComponent;
  let fixture: ComponentFixture<CertificateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CertificateCreateComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
