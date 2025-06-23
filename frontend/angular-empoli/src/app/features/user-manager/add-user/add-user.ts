import { Component, inject } from '@angular/core';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { UserStore } from '../../../core/stores/user.store';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';
import type { CreateUserDto } from '../../../core/dtos/create-user';
import { RoleStore } from '../../../core/stores/role.store';
import { RoleService } from '../../../core/services/role.service';

@Component({
    selector: 'app-add-user',
    imports: [ReactiveFormsModule, PageWrapper, Button, Icon],
    templateUrl: './add-user.html',
    styleUrl: './add-user.css',
})
export class AddUser {
    private readonly fb = inject(FormBuilder);
    private readonly userStore = inject(UserStore);
    private readonly userService = inject(UserService);
    private readonly toastService = inject(ToastService);
    protected readonly roleStore = inject(RoleStore);
    private readonly roleService = inject(RoleService);

    form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', [Validators.required]],
    });

    isSubmitting = false;

    successMessage?: string;
    errorMessage?: string;

    get email() {
        return this.form.get('email')!;
    }

    get password() {
        return this.form.get('password')!;
    }

    get role() {
        return this.form.get('role')!;
    }

    ngOnInit() {
        if (!this.roleStore.isLoaded) {
            this.roleService.getRoles().subscribe({
                next: (roles) => {
                    this.roleStore.loadRoles(roles);
                },
            });
        }
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.form.disable();

        let dto: CreateUserDto = {
            email: this.email.value,
            password: this.password.value,
        };

        this.userService.createUser(dto, this.role.value).subscribe({
            next: (user) => {
                this.userStore.add(user);
                this.userStore.update((u) => u.id === user.id, {
                    ...user,
                    role: this.role.value,
                });
                this.form.reset();
                this.form.enable();
                this.isSubmitting = false;
                this.errorMessage = undefined;
                this.successMessage = 'User created successfully.';
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
                        'Failed to add user. Please try again later.';
                }
                this.toastService.push('Failed!', this.errorMessage!, 'error');
            },
        });
    }
}
