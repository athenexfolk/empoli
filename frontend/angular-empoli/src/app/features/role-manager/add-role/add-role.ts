import { Component, inject } from '@angular/core';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { RoleStore } from '../../../core/stores/role.store';
import { RoleService } from '../../../core/services/role.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-add-role',
    imports: [ReactiveFormsModule, PageWrapper, Button, Icon],
    templateUrl: './add-role.html',
    styleUrl: './add-role.css',
})
export class AddRole {
    private readonly fb = inject(FormBuilder);
    private readonly roleStore = inject(RoleStore);
    private readonly roleService = inject(RoleService);
    private readonly toastService = inject(ToastService);

    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
    });

    isSubmitting = false;
    successMessage?: string;
    errorMessage?: string;

    get name() {
        return this.form.get('name')!;
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.form.disable();

        this.roleService.createRole(this.name.value).subscribe({
            next: (role) => {
                this.roleStore.add(role);
                this.form.reset();
                this.form.enable();
                this.isSubmitting = false;
                this.errorMessage = undefined;
                this.successMessage = 'Role created successfully.';
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
                        'Failed to add role. Please try again later.';
                }
                this.toastService.push('Failed!', this.errorMessage!, 'error');
            },
        });
    }
}
