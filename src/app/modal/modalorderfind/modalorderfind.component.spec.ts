import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderFindComponent } from './modalorderfind.component';

describe('ModalOrderFindComponent', () => {
  let component: ModalOrderFindComponent;
  let fixture: ComponentFixture<ModalOrderFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
