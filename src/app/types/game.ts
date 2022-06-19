export class Game {
  name: string = '';
  owner: string = '';
  notes: string = '';
  bggId: string = '';
  thumbnail: string = '';
  genre: string = '';
  author: string = '';
  year: string = '';
  minPlayers: string = '';
  maxPlayers: string = '';
  playingTime: number = -1;

  constructor(name: string, owner: string, notes: string, bggId: string) {
    this.name = name;
    this.owner = owner;
    this.notes = notes;
    this.bggId = bggId;
  }
}