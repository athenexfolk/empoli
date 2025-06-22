import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, Button],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);

    form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    get email() {
        return this.form.get('email')!;
    }

    get password() {
        return this.form.get('password')!;
    }

    isSubmitting = false;

    errorMessage?: string;

    login() {
        if (this.form.invalid) {
            return;
        }

        this.form.disable();
        this.isSubmitting = true;
        this.errorMessage = undefined;

        this.authService
            .login(this.email.value, this.password.value)
            .subscribe({
                next: () => {
                    this.form.enable();
                    this.isSubmitting = false;
                    const returnUrl =
                        this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);
                },
                error: (err) => {
                    this.form.enable();
                    this.isSubmitting = false;
                    this.errorMessage = err.error.message || 'Login failed';
                },
            });
    }
}
