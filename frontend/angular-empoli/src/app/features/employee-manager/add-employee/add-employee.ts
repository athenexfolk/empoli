import { Component, output, inject } from '@angular/core';
import { Overlay } from '../../../shared/components/overlay/overlay';
import { OverlayCard } from '../../../shared/components/overlay-card/overlay-card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import type { CreateEmployeeDto } from '../../../core/dtos/create-employee';
import { EmployeeStore } from '../../../core/stores/employee.store';

@Component({
  selector: 'app-add-employee',
  imports: [Overlay, OverlayCard, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  private readonly fb = inject(FormBuilder);
  private readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  form = this.fb.nonNullable.group({
    code: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  isSubmitting = false;

  closed = output();

  get code() {
    return this.form.get('code')!;
  }

  get firstName() {
    return this.form.get('firstName')!;
  }

  get lastName() {
    return this.form.get('lastName')!;
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.form.disable();

      let dto: CreateEmployeeDto = {
        code: this.code.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
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
          this.form.setErrors({ serverError: 'Failed to add employee' });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
