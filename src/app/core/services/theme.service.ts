import { Injectable, signal } from '@angular/core';
import { ThemeMode } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly key = 'commerce_theme';

    readonly mode = signal<ThemeMode>(
        (localStorage.getItem(this.key) as ThemeMode | null) ?? 'dark'
    );

    constructor() {
        this.apply();
    }

    setMode(mode: ThemeMode): void {
        this.mode.set(mode);
        localStorage.setItem(this.key, mode);
        this.apply();
    }

    toggle(): void {
        this.setMode(this.resolvedMode() === 'dark' ? 'light' : 'dark');
    }

    resolvedMode(): 'light' | 'dark' {
        const mode = this.mode();

        if (mode === 'system') {
            return matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }

        return mode;
    }

    private apply(): void {
        document.documentElement.classList.toggle(
            'dark',
            this.resolvedMode() === 'dark'
        );
    }
}