import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../shared/constants/api-endpoint';
import { Observable } from 'rxjs';
import { Pokemon } from './pokedex.types';

interface GetPokemonsResponse {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

type GetPokemonsByNameResponse = Pokemon;

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private _nextPageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<GetPokemonsResponse> {
    return this.http.get<GetPokemonsResponse>(
      `${API_ENDPOINT.POKEDEX}/pokemon`
    );
  }

  setNextPageUrl(nextPageUrl: string) {
    this._nextPageUrl = nextPageUrl;
  }

  getNextPage(): Observable<GetPokemonsResponse> {
    return this.http.get<GetPokemonsResponse>(this._nextPageUrl as any);
  }

  getPokemonByName(name: string): Observable<GetPokemonsByNameResponse> {
    return this.http.get<GetPokemonsByNameResponse>(
      `${API_ENDPOINT.POKEDEX}/pokemon/${name}`
    );
  }
}
