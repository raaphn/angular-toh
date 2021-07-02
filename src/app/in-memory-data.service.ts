import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Civic 1972'},
      { id: 12, name: 'Civic 1979'},
      { id: 13, name: 'Civic 1983'},
      { id: 14, name: 'Civic 1987'},
      { id: 15, name: 'Civic 1991'},
      { id: 16, name: 'Civic 1995'},
      { id: 17, name: 'Civic 2000'},
      { id: 18, name: 'Civic 2005'},
      { id: 19, name: 'Civic 2011'},
      { id: 20, name: 'Civic 2015'}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}