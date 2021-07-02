import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched Civics.')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched Civic id=${id}`)),
      catchError(this.handleError<Hero>(`getCivic id=${id}`))
    )
  }

  //Adds the HTTP header our current webdb api requires to save requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Updates changes made to the URL (heroesUrl), taking the changed data (hero) and required header for webDB (inside httpOptions)
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Civic ID=${hero.id}. Using WebDB Api: Changes made to the WebDB will not be kept after refreshing the page.`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  //Adds a new hero. Almost the same as the above, but uses post() instead of put()
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added Civic w/ id=${newHero.id}. Using WebDB Api: Changes made to the WebDB will not be kept after refreshing the page.`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //Deletes a hero from the WebDB api client, still using the 'httpOptions' header
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Civic id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //Searches for a hero
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`Found Civics matching "${term}"`) :
        this.log(`No Civics matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  
  
  //connecting to the messageservice to relay messages from this component
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  private heroesUrl = 'api/heroes'; //webapi db url

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CivicService: ${message}`);
  }
}

