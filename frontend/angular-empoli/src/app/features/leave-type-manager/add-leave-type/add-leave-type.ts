import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveTypeService } from '../../../core/services/leave-type.service';
import type { CreateLeaveTypeDto } from '../../../core/dtos/create-leave-type';
import { LeaveTypeStore } from '../../../core/stores/leave-type.store';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-add-leave-type',
  imports: [ReactiveFormsModule, PageWrapper, Button, Icon],
  templateUrl: './add-leave-type.html',
  styleUrl: './add-leave-type.css',
})
export class AddLeaveType {
  private readonly fb = inject(FormBuilder);
  private readonly leaveTypeStore = inject(LeaveTypeStore);
  private readonly leaveTypeService = inject(LeaveTypeService);
  private readonly toastService = inject(ToastService);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    maxDays: [0, Validators.required],
    requireApproval: [false],
    paidLeave: [false],
  });

  isSubmitting = false;
  successMessage?: string;
  errorMessage?: string;

  get name() {
    return this.form.get('name')!;
  }
  get description() {
    return this.form.get('description')!;
  }
  get maxDays() {
    return this.form.get('maxDays')!;
  }
  get requireApproval() {
    return this.form.get('requireApproval')!;
  }
  get paidLeave() {
    return this.form.get('paidLeave')!;
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.form.disable();
      const dto: CreateLeaveTypeDto = {
        name: this.name.value,
        description: this.description.value,
        maxDays: this.maxDays.value,
        requireApproval: this.requireApproval.value,
        paidLeave: this.paidLeave.value,
      };
      this.leaveTypeService.createLeaveType(dto).subscribe({
        next: (leaveType) => {
          this.leaveTypeStore.add(leaveType);
          this.form.reset();
          this.form.enable();
          this.isSubmitting = false;
          this.errorMessage = undefined;
          this.successMessage = 'Leave type created successfully!';
          this.toastService.push('Successfully!', this.successMessage, 'success');
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
            this.errorMessage = 'Failed to add leave type. Please try again later.';
          }
          this.toastService.push('Failed!', this.errorMessage!, 'error');
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
