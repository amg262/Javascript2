// global variables -- keep to a min and keep unique
let board;
let score;
let player1 = '<span class="player1"></span>';
let player2 = '<span class="player2"></span>';
let currentPlayer = player1;
let sequenceCount = 4;

function createBoard(){
    board = [
        [0,0,0,0,0,0,0], // 0
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0], // 2
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0], // 5
    ];

    // output board onto the page
    let html = '<table>';

    // create row of buttons
    html += '<tr class="btnRow">';
    board[0].forEach(function(col, c){
        html += '<td><button class="dropBtn" data-col="' + c + '">&darr;</button></td>';
    });
    html += '</tr>';

    // loop through rows
    board.forEach(function(row, r){
        html += '<tr class="boardRow">';
        //board[r].forEach(function(col, c){
        row.forEach(function(col, c){
            //html += '<td data-cell="' + r + '-' + c + '"><div class="space"></div></td>';
            html += '<td><div class="space"></div></td>';
        })
        html += '</tr>';
    });

    html += '</table>';
    $('#board').html(html);

    // add click event to drop buttons
    $('.dropBtn').on('click', drop);

}

function drop(){
    // determine which button was pressed
    // "this" refers to the object that called the function
    // console.log('drop this', this, this.id);

    //let col = $(this).attr('data-col');
    let col = $(this).data('col'); // jQuery specific

    // loop through rows starting at the bottom
    for(let row = board.length - 1; row >= 0; row--){
        // check if open
        //if(board[row][col] == 0){ // checks if they are equivalent
        if(board[row][col] === 0){ // checks if they are identical
            // put current player in that spot
            board[row][col] = currentPlayer;

            // update the board/table
            //$('#board td[data-cell="' + row + '-' + col + '"]').html(currentPlayer);
            $('#board .boardRow:eq(' + row + ') td:eq(' + col + ')').html(currentPlayer);

            // check if the column is full
            if(row === 0){
                $(this).attr('disabled', 'disabled');
            }

            check4win();

            changePlayer();

            // STOP!
            break;

        }
    }
}

function check4win(){
    // horizontal win
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col <= board[row].length - 3; col++ ){
            if(board[row][col] === currentPlayer
            && board[row][col + 1] === currentPlayer
            && board[row][col + 2] === currentPlayer
            && board[row][col + 3] === currentPlayer
            ){
                endGame();
            }
        }
    }

    // vertical win
    for(let row = 0; row < board.length - 3; row++){
        for(let col = 0; col <= board[row].length; col++ ){
            if(board[row][col] === currentPlayer
                && board[row + 1][col] === currentPlayer
                && board[row + 2][col] === currentPlayer
                && board[row + 3][col] === currentPlayer
            ){
                endGame();
            }
        }
    }
}

// function reset(){
//
// }

let reset = function(){
    createBoard();

    $('#winner').hide();
}

function endGame(){
    $('#winner').html(currentPlayer + ' wins!').show();

    $('.dropBtn').attr('disabled', 'disabled');
}

function changePlayer(){
    // ternary statement
    // result    =    condition              ? true value : false value
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    $('#currentPLayer').html(currentPlayer);
}

// run when the page has loaded
$(document).ready(function(){
    createBoard();

    //$('#newGame').click(reset);

    $('#newGame').on('click', reset);
})
