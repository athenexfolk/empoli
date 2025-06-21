import { Component, inject, input, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveTypeService } from '../../../core/services/leave-type.service';
import { LeaveTypeStore } from '../../../core/stores/leave-type.store';
import type { UpdateLeaveTypeDto } from '../../../core/dtos/update-leave-type';
import type { LeaveType } from '../../../core/models/leave-type';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-update-leave-type',
  imports: [ReactiveFormsModule, PageWrapper, Button, Icon],
  templateUrl: './update-leave-type.html',
  styleUrl: './update-leave-type.css',
})
export class UpdateLeaveType implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly leaveTypeStore = inject(LeaveTypeStore);
  private readonly leaveTypeService = inject(LeaveTypeService);
  private readonly toastService = inject(ToastService);

  leaveType = input.required<LeaveType>();

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

  ngOnInit() {
    if (this.leaveType) {
      this.form.patchValue(this.leaveType());
    }
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.form.disable();
      const dto: UpdateLeaveTypeDto = {
        name: this.name.value,
        description: this.description.value,
        maxDays: this.maxDays.value,
        requireApproval: this.requireApproval.value,
        paidLeave: this.paidLeave.value,
      };
      this.leaveTypeService
        .updateLeaveType(this.leaveType().id, dto)
        .subscribe({
          next: (updated) => {
            this.leaveTypeStore.update(
              (lt) => lt.id === this.leaveType().id,
              updated,
            );
            this.form.enable();
            this.isSubmitting = false;
            this.errorMessage = undefined;
            this.successMessage = 'Leave type updated successfully!';
            this.toastService.push(
              'Successfully!',
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
                'Failed to update leave type. Please try again later.';
            }
            this.toastService.push('Failed!', this.errorMessage!, 'error');
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
