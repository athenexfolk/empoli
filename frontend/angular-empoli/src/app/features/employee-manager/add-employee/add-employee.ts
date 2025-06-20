import { Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import type { CreateEmployeeDto } from '../../../core/dtos/create-employee';
import { EmployeeStore } from '../../../core/stores/employee.store';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, PageWrapper],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  private readonly fb = inject(FormBuilder);
  private readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  form = this.fb.nonNullable.group({
    personal: this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    }),
    contact: this.fb.nonNullable.group({
      email: ['', [Validators.email]],
      phoneNumber: [''],
    }),
    job: this.fb.nonNullable.group({
      hireDate: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
    }),
  });

  isSubmitting = false;

  closed = output();

  get firstName() {
    return this.form.get('personal.firstName')!;
  }

  get lastName() {
    return this.form.get('personal.lastName')!;
  }

  get dateOfBirth() {
    return this.form.get('personal.dateOfBirth')!;
  }

  get email() {
    return this.form.get('contact.email')!;
  }

  get phoneNumber() {
    return this.form.get('contact.phoneNumber')!;
  }

  get hireDate() {
    return this.form.get('job.hireDate')!;
  }

  get jobTitle() {
    return this.form.get('job.jobTitle')!;
  }

  get department() {
    return this.form.get('job.department')!;
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
