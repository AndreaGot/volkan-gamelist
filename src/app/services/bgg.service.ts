import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../types/game';

@Injectable({
  providedIn: 'root'
})
export class BggService {

  constructor(
    private http: HttpClient,
  ) { }

  getItemDataFromBgg(id: string): Observable<any> {
    return this.http.get('https://volkan-gamelist.herokuapp.com/bggGames/' + id, { responseType: 'json' });
  }



  async getGameData(item: Game) {
    if (!item.bggId) {
      this.getGameThumbnail(item, undefined);
      return
    }
    this.getItemDataFromBgg(item.bggId).subscribe({
      next: async (res) => {
        const data = res;
        this.getGameThumbnail(item, data);
        this.getGameMaxPlayers(item, data);
        this.getGameMinPlayers(item, data);
        this.getGameYear(item, data);
        this.getPlayingTime(item, data);
        this.getDescription(item, data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getGameThumbnail(item: Game, obj: any) {
    if (!item.bggId) {
      item.thumbnail = 'https://styles.redditmedia.com/t5_2qhk5/styles/communityIcon_v58lvj23zo551.jpg?format=pjpg&s=1ff68e27037151461267326f90b701705fb5a527';
      console.log('nessuna immagine');
      return;
    }
    item.thumbnail = obj.items.item.thumbnail;
  }

  getGameMinPlayers(item: Game, obj: any) {
    item.minPlayers = obj.items.item.minplayers.$.value
  }

  getGameMaxPlayers(item: Game, obj: any) {
    item.maxPlayers = obj.items.item.maxplayers.$.value
  }

  getGameAuthor(item: Game, obj: any) {
    item.maxPlayers = obj.items.item.maxplayers.$.value
  }

  getGameYear(item: Game, obj: any) {
    item.year = obj.items.item.yearpublished.$.value
  }

  getPlayingTime(item: Game, obj: any) {
    item.playingTime = obj.items.item.playingtime.$.value
  }

  getDescription(item: Game, obj: any) {
    item.description = obj.items.item.description
  }
}
