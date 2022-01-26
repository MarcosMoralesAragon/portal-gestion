import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateContractComponent } from './dialog-create-contract.component';

describe('DialogCreateContractComponent', () => {
  let component: DialogCreateContractComponent;
  let fixture: ComponentFixture<DialogCreateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
