import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../types/game';
import { BggService } from './bgg.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  //REST CALLS

  getGamesFromGoogle(): Observable<any> {
    return this.http.get('https://volkan-gamelist.herokuapp.com/games/3/50');
  }

  getGameFromGoogleById(id): Observable<any> {
    return this.http.get(`https://volkan-gamelist.herokuapp.com/games/${id}`);
  }


}
