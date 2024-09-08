import { Component } from '@angular/core';
import { ServicesComponent } from '../../components/services/services.component';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ServicesComponent,
    ProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public customizerSettingsService: CustomizerSettingsService) {}

  ngOnInit(): void {}
}
