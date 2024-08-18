import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../../private/components/sidebar/sidebar.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  logoSrc: string = '';

  constructor(
    private SidebarService: SidebarService,
    public themeService: CustomizerSettingsService
  ) {}

  ngOnInit(): void {
    this.updateLogo();
    this.themeService.themeChanged$.subscribe(() => {
      this.updateLogo();
    });
  }

  updateLogo(): void {
    this.logoSrc = this.themeService.isDark() ? 'images/Quantic-3DWHITE.png' : 'images/Quantic-3D.png';
  }

  // Header Sticky
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
