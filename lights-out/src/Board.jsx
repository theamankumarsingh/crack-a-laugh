import React, {useState} from "react";
import Cell from "./Cell";
import './Board.css';

function Board(props) {
  const tmoves = 30
  const [board,setBoard] = useState(createBoard())
  const [iswon,sethasWon] = useState(false)
  const [movesleft,decrementmoves] = useState(tmoves)

  function createBoard() {
    let board = [];
    for(let i=0;i<props.nrows;i++){
    let r=[]
    for(let j=0;j<props.ncols;j++){
      r[j]=(Math.random()<props.chanceLightStartsOn); 
      }
      board.push(r)
    }
    return board
  }

  function flipCellsAround(coord) {
    let {ncols, nrows} = props
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x)
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x);
    flipCell(y+1,x);
    decrementmoves (movesleft=>movesleft-1);

    let haswon = board.every(row => row.every(cell => {return cell==false}));
    sethasWon(haswon);
    setBoard(board);
  }

  function renderCells(){
    let tableBoard = [];
    for (let i = 0; i < props.nrows; i++) {
    let r = [];
    for (let j = 0; j < props.ncols; j++) {
        let coord = `${i}-${j}`;
        r.push(
          <Cell
            key = {coord}
            isLit = {board[i][j]}
            flipCellsAroundMe = {() => flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={i}>{r}</tr>);
    }
    return tableBoard; 
  }

  return (
    <div>
	{
	  iswon
		?<div> 
     <b> You Won </b> 
     </div>:
		movesleft>0
    ?<div>
		<h1>Lights Out</h1>
    <br></br>
		<table className = "Board">
			{renderCells()}
	  </table>
		<br></br>
		{movesleft} moves left out of {tmoves} moves
		</div>:
		<div>
		<b> You Lost! </b>
		  </div>		
	}
  </div>
  );
}

export default Board;