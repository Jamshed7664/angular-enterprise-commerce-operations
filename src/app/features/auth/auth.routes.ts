import { Routes } from '@angular/router';
export const AUTH_ROUTES: Routes = [
    { path: 'login', loadComponent: () => import('./login.component').then((m) => m.LoginComponent) },
    { path: 'forgot-password', loadComponent: () => import('./forgot-password.component').then((m) => m.ForgotPasswordComponent) },
    { path: 'reset-password', loadComponent: () => import('./reset-password.component').then((m) => m.ResetPasswordComponent) },
    { path: 'access-denied', loadComponent: () => import('./access-denied.component').then((m) => m.AccessDeniedComponent) },
    { path: 'session-expired', loadComponent: () => import('./session-expired.component').then((m) => m.SessionExpiredComponent) },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
];

