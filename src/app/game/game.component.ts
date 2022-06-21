import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BggService } from '../services/bgg.service';
import { DataService } from '../services/data.service';
import { Game } from '../types/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  bggGame: string;
  gameId: string = '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private bggService: BggService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.dataService.getGameFromGoogleById(this.gameId).subscribe({
        next: async (res) => {
          this.game = new Game(res[0], res[1], res[2], res[3]);
          await this.bggService.getGameData(this.game);
        }
      });

    });
  }

  public getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
