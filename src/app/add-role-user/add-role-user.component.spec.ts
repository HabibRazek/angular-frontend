import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleUserComponent } from './add-role-user.component';

describe('AddRoleUserComponent', () => {
  let component: AddRoleUserComponent;
  let fixture: ComponentFixture<AddRoleUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleUserComponent]
    });
    fixture = TestBed.createComponent(AddRoleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
