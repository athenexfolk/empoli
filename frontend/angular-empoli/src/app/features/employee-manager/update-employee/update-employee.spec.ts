import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployee } from './update-employee';

describe('UpdateEmployee', () => {
  let component: UpdateEmployee;
  let fixture: ComponentFixture<UpdateEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
