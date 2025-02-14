import { Routes } from '@angular/router';
import { PokedexRoutes } from './pokedex/pokedex.routes';

export const routes: Routes = [
  { path: '', redirectTo: () => 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', children: PokedexRoutes },
];
