import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { CustomizerSettingsService } from '../shared/components/customizer-settings/customizer-settings.service';
import { ServicesComponent } from './components/services/services.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent implements OnInit {
  constructor(public customizerSettingsService: CustomizerSettingsService) {}

  ngOnInit(): void {}
}
