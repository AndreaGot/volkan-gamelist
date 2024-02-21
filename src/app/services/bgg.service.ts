import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Game } from '../types/game';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class BggService {

  constructor(
    private http: HttpClient,
  ) { }

  getGamesFromBGG(): Observable<any> {
    return this.http.get('https://boardgamegeek.com/xmlapi2/collection?username=volkan_tdg_trento&page=1&stats=1', { responseType: 'text' });
  }

  getGameFromBGGById(id): Observable<any> {
    return this.http.get(`https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`, { responseType: 'text' });
  }



  async getSingleGameFromId(id: string) {
    const game: Game = new Game('Scaffolding', 'Volkan', 'N/A', id);
    console.log('inizio');
    const bggItem = await this.getGameWithData(game);
    console.log('fine');
    return bggItem;
  }

  async getGameWithData(item: Game) {
    console.log('inizio2');
    if (!item.bggId) {
      this.getGameThumbnail(item, undefined);
      return item;
    }
    const response = await lastValueFrom(this.getGameFromBGGById(item.bggId))
    const p: xml2js.Parser = new xml2js.Parser();
    p.parseString(response, (err, data) => {
      if (err) {
        throw err;
      }
      this.getGameName(item, data);
      this.getGameThumbnail(item, data);
      this.getGameMaxPlayers(item, data);
      this.getGameMinPlayers(item, data);
      this.getGameYear(item, data);
      this.getMaxPlayingTime(item, data);
      this.getMinPlayingTime(item, data);
      this.getDescription(item, data);
      console.log('inizio2.5');
      console.log(item);
      return item;
    });
    console.log('inizio3');
    return item;
  }

  getGameThumbnail(item: Game, obj: any) {
    console.log(item);
    if (!item.bggId) {
      item.thumbnail = 'https://styles.redditmedia.com/t5_2qhk5/styles/communityIcon_v58lvj23zo551.jpg?format=pjpg&s=1ff68e27037151461267326f90b701705fb5a527';
      console.log('nessuna immagine');
      return;
    }
    item.thumbnail = obj.items.item[0].thumbnail[0];
  }


  getGameName(item: Game, obj: any) {
    item.name = obj.items.item[0].name[0].$.value;
  }

  getGameMinPlayers(item: Game, obj: any) {
    item.minPlayers = obj.items.item[0].minplayers[0].$.value;
  }

  getGameMaxPlayers(item: Game, obj: any) {
    item.maxPlayers = obj.items.item[0].maxplayers[0].$.value;
  }

  getGameAuthor(item: Game, obj: any) {
    item.maxPlayers = obj.items.item[0].maxplayers[0].$.value;
  }

  getGameYear(item: Game, obj: any) {
    item.year = obj.items.item[0].yearpublished[0].$.value;
  }

  getMaxPlayingTime(item: Game, obj: any) {
    item.maxPlayingTime = obj.items.item[0].maxplaytime[0].$.value;
  }

  getMinPlayingTime(item: Game, obj: any) {
    item.minPlayingTime = obj.items.item[0].minplaytime[0].$.value;
  }

  getDescription(item: Game, obj: any) {
    item.description = obj.items.item[0].description[0];
  }
}
