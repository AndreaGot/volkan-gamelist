import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Game } from '../types/game';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { BggService } from 'src/app/services/bgg.service';
import * as xml2js from 'xml2js';
import { Router } from '@angular/router';
import { PersistenceService } from '../services/persistence.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  loading = false;
  singleGame: any;
  games: Game[] = [];
  content: Game[] = [];
  searchword: '';

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dataService: DataService,
    private bggService: BggService,
    private persistenceService: PersistenceService) { }
  response: any;

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.loading = true;
    this.bggService.getGamesFromBGG().subscribe(result => {
      const p: xml2js.Parser = new xml2js.Parser();
      p.parseString(result, (err, data) => {
        if (err) {
          throw err;
        }
        this.games = this.dataService.createGamesInternalData(data);
        this.persistenceService.setGames(this.games);
        this.loading = false;
      });
    });
  }

  public getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  printGameDuration(min, max) {
    if (min === max) {
      return `${min} minuti`;
    }

    return `${min} - ${max} minuti`;
  }

  printPlayerCount(min, max) {
    if (min === max) {
      return `${min} giocatori`;
    }

    return `${min} - ${max} giocatori`;
  }

  goToGame(game: Game) {
    const routeLink = `/game/${game.bggId}`;
    this.router.navigate([routeLink]);
  }
}
