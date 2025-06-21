import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeStore } from '../../../core/stores/employee.store';
import type { UpdateEmployeeDto } from '../../../core/dtos/update-employee';
import type { Employee } from '../../../core/models/employee';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-update-employee',
  imports: [ReactiveFormsModule, PageWrapper, Button, Icon],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee {
  private readonly fb = inject(FormBuilder);
  private readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);
  private readonly toastService = inject(ToastService);

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

  successMessage?: string;
  errorMessage?: string;

  employee = input.required<Employee>();

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

  ngOnInit() {
    this.form.patchValue({
      personal: {
        firstName: this.employee().firstName,
        lastName: this.employee().lastName,
        dateOfBirth: this.employee().dateOfBirth.split('T')[0],
      },
      contact: {
        email: this.employee().email,
        phoneNumber: this.employee().phoneNumber,
      },
      job: {
        hireDate: this.employee().hireDate.split('T')[0],
        jobTitle: this.employee().jobTitle,
        department: this.employee().department,
      },
    });
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.form.disable();

      let dto: UpdateEmployeeDto = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        dateOfBirth: this.dateOfBirth.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        hireDate: this.hireDate.value,
        jobTitle: this.jobTitle.value,
        department: this.department.value,
      };

      this.employeeService.updateEmployee(this.employee().id, dto).subscribe({
        next: (employee) => {
          this.employeeStore.update(
            (e) => e.id === this.employee().id,
            employee,
          );
          this.form.enable();
          this.isSubmitting = false;
          this.errorMessage = undefined;
          this.successMessage = 'Employee updated successfully';
          this.toastService.push(
            'Successfully',
            this.successMessage,
            'success',
          );
        },
        error: (err) => {
          this.form.enable();
          this.isSubmitting = false;
          this.successMessage = undefined;
          if (Array.isArray(err.error)) {
            this.errorMessage = err.error
              .map((e: any) => e.errorMessage)
              .filter((msg: string) => !!msg)
              .join('\n');
          } else {
            this.errorMessage =
              'Failed to add employee. Please try again later.';
          }
          this.toastService.push('Failed!', this.errorMessage!, 'error');
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
