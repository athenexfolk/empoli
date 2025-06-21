import { Component, computed, inject, signal } from '@angular/core';
import { LeaveTypeService } from '../../../core/services/leave-type.service';
import type { LeaveType } from '../../../core/models/leave-type';
import { LeaveTypeStore } from '../../../core/stores/leave-type.store';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { compareField } from '../../../shared/utils/compare-field';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Button } from '../../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { Icon } from "../../../shared/components/icon/icon";

@Component({
  selector: 'leave-type-list',
  imports: [
    CdkTableModule,
    FormsModule,
    SortIndicator,
    Button,
    RouterLink,
    Icon
],
  templateUrl: './leave-type-list.html',
  styleUrl: './leave-type-list.css',
})
export class LeaveTypeList {
  protected readonly leaveTypeStore = inject(LeaveTypeStore);
  private readonly leaveTypeService = inject(LeaveTypeService);

  protected sortField = signal<keyof LeaveType>('name');
  protected sortDirection = signal<'asc' | 'desc'>('asc');

  protected displayedColumns = [
    'index',
    'name',
    'description',
    'maxDays',
    'requireApproval',
    'paidLeave',
    'actions',
  ];

  protected nameFilter = signal('');
  protected descriptionFilter = signal('');
  protected maxDaysFilter = signal('');
  protected requireApprovalFilter = signal('');
  protected paidLeaveFilter = signal('');

  protected readonly filteredLeaveTypes = computed(() => {
    const field = this.sortField();
    const dir = this.sortDirection();

    return this.leaveTypeStore
      .items()
      .filter(
        (lt) =>
          (lt.name?.toLowerCase() ?? '').includes(
            this.nameFilter().toLowerCase(),
          ) &&
          (lt.description?.toLowerCase() ?? '').includes(
            this.descriptionFilter().toLowerCase(),
          ) &&
          (this.maxDaysFilter() === '' ||
            (lt.maxDays !== undefined &&
              lt.maxDays !== null &&
              lt.maxDays.toString().includes(this.maxDaysFilter()))) &&
          (this.requireApprovalFilter() === '' ||
            (lt.requireApproval !== undefined &&
              lt.requireApproval !== null &&
              lt.requireApproval
                .toString()
                .toLowerCase()
                .includes(this.requireApprovalFilter().toLowerCase()))) &&
          (this.paidLeaveFilter() === '' ||
            (lt.paidLeave !== undefined &&
              lt.paidLeave !== null &&
              lt.paidLeave
                .toString()
                .toLowerCase()
                .includes(this.paidLeaveFilter().toLowerCase()))),
      )
      .sort((a, b) => compareField(a, b, field, dir));
  });

  ngOnInit() {
    if (!this.leaveTypeStore.isLoaded) {
      this.leaveTypeService.getLeaveTypes().subscribe({
        next: (leaveTypes) => {
          this.leaveTypeStore.loadLeaveTypes(leaveTypes);
        },
      });
    }
  }

  setSort(field: keyof LeaveType) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
