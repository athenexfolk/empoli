import { Component, inject, input, output } from '@angular/core';
import { Overlay } from '../../../shared/components/overlay/overlay';
import { OverlayCard } from '../../../shared/components/overlay-card/overlay-card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeStore } from '../../../core/stores/employee.store';
import type { UpdateEmployeeDto } from '../../../core/dtos/update-employee';
import type { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-update-employee',
  imports: [Overlay, OverlayCard, ReactiveFormsModule],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee {
  private readonly fb = inject(FormBuilder);
  private readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  isSubmitting = false;

  employee = input.required<Employee>();
  closed = output();

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

      let dto: UpdateEmployeeDto = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
      };

      this.employeeService.updateEmployee(this.employee().id, dto).subscribe({
        next: (employee) => {
          this.employeeStore.update(
            (e) => e.id === this.employee().id,
            employee,
          );
          this.form.reset();
          this.form.enable();
          this.isSubmitting = false;
          this.closed.emit();
        },
        error: (err) => {
          console.error('Failed to update employee', err);
          this.form.enable();
          this.isSubmitting = false;
          this.form.setErrors({ serverError: 'Failed to update employee' });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
