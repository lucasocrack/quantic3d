import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTopService } from './public/services/scroll-top.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScrollTopService]
})
export class AppComponent {
  title = 'default-angular-template';

  constructor(private scrollTopService: ScrollTopService) {}
}
