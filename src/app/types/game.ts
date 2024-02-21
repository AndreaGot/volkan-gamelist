export class Game {
  name: string = '';
  owner: string = '';
  notes: string = '';
  bggId: string = '';
  thumbnail: string = '';
  description: string = '';
  genre: string = '';
  author: string = '';
  year: string = '';
  minPlayers: string = '';
  maxPlayers: string = '';
  minPlayingTime: number = -1;
  maxPlayingTime: number = -1;

  constructor(name: string, owner: string, year: string, bggId: string) {
    this.name = name;
    this.owner = owner;
    this.year = year;
    this.bggId = bggId;
  }
}