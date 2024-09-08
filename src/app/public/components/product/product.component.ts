import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  // Price
  startValue = 10;
  endValue = 4500;

  // isToggled
  isToggled = false;

  products = [
    {
      name: 'Funkloud',
      image: 'images/product/funkloud.jpg',
      link: '/ecommerce-page/product-details'
    },
    {
      name: 'Peter e Mary',
      image: 'images/product/peter_e_mary.jpg',
      link: '/ecommerce-page/product-details'
    },
    {
      name: 'Luffy Gear Five',
      image: 'images/product/luffy_gear_five.jpg',
      link: '/ecommerce-page/product-details'
    },
    {
      name: 'Gigante esmeralda, o incrível Hulk',
      image: 'images/product/incrivel_hulk.jpg',
      link: '/ecommerce-page/product-details'
    },
    {
      name: 'Tifa Lockhart Final Fantasy VII',
      image: 'images/product/tifa_lockhart.jpg',
      link: '/ecommerce-page/product-details'
    }
  ];

  constructor(
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }
}
