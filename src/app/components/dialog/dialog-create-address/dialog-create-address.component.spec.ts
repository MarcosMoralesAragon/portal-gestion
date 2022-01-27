import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateAddressComponent } from './dialog-create-address.component';

describe('DialogCreateAddressComponent', () => {
  let component: DialogCreateAddressComponent;
  let fixture: ComponentFixture<DialogCreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
