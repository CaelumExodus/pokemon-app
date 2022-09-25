import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IPokemonList } from "../interfaces/IPokemonList";
import { IPokemonSpecies } from "../interfaces/IPokemonSpecies";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly _baseUrl = '/pokemon'

  constructor(
    private readonly _apiService: ApiService,
    private readonly _httpClient: HttpClient
  ) {
  }

  public getPokemonList(limit: number = 20, offset: number = 0): Observable<IPokemonList> {
    const params = new HttpParams({
      fromObject: {
        limit,
        offset,
      }
    })

    return this._apiService.get('/pokemon', params);
  }

  public getSinglePokemon(nameOrIndex: string | number): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${nameOrIndex}`);
  }

  public getPokemonSpecies(name: string | null): Observable<IPokemonSpecies> {
    return this._apiService.get(`${ this._baseUrl }-species/${ name }`)
  }

}
