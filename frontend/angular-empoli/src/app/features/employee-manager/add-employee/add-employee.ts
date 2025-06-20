import { Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import type { CreateEmployeeDto } from '../../../core/dtos/create-employee';
import { EmployeeStore } from '../../../core/stores/employee.store';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  private readonly fb = inject(FormBuilder);
  private readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', Validators.email],
    phoneNumber: [''],
    hireDate: ['', Validators.required],
    jobTitle: ['', Validators.required],
    department: ['', Validators.required],
  });

  isSubmitting = false;

  closed = output();

  get firstName() {
    return this.form.get('firstName')!;
  }

  get lastName() {
    return this.form.get('lastName')!;
  }

  get dateOfBirth() {
    return this.form.get('dateOfBirth')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get phoneNumber() {
    return this.form.get('phoneNumber')!;
  }

  get hireDate() {
    return this.form.get('hireDate')!;
  }

  get jobTitle() {
    return this.form.get('jobTitle')!;
  }

  get department() {
    return this.form.get('department')!;
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.form.disable();

      let dto: CreateEmployeeDto = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        dateOfBirth: this.dateOfBirth.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        hireDate: this.hireDate.value,
        jobTitle: this.jobTitle.value,
        department: this.department.value,
      };

      this.employeeService.createEmployee(dto).subscribe({
        next: (employee) => {
          this.employeeStore.add(employee);
          this.form.reset();
          this.form.enable();
          this.isSubmitting = false;
          this.closed.emit();
        },
        error: (err) => {
          console.error('Failed to add employee', err);
          this.form.enable();
          this.isSubmitting = false;
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
