import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Game } from '../types/game';
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  loading = false;
  games: Game[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGameThumbnail(item: Game) {
    console.log('ci sono');
    console.log(item);
    if (!item.bggId) {
      item.thumbnail = 'https://styles.redditmedia.com/t5_2qhk5/styles/communityIcon_v58lvj23zo551.jpg?format=pjpg&s=1ff68e27037151461267326f90b701705fb5a527';
      console.log('nessuna immagine');
      return;
    }
    this.getThumbnailFromBgg(item.bggId).subscribe({
      next: (res) => {
        const parser = new XMLParser();
        let jObj = parser.parse(res);
        item.thumbnail = jObj.items.item.thumbnail;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getGames() {
    this.loading = true;
    this.getOtherGamesfromGoogle().subscribe({
      next: (res) => {
        this.loading = false;
        let position = -1;
        for (let i = 0; i < res.length; i++) {
          if (res[i][0]) {
            position = this.games.push(new Game(res[i][0], res[i][1], res[i][2], res[i][3]))
            let lastItem = this.games[position - 1];
            this.getGameThumbnail(lastItem);
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getThumbnailFromBgg(id): Observable<any> {
    return this.http.get('https://boardgamegeek.com/xmlapi2/thing?id=' + id, { responseType: 'text' });
  }

  getOtherGamesfromGoogle(): Observable<any> {
    return this.http.get('https://volkan-gamelist.herokuapp.com/games/5/100');
  }

}
