import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Game } from '../types/game';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { BggService } from 'src/app/services/bgg.service';


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
    private sanitizer: DomSanitizer,
    private dataService: DataService,
    private bggService: BggService) { }
  response: any;

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.loading = true;
    this.dataService.getGamesFromGoogle().subscribe({
      next: (res) => {
        this.loading = false;
        let position = -1;
        for (let i = 0; i < res.length; i++) {
          if (res[i][0]) {
            position = this.games.push(new Game(res[i][0], res[i][1], res[i][2], res[i][3]))
            let lastItem = this.games[position - 1];
            this.bggService.getGameData(lastItem);
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
