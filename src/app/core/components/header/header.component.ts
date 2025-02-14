import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  navigations = [
    { name: 'Home', path: '/' },
    { name: 'Pokedex', path: '/pokedex' },
    { name: 'Videogames', path: '/games' },
    { name: 'GCC Pokemon', path: '/gcc' },
    { name: 'TV Pokemon', path: '/tv' },
    { name: 'Play! Pokemon', path: '/play' },
    { name: 'News', path: '/news' },
  ];
}
