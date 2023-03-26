import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { Fronteras, PaisSmall } from '../interfaces/pais.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _apiUrl: string = environment.apiUrl;
  private _continentes: string[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get continentes() {
    return [...this._continentes];
  }

  constructor(private httpClient: HttpClient) {}

  getPaisesByContinente(continente: string): Observable<PaisSmall[]> {
    const url = `${this._apiUrl}/region/${continente}?fields=name,cca3`;
    return this.httpClient.get<PaisSmall[]>(url);
  }

  getFronterasByCode(code: string): Observable<Fronteras | null> {
    if (!code || code === '') return of(null);
    const url = `${this._apiUrl}/alpha/${code}?fields=borders`;
    return this.httpClient.get<Fronteras>(url);
  }
}
