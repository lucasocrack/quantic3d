import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';


interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(public customizerSettingsService: CustomizerSettingsService) {}

  ngOnInit(): void {
    this.services = [
      { title: 'Impressão 3D', description: 'Serviço de impressão 3D de alta qualidade.', icon: 'print' },
      { title: 'Desenvolvimento de projetos', description: 'Desenvolvimento de projetos personalizados.', icon: 'assignment' },
      { title: 'Modelagem', description: 'Criação de modelos 3D personalizados.', icon: '3d_rotation' },
      { title: 'Prototipagem', description: 'Desenvolvimento de protótipos funcionais.', icon: 'build' },
      { title: 'Action figures', description: 'Criação de action figures personalizadas.', icon: 'face' },
      { title: 'Manutenção em impressoras 3D', description: 'Serviço de manutenção em impressoras 3D.', icon: 'settings' }
    ];
  }
}
