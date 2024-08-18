import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Array<{ title: string, description: string }> = [];

  ngOnInit(): void {
    this.services = [
      { title: 'Impressão 3D', description: 'Serviço de impressão 3D de alta qualidade.' },
      { title: 'Desenvolvimento de projetos', description: 'Desenvolvimento de projetos personalizados.' },
      { title: 'Modelagem', description: 'Criação de modelos 3D personalizados.' },
      { title: 'Prototipagem', description: 'Desenvolvimento de protótipos funcionais.' },
      { title: 'Action figures', description: 'Criação de action figures personalizadas.' },
      { title: 'Manutenção em impressoras 3D', description: 'Serviço de manutenção em impressoras 3D.' }
    ];
  }
}
