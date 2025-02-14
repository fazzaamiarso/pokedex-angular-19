import {
  NgOptimizedImage,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokedex.types';
import { PokedexService } from '../pokedex.service';

@Component({
  selector: 'pokedex-detail',
  standalone: true,
  imports: [NgOptimizedImage, UpperCasePipe, TitleCasePipe],
  templateUrl: './pokedex-detail.component.html',
  styleUrl: './pokedex-detail.component.css',
})
export class PokedexDetailComponent implements OnInit {
  @Input() pokemonName: string = '';

  loading = false;
  pokemon: Pokemon | null = null;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.loading = true;
    this.pokedexService
      .getPokemonByName(this.pokemonName)
      .subscribe({
        next: (res) => {
          this.pokemon = res;
        },
      })
      .add(() => {
        this.loading = false;
      });
  }
}
