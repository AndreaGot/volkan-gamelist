export class Game {
  name: string = '';
  owner: string = '';
  notes: string = '';
  bggId: string = '';
  thumbnail: string = '';
  genre: string = '';

  constructor(name: string, owner: string, notes: string, bggId: string) {
    this.name = name;
    this.owner = owner;
    this.notes = notes;
    this.bggId = bggId;
  }
}