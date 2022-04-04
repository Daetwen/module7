import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ModalUserFindComponent} from './modaluserfind.component';

describe('ModalUserFindComponent', () => {
  let component: ModalUserFindComponent;
  let fixture: ComponentFixture<ModalUserFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
