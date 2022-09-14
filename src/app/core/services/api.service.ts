import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly _httpClient: HttpClient
  ) {
  }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._httpClient.get(`${ environment.ApiUrl }${ path }`, { params })
  }
}
