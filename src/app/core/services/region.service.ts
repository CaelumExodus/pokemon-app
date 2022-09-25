import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { IRegion } from "../interfaces/IRegion";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private _baseUrl = '/region';

  constructor(
    private readonly _apiService: ApiService
  ) { }

  public getRegions(offset: number = 0): Observable<IRegion> {
    const params = new HttpParams({
      fromObject: {
      }
    })

    return this._apiService.get(`${this._baseUrl}`, params);
  }

}
