import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManager } from './user-manager';

describe('UserManager', () => {
  let component: UserManager;
  let fixture: ComponentFixture<UserManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
