import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';

import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collectionData, collection, addDoc, onSnapshot, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game: Game = new Game();
  gameId!: string;

  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      onSnapshot(this.getSingleGameRef(), (actualGame) => {
        let game: any = actualGame.data();
        this.game.currentPlayer = game['currentPlayer'];
        this.game.playedCards = game['playedCards'];
        this.game.players = game['players'];
        this.game.stack = game['stack'];
        this.game.pickCardAnimation = game['pickCardAnimation'];
        this.game.currentCard = game['currentCard'];
      })
    })
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef() {
    return doc(collection(this.firestore, 'games'), this.gameId);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame(this.gameId, this.game);
      }
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame(this.gameId, this.game);

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame(this.gameId, this.game);
      }, 1000);
    }
  }

  async updateGame(id: string, game: Game) {
    await setDoc(doc(this.getGamesRef(), id), game.toJsn());
  }

}
