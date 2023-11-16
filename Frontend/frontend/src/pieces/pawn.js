import Piece from './piece.js';
import { isSameDiagonal } from '../helpers'

export default class Pawn extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.initialPositions = {
      1: [54,55,56,57,58,59,60,61,62],
      2: [18,19,20,21,22,23,24,25,26]
    }
    
  }

  isMovePossible(src, dest, isDestEnemyOccupied) {
    //const className = this.constructor.name;
    //console.log('Piece Class Name:', className);
    
    if (this.player === 1) {
      if ((dest === src - 9 && !isDestEnemyOccupied) || (dest === src - 18 && !isDestEnemyOccupied && this.initialPositions[1].indexOf(src) !== -1)) {
        //return { className, isPossible: true };
        return true;
      }
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src - 10 || dest === src - 8)) {
        //return { className, isPossible: true };
        return true;
      }
    }
    else if (this.player === 2) {
      if ((dest === src + 9 && !isDestEnemyOccupied) || (dest === src + 18 && !isDestEnemyOccupied && this.initialPositions[2].indexOf(src) !== -1)) {
        //return { className, isPossible: true };
        return true;
      }
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src + 10 || dest === src + 8)) {
        //return { className, isPossible: true };
        return true;
      }
    }
    //return  { className, isPossible: false };
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array  
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    }
    else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}