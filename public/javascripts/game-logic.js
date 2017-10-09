let isXTurn = true; 
var squareValues = Array(9).fill(null); 


function assignClickHandlers() {
    var squares = document.getElementsByClassName('square');
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', handleSquareClick);
    }
}
    
function calculateWinner() {
    
     const lines = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]; 
      
     for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0]; 
        var b = lines[i][1];
        var c = lines[i][2]; 
        
        
        if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[a] === squareValues[c]) {
          return squareValues[a]; 
        }
     }
     
     return null; 
          
}


function handleSquareClick(e) {
    if (e.target.innerHTML || calculateWinner()) 
        return; 
        
    // alert("clicked on square: " + e.target.dataset.position); 
    squareValues[e.target.dataset.position] = isXTurn ? "X" : "O"; 
    isXTurn = !isXTurn; 
    renderBoardView(); 
}
    
function getGameStatus() {
    var winner = calculateWinner(); 
    
    if (winner) {
        return "Winner: " + winner; 
    } else {
        return  "Next player: " + (isXTurn ? "X" : "O"); 
    }
        
}
    

function destroyBoardView() {
    var rootDiv = document.getElementById("root");
    rootDiv.removeChild(rootDiv.firstChild); 
}

function renderBoardView() {
    destroyBoardView(); 
    
    // All of our generated HTML will be appended to the root div 
    var rootDiv = document.getElementById("root");
    
    // create the game div and append to root
    var gameDiv = document.createElement('div');
    gameDiv.className = 'game';
    rootDiv.appendChild(gameDiv); 
    
    
    // create the game-board and append to game
    var gameBoardDiv = document.createElement('div');
    gameBoardDiv.className = 'game-board';
    gameDiv.appendChild(gameBoardDiv); 
    
    // add game status to the game-board
    var gameStatusDiv = document.createElement('div');
    gameStatusDiv.className = 'status';
    gameStatusDiv.innerHTML = getGameStatus(); 
    gameBoardDiv.appendChild(gameStatusDiv); 
    
    // add 3 rows with 3 buttons each to make the board
    
    for (var i = 0; i < 3; i++) {
        var boardRowDiv = document.createElement('div');
        boardRowDiv.className = 'board-row';
        gameBoardDiv.appendChild(boardRowDiv);
        
        for (var j = 0; j < 3; j++) {
            var squareButton = document.createElement('button');
            squareButton.className = 'square';
            squareButton.dataset.position = i*3 + j; 
            squareButton.innerHTML = squareValues[squareButton.dataset.position]; 
            boardRowDiv.appendChild(squareButton);
        }
        
        gameBoardDiv.appendChild(boardRowDiv); 
    }
    
    assignClickHandlers(); 
    //document.getElementById('item1').dataset.icon = "base.gif";
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // assignClickHandlers(); 
    // showGameStatus(); 
    renderBoardView(); 
});

