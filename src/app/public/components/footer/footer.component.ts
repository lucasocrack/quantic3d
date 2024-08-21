import { Component, ElementRef, Renderer2, OnInit, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { CustomizerSettingsService } from 'src/app/shared/components/customizer-settings/customizer-settings.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'] // Corrected from styleUrl to styleUrls
})
export class FooterComponent implements OnInit {
  isToggled = false;

  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      @Inject(CustomizerSettingsService) public customizerSettingsService: CustomizerSettingsService,
      @Inject(CustomizerSettingsService) public themeService: CustomizerSettingsService
    ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const quickMessage = this.el.nativeElement.querySelector('.quick-message');
      if (quickMessage) {
        this.renderer.setStyle(quickMessage, 'display', 'none'); // Corrected setStyle method
      }
    }, 9000);

    this.themeService.isToggled$.subscribe((isToggled: boolean) => {
      this.isToggled = isToggled;
    });
  }
}