import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderCreateComponent } from './modalordercreate.component';

describe('ModalOrderCreateComponent', () => {
  let component: ModalOrderCreateComponent;
  let fixture: ComponentFixture<ModalOrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
