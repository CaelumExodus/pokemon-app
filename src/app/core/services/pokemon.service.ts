import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { IPokemonList } from "../interfaces/IPokemonList";
import { IPokemonSpecies } from "../interfaces/IPokemonSpecies";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly _baseUrl = '/pokemon'

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

  public getAllPokemons(offset: number = 0): Observable<IPokemonList> {
    const params = new HttpParams({
      fromObject: {
        limit: 20,
        offset,
      }
    })

    return this._apiService.get('/pokemon', params);
  }

  public getSinglePokemon(pokemonName: string | null): Observable<any> {
    return this._apiService.get(`${ this._baseUrl }/${ pokemonName }`)
  }

  public getPokemonSpecies(name: string | null): Observable<IPokemonSpecies> {
    return this._apiService.get(`${ this._baseUrl }-species/${ name }`)
  }

}
