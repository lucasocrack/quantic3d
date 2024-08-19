import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // isToggled
  isToggled = false;

  constructor(
    public customizerSettingsService: CustomizerSettingsService,
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

}
