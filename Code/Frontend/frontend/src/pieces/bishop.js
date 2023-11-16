import Piece from './piece.js';
import { isSameDiagonal, isPathClean } from '../helpers'

export default class Bishop extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
  }

  isMovePossible(src, dest, squares) {
    return isPathClean(this.getSrcToDestPath(src, dest), squares) && isSameDiagonal(src, dest)
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */
  getSrcToDestPath(src, dest) {
    let path = [], pathStart, pathEnd, incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    }
    else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 10 === 0) {
      incrementBy = 10;
      pathStart += 10;
    }
    else {
      incrementBy = 8;
      pathStart += 8;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}