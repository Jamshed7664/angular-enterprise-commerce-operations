import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreSettings, ThemeMode } from '../../core/models/domain.models';
import { SettingsService } from '../../core/services/commerce.services';
import { ThemeService } from '../../core/services/theme.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);

  readonly theme = inject(ThemeService);
  readonly settings = signal<StoreSettings | null>(null);
  readonly modes: ThemeMode[] = ['light', 'dark', 'system'];

  ngOnInit(): void {
    this.settingsService
      .get()
      .subscribe((settings) => this.settings.set(settings));
  }

  setTheme(mode: ThemeMode): void {
    this.theme.setMode(mode);

    const currentSettings = this.settings();

    if (currentSettings) {
      this.settings.set({
        ...currentSettings,
        theme: mode,
      });
    }
  }

  save(settings: StoreSettings): void {
    this.settingsService
      .update(settings)
      .subscribe((updated) => this.settings.set(updated));
  }
}
