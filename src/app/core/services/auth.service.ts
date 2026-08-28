import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/domain.models';
import { ApiService } from './api.service';
interface AuthUser extends User {
    password?: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly router = inject(Router);
    private readonly api = inject(ApiService);
    private readonly key = 'commerce_user';
    readonly user = signal<User | null>(this.restore());
    login(email: string, password: string): Observable<boolean> {
        return this.api.list<AuthUser>('users', { email }).pipe(map((users) => {
            const matched = users.find((item) => item.password === password);
            if (!matched) {
                return false;
            }
            const safeUser: User = {
                id: matched.id,
                name: matched.name,
                email: matched.email,
                role: matched.role,
                avatarUrl: matched.avatarUrl,
            };
            localStorage.setItem(this.key, JSON.stringify(safeUser));
            this.user.set(safeUser);
            return true;
        }));
    }
    logout(): void {
        localStorage.removeItem(this.key);
        this.user.set(null);
        void this.router.navigateByUrl('/auth/login');
    }
    isAuthenticated(): boolean {
        return this.user() !== null;
    }
    private restore(): User | null {
        const raw = localStorage.getItem(this.key);
        return raw ? (JSON.parse(raw) as User) : null;
    }
}

