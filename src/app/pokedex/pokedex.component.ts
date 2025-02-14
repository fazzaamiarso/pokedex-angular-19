import { Component, OnInit } from '@angular/core';
import { PokedexService } from './pokedex.service';
import { CommonModule } from '@angular/common';
import { PokedexDetailComponent } from './pokedex-detail/pokedex-detail.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, PokedexDetailComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnInit {
  public loading = false;
  public pokemons: { name: string; url: string }[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.loading = true;
    this.pokedexService
      .getPokemons()
      .subscribe({
        next: (res) => {
          this.pokemons = res.results;
          this.pokedexService.setNextPageUrl(res.next);
        },
        error: (err) => {
          alert(JSON.stringify(err));
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  loadMorePokemons() {
    if (this.loading) return;

    this.loading = true;
    this.pokedexService
      .getNextPage()
      .subscribe({
        next: (res) => {
          this.pokemons = this.pokemons.concat(res.results);
          this.pokedexService.setNextPageUrl(res.next);

          setTimeout(() => {
            window.scrollTo(
              0,
              window.document.body.scrollHeight - window.innerHeight
            );
          }, 500);
        },
        error: (err) => {
          alert(JSON.stringify(err));
        },
      })
      .add(() => {
        this.loading = false;
      });
  }
}
