let board = [];
let player1 = '<span class="player1"></span>';
let player2 = '<span class="player2"></span>';
let currentPlayer = player1;

function createBoard(){
    board = [
        [0,0,0,0,0,0,0],//0
        [0,0,0,0,0,0,0],//1
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],//3
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ];

    let html = '<table>';


    html += '<thead>';
    html += '<tr>';
    // create buttons
    for(let col in board[0]){
        html += '<td><button class="drop" data-col="' + col + '">&darr;</button></td>';
    }
    html += '</tr>';
    html += '</thead>';

    html += '<tbody>';
    // loop for each row
    for(let row = 0; row < board.length; row++){
        html += '<tr>';
        // loop for each column
        for(let col = 0; col < board[row].length; col++) {
            html += '<td><span class="space"></span></td>';
        }
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';

    // output table
    $('#board').html(html);

    // add click event to the buttons
    $('.drop').on('click', drop);
}

function drop(e){
    console.log('drop event', e);
    console.log('drop this', this);

    let col = $(this).attr('data-col');
    // let col = $(this).data('col');

    // put the piece in our array
    // loop through rows starting at the bottom
    for(let row = board.length - 1; row >= 0; row--){
        // check if spot is open
        if(board[row][col] === 0){
            // add to array
            board[row][col] = currentPlayer;

            putPiece(row, col);

            check4win();

            switchPlayer();

            // check if column is filled
            if(row === 0){
                // column is full
                // disable button
                $(this).attr('disabled', 'disabled');
            }

            // STOP!
            break;
        }
    }

}

function putPiece(row, col){
    // put piece in table
    let delay = 50; // ms
    for(let i = 0; i <= row; i++ ){
        $('#board tbody tr:eq(' + i + ') td:eq(' + col + ') .space')
            .html(currentPlayer)
            .find('span')
            .fadeOut(0)
            .delay(delay * i)
            .fadeIn(0)
            .delay(delay)
            .fadeOut(0);
    }

    // make final destination shown
    $('#board tbody tr:eq(' + row + ') td:eq(' + col + ') .space span').fadeIn(0);

}

function check4win(){
    // horizontal win
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < board[0].length - 3; col++){
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
        for(let col = 0; col < board[0].length; col++){
            if(board[row][col] === currentPlayer
                && board[row + 1][col] === currentPlayer
                && board[row + 2][col] === currentPlayer
                && board[row + 3][col] === currentPlayer
            ){
                endGame();
            }
        }
    }

    // downward diagonal win
    for(let row = 0; row < board.length - 3; row++){
        for(let col = 0; col < board[0].length - 3; col++){
            if(board[row][col] === currentPlayer
                && board[row + 1][col + 1] === currentPlayer
                && board[row + 2][col + 2] === currentPlayer
                && board[row + 3][col + 3] === currentPlayer
            ){
                endGame();
            }
        }
    }

    // upward diagonal win
    for(let row = 3; row < board.length; row++){
        for(let col = 0; col < board[0].length - 3; col++){
            if(board[row][col] === currentPlayer
                && board[row - 1][col + 1] === currentPlayer
                && board[row - 2][col + 2] === currentPlayer
                && board[row - 3][col + 3] === currentPlayer
            ){
                endGame();
            }
        }
    }
}

function switchPlayer(){
    // ternary statement
    // result    =     condition           ?  true value : false value
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    $('.drop').toggleClass('player2');

    $('#currentPlayer').html(currentPlayer);
}

function columnHover(){

}

function endGame(){
    // output winner
    $('#winner').html(currentPlayer + ' wins!');

    // disable buttons
    $('.drop').attr('disabled', 'disabled').hide();
}

function newGame(){
    createBoard();

    $('#winner').html('');

}

// when the document has loaded
$(document).ready(function(){
    newGame();

    // target the new game button
    // $('#newGame').on('click', function(){
    //     newGame();
    // });

    $('#newGame').on('click', newGame);
});