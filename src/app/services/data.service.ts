import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../types/game';
import { BggService } from './bgg.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private bggService: BggService) { }


  //REST CALLS

  createGameInternalData(allGamesList: any) {
    const gameArray = [];
    for (let i = 0; i < 10/*allGamesList.items.item.length*/; i++) {
      const item = allGamesList.items.item[i];
      console.log(item);
      const game: Game = new Game(item.name[0]._, 'Volkan', item.yearpublished ? item.yearpublished[0] : 'N/A', item.$.objectid);
      this.bggService.getGameExtraData(game);
      gameArray.push(game); 
    }
    return gameArray;

  }


}
