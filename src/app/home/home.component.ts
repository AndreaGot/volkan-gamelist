import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Game } from '../types/game';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  loading = false;
  games: Game[] = [];
  content: Game[] = [];
  searchword: '';

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) { }
  response: any;

  ngOnInit(): void {
    this.getGames();
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


  async getGameData(item: Game) {
    if (!item.bggId) {
      this.getGameThumbnail(item, undefined);
      return
    }
    this.getItemDataFromBgg(item.bggId).subscribe({
      next: async (res) => {
        const data = JSON.parse(res);
        this.getGameThumbnail(item, data);
        this.getGameMaxPlayers(item, data);
        this.getGameMinPlayers(item, data);
        this.getGameYear(item, data);
        this.getPlayingTime(item, data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getGames() {
    this.loading = true;
    this.getGamesfromGoogle().subscribe({
      next: (res) => {
        this.loading = false;
        let position = -1;
        for (let i = 0; i < res.length; i++) {
          if (res[i][0]) {
            position = this.games.push(new Game(res[i][0], res[i][1], res[i][2], res[i][3]))
            let lastItem = this.games[position - 1];
            this.getGameData(lastItem);
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getItemDataFromBgg(id: string): Observable<any> {
    return this.http.get('https://volkan-gamelist.herokuapp.com/bggGames/' + id, { responseType: 'text' });
  }

  getGamesfromGoogle(): Observable<any> {
    return this.http.get('https://volkan-gamelist.herokuapp.com/games/1/50');
  }

}
