import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BggService } from '../services/bgg.service';
import { DataService } from '../services/data.service';
import { Game } from '../types/game';
import { PersistenceService } from '../services/persistence.service';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: any;
  bggGame: string;
  games: Game[] = [];
  gameId: string = '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private bggService: BggService,
    private persistenceService: PersistenceService,
    private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<any> {
    this.route.params.subscribe(async params => {
      this.gameId = params['id'];
      this.game = await this.getSingleGame(this.gameId);
      console.log(this.game);
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

  async getSingleGame(id: string) {
    return this.bggService.getSingleGameFromId(id);
  }
}
