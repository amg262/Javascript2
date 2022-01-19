let board = [];
let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;

function newGame() {
  createBoard();
  $('#winner').html('');
}

function createBoard(board) {
  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  let html = '<table>';

  for (let col in board) {
    html += '<td><button class="drop"'
  }

  for (let row = 0; row < board.length; row++) {
    html += '<tr>';
    for (let col = 0; col < board[row].length; col++) {
      html += '<td> </td>';

    }
    html += '</tr>';

  }
  html += '</table>';

  $('#board').html(html);
}

function drop() {

}

function putPiece() {

}

function check4win() {

}

function switchPlayer() {

}

function columnHover() {

}

function endGame() {

}

$(document).ready(function() {
  $('#newGame').on('click', newGame);

});