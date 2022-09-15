import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {


  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public getPokemonEvolutions(evolutionChainUrl: string): Observable<any> {
    return this._httpClient.get(evolutionChainUrl);
  }
}
