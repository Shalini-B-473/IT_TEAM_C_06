import Bishop from '../pieces/bishop.js';
import King from '../pieces/king.js';
import Knight from '../pieces/knight.js';
import Pawn from '../pieces/pawn.js';
import Queen from '../pieces/queen.js';
import Rook from '../pieces/rook.js';

export default function initialiseChessBoard() {
  const squares = Array(81).fill(null);

  for (let i = 18; i < 27; i++) {
    squares[i] = new Pawn(2);
    squares[i + 36] = new Pawn(1);
  }
  squares[0] = new Rook(2);
  squares[8] = new Rook(2);
  squares[80] = new Rook(1);
  squares[72] = new Rook(1);

  squares[1] = new Knight(2);
  squares[7] = new Knight(2);
  squares[79] = new Knight(1);
  squares[73] = new Knight(1);

  squares[2] = new Bishop(2);
  squares[6] = new Bishop(2);
  squares[74] = new Bishop(1);
  squares[78] = new Bishop(1);

  squares[10] = new Rook(2);
  squares[70] = new Rook(1);
   
  squares[16] = new Bishop(2);
  squares[64] = new Bishop(1);

  squares[3] = new Queen(2);
  squares[5] = new Queen(2);
  squares[77] = new Queen(1);
  squares[75] = new Queen(1);

  squares[4] = new King(2);
  squares[76] = new King(1);

  // const rookClassName = squares[0].constructor.name; // Gets the class name of the Rook at square 0
  // const pawnClassName = squares[18].constructor.name; 
  // // // console.log("Rook : "+ {rookClassName} + "Pawn : " + {pawnClassName})
  // console.log(Rook: ${rookClassName});
  // console.log(Pawn: ${pawnClassName});

  return squares;
}