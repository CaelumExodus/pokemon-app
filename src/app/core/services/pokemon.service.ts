import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { IPokemonList } from "../interfaces/IPokemonList";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _baseUrl = '/pokemon'

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

  public getSinglePokemon(pokemonIndex: number): Observable<any> {
    return this._apiService.get(`${ this._baseUrl }/${pokemonIndex}`)
  }

  public test(): Observable<any> {
    return this._apiService.get(``)
  }
}
