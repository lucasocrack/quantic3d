import { NgClass } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { Component, HostListener, inject } from '@angular/core'
import { SidebarService } from '../sidebar/sidebar.service'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service'
import { AuthenticationService } from '../../../core/services/authentication.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // isSidebarToggled
  isSidebarToggled = false
  // isToggled
  isToggled = false
  // Header Sticky
  isSticky: boolean = false
  private router = inject(Router)
  private authService = inject(AuthenticationService)

  constructor(
    private SidebarService: SidebarService,
    public themeService: CustomizerSettingsService,
  ) {
    this.SidebarService.isSidebarToggled$.subscribe((isSidebarToggled) => {
      this.isSidebarToggled = isSidebarToggled
    })
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled
    })
  }

  // Burger Menu Toggle
  toggle() {
    this.SidebarService.toggle()
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    if (scrollPosition >= 50) {
      this.isSticky = true
    } else {
      this.isSticky = false
    }
  }

  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme()
  }

  logout() {
    this.authService.clearLocalUser()
    this.router.navigate(['/authentication'])
  }
}
