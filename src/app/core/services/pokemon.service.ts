import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _baseUrl = '/pokemon'

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

  public getSinglePokemon(): Observable<any> {
    return this._apiService.get(`${ this._baseUrl }/ditto`)
  }
}
