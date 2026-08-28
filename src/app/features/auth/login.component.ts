import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private readonly fb = inject(FormBuilder);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    error = '';
    readonly form = this.fb.nonNullable.group({
        email: ['admin@commerce.dev', [Validators.required, Validators.email]],
        password: ['password', [Validators.required, Validators.minLength(6)]],
    });
    submit(): void {
        if (this.form.invalid)
            return;
        const { email, password } = this.form.getRawValue();
        this.auth.login(email, password).subscribe((success) => {
            if (success) {
                void this.router.navigateByUrl('/command-center');
            }
            else {
                this.error = 'Invalid demo credentials.';
            }
        });
    }
}

