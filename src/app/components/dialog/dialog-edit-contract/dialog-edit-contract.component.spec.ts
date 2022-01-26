import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContractComponent } from './dialog-edit-contract.component';

describe('DialogEditContractComponent', () => {
  let component: DialogEditContractComponent;
  let fixture: ComponentFixture<DialogEditContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
