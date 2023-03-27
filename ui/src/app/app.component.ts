import { NumberSymbol } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ɵnoSideEffects } from '@angular/core';
import { List, Svg, SVG, Element } from '@svgdotjs/svg.js';
import { GameService } from './game.service';

export enum Player {
  x, o
}

export type Square = {
  index: number,
  player?: Player
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private _svgBoard: Svg;
  squares: Square[] = new Array(9);
  private turn: Player = Player.x;
  private gameState: {
    xIndexes: number[],
    oIndexes: number[]
  };

  constructor(private gameSrv: GameService) {

  }

  ngOnInit(): void {
    this._svgBoard = SVG("svg") as Svg;
    for (let i = 0; i < 2; i++) {
      this._svgBoard.rect(2, 600).fill("#000").move(200 * (i + 1), 0);
      this._svgBoard.rect(600, 2).fill("#000").move(0, 200 * (i + 1));
    }
    for (let i = 0; i < 9; i++) {
      this.squares[i] = {
        index: i,
      }
    }
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
    const svgSquares: List<Element> = this._svgBoard.find(".square");
    const svgImages: List<Element> = this._svgBoard.find(".image");
    let imageIndex: number = 0;
    for (let square of this.squares) {
      const rowIndex = Math.floor(square.index / 3);
      const colIndex = square.index % 3;
      svgSquares[square.index].move(colIndex * 200, rowIndex * 200);
      if (this.isSquareOccupied(square)) {
        svgImages[imageIndex++].move(colIndex * 200, rowIndex * 200);
      }
    }
  }

  onClick(square: Square): void {
    if (this.isSquareOccupied(square)) {
      return;
    }
    square.player = this.turn;
    this.updateGameState();
    this.gameSrv.check(this.gameState)
      .subscribe(res => {
        switch (res.status) {
          case 'VICTORY_X': alert("X won the game!"); break;
          case 'VICTORY_O': alert("O won the game!"); break;
          case 'DRAW': alert("draw"); break;
          default: break;
        }
      });
    this.nextTurn();
  }

  private updateGameState(): void {
    this.gameState = {
      xIndexes: [],
      oIndexes: []
    }
    this.squares.forEach(sq => {
      if (!sq.player) {
        return;
      }
      if (sq.player as Player === Player.x) {
        this.gameState.xIndexes.push(sq.index);
      } else {
        this.gameState.oIndexes.push(sq.index);
      }
    })
  }

  nextTurn(): void {
    if (this.turn == Player.x) {
      this.turn = Player.o;
    } else {
      this.turn = Player.x;
    }
  }

  isSquareOccupied(square: Square): boolean {
    return square.player !== undefined;
  }

}
