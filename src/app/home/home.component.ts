import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  game = {
    name: 'Azul',
    genre: 'Astratto',
    bggId: 230802,
    thumbnail: '',
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getGameThumbnail(this.game.bggId);
  }

  getGameThumbnail(id) {
    this.getThumbnailFromBgg(id).subscribe({
      next: (res) => {
        console.log(res);
        const parser = new XMLParser();
        let jObj = parser.parse(res);
        console.log(jObj);
        console.log(jObj.items.item.thumbnail);
        this.game.thumbnail = jObj.items.item.thumbnail;
      },
      error: (err) => {
        console.error(err);
      }
    });;
  }

  getThumbnailFromBgg(id): Observable<any> {
    return this.http.get('https://boardgamegeek.com/xmlapi2/thing?id=' + id, { responseType: 'text' });
  }

}
