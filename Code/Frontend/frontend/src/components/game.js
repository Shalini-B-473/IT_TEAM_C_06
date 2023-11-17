import React from 'react';
import axios from 'axios';
import '../index.css';
import Board from './board.js';
import King from '../pieces/king'
import FallenSoldierBlock from './fallen-soldiers-block.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
      val:'',
      place:["a9","b9","c9","d9","e9","f9","g9","h9","i9","a8","b8","c8","d8","e8","f8","g8","h8","i8","a7","b7","c7","d7","e7","f7","g7","h7","i7","a6","b6","c6","d6","e6","f6","g6","h6","i6","a5","b5","c5","d5","e5","f5","g5","h5","i5","a4","b4","c4","d4","e4","f4","g4","h4","i4","a3","b3","c3","d3","e3","f3","g3","h3","i3","a2","b2","c2","d2","e2","f2","g2","h2","i2","a1","b1","c1","d1","e1","f1","g1","h1","i1"],
      coins:["R","N","B","Q","K","Q","B","N","R","","R","","","","","","B","","P","P","P","P","P","P","P","P","P","","","","","","","","","","","","","","","","","","","","","","","","","","","","P","P","P","P","P","P","P","P","P","","B","","","","","","R","","R","N","B","Q","K","Q","B","N","R"],
      counter:0,
      sno:1,
      tableData : [],
      prevTime: null,
      currentTime: new Date(),
      currenttimeDifference: null,
      prevtimeDifference: null
    }
  }
  updateTime() {
    const currentTime = new Date();
    const prevTime = this.state.currentTime;
    const currenttimeDifference = prevTime ? Math.abs(currentTime - prevTime) / 1000 : null;
    const prevtimeDifference = this.state.currenttimeDifference
    this.setState({
      prevTime,
      currentTime,
      currenttimeDifference,
      prevtimeDifference
    });
  }


  handleClick(i) {
    const squares = [...this.state.squares];

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
        })
      }
      return
    }
    this.updateTime();

    squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
    }
    else {

      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
      
      //const className = isMovePossible.className;
      //console.log("Piece Class Name : " , className);
      
      let coinsCopy = {...this.state.coins};
      coinsCopy[i] = this.state.coins[parseInt(this.state.sourceSelection)]; //new src
      coinsCopy[parseInt(this.state.sourceSelection)] = ""; //prev src null
      if(squares[i] !== null)
        {
          this.setState({
                val : this.state.coins[parseInt(this.state.sourceSelection)]+this.state.place[parseInt(this.state.sourceSelection)]+"X"+this.state.place[parseInt(i)],
               coins : coinsCopy 
        })
        }
        else{
          this.setState({
                val : this.state.coins[parseInt(this.state.sourceSelection)]+this.state.place[parseInt(this.state.sourceSelection)]+this.state.place[parseInt(i)],
                coins : coinsCopy 
        })
        }
        
      
      if (isMovePossible) {
        //console.log("Squares : " + squares + " " + squares[i].getClass().getSimpleName())
        //const pieceClassName = squares[i].constructor.name;
        //console.log("Selected piece : " + {pieceClassName})
        if (squares[i] !== null) {
          
          if (squares[i].player === 1) {
            whiteFallenSoldiers.push(squares[i]);
          }
          else {
            blackFallenSoldiers.push(squares[i]);
          }
          
        }

        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = null;
        
        
        
        const isCheckMe = this.isCheckForPlayer(squares, this.state.player)

        if (isCheckMe) {
          this.setState(oldState => ({
            status: "Wrong selection. Choose valid source and destination again. Now you have a check!",
            sourceSelection: -1,
          }))
        } else {
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';

          this.setState(oldState => ({
            sourceSelection: -1,
            squares,
            whiteFallenSoldiers: [...oldState.whiteFallenSoldiers, ...whiteFallenSoldiers],
            blackFallenSoldiers: [...oldState.blackFallenSoldiers, ...blackFallenSoldiers],
            player,
            status: '',
            turn
          }));
        }
      }
      else {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.val)
    if (this.state.val !== prevState.val) {
      if (this.state.counter === 0) {
        axios.post("http://localhost:5000/Insert", this.state)
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({
          counter: 1
        });
      } 
      else {
        axios.post("http://localhost:5000/Update", this.state)
          .then(result => {
            console.log(result);
            if (result.data && result.data.data) {
              // Update the state with the updated data received from the server
              const updatedData = Array.isArray(result.data.data)
        ? result.data.data.map(item => ({
            ...item,
            prevtimeDifference: this.state.prevtimeDifference,
            currenttimeDifference: this.state.currenttimeDifference
          }))
        : [
            {
              ...result.data.data,
              prevtimeDifference: this.state.prevtimeDifference,
              currenttimeDifference: this.state.currenttimeDifference
            }
          ];

          this.setState(prevState => ({
            tableData: [
              ...prevState.tableData,
              ...updatedData
            ],
            counter: 0,
            sno: prevState.sno + 1,
          }));
            } else {
              console.error("Received data is not an array:", result.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
       
      }

     

    }
  }

  renderTable() {
    if (!Array.isArray(this.state.tableData)) {
      console.error("tableData is not an array:", this.state.tableData);
      return null; // or handle it accordingly
    }
    return (
      <table className=' table table-light table-bordered table-hover'style={{width : "70%" , textAlign :  "center"}}> 
        <thead>
          <tr>
            <th>Sno</th>
            <th>White</th>
            <th>White Time</th>
            <th>Black</th>
            <th>Black Time</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tableData.map(row => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td>{row.white}</td>
              <td>{row.prevtimeDifference}</td>
              <td>{row.black}</td>
              <td>{row.currenttimeDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  


  getKingPosition(squares, player) {
    return squares.reduce((acc, curr, i) =>
      acc || //King may be only one, if we had found it, returned his position
      ((curr //current squre mustn't be a null
        && (curr.getPlayer() === player)) //we are looking for aspecial king 
        && (curr instanceof King)
        && i), // returned position if all conditions are completed
      null)
  }

  isCheckForPlayer(squares, player) {
    const opponent = player === 1 ? 2 : 1
    const playersKingPosition = this.getKingPosition(squares, player)
    const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
    return squares.reduce((acc, curr, idx) =>
      acc ||
      (curr &&
        (curr.getPlayer() === opponent) &&
        canPieceKillPlayersKing(curr, idx)
        && true),
      false)
  }

  render() {

    return (
      <div>
        <div className="game">
          <h2 style={{textAlign:"left"}}>9x9 Board Game</h2>
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

            </div>
            <div>
            <div >{this.state.val}</div>
            </div>
            <div className="game-status">{this.state.status}</div>
           
            {/* <div>
              <h3>Time Difference:</h3>
              <p>{this.state.currenttimeDifference !== null ? `${this.state.currenttimeDifference} seconds` : 'N/A'}</p>
              <p>{this.state.prevtimeDifference !== null ? `${this.state.prevtimeDifference} seconds` : 'N/A'}</p>
            </div> */}

            <div className="fallen-soldier-block">
              <p className='display-6'>Fallen Soldiers Block</p>
              {<FallenSoldierBlock
                whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                blackFallenSoldiers={this.state.blackFallenSoldiers}
              />
              }
            </div>

          </div>
          <div className='container-fluid'>
            <p className="display-6">Movement Track Sheet</p>
            {this.renderTable()}
          </div>
        </div>

  
      </div>

    );
  }
}