import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public customizerSettingsService: CustomizerSettingsService) {}
}
