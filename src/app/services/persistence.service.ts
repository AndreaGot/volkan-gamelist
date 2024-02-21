import { Injectable } from '@angular/core';
import { Game } from '../types/game';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  games: Game[] = [];

  constructor() { }

  getGames() {
    return this.games;
  }

  setGames(games: Game[]) {
    this.games = games;
  }

  getGame(id: string) {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].bggId === id) {
        return this.games[i];
      }
    }
    return null;
  }
}
