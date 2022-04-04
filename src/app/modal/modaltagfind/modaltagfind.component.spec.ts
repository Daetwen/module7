import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTagFindComponent } from './modaltagfind.component';

describe('ModalTagFindComponent', () => {
  let component: ModalTagFindComponent;
  let fixture: ComponentFixture<ModalTagFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTagFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTagFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
