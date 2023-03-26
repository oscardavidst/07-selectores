import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
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

  constructor() {}
}
