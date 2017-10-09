let isXTurn = true; 

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
      
     
     var squares = document.getElementsByClassName('square');
     
     for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0]; 
        var b = lines[i][1];
        var c = lines[i][2]; 
        
        
        if (squares[a].innerHTML && squares[a].innerHTML === squares[b].innerHTML && squares[a].innerHTML === squares[c].innerHTML) {
          return squares[a].innerHTML; 
        }
     }
     
     return null; 
          
}


function handleSquareClick(e) {
    if (e.target.innerHTML || calculateWinner()) 
        return; 
        
    // alert("clicked on square: " + e.target.dataset.position); 
    e.target.innerHTML = isXTurn ? "X" : "O";
    isXTurn = !isXTurn; 
    showGameStatus(); 
}
    
function showGameStatus() {
    var winner = calculateWinner(); 
    var statusView = document.getElementsByClassName('status')[0]; 
    
    if (winner) {
        statusView.innerHTML = "Winner: " + winner; 
    } else {
        statusView.innerHTML = "Next player: " + (isXTurn ? "X" : "O"); 
    }
        
}
    
    

document.addEventListener("DOMContentLoaded", function(event) { 
    assignClickHandlers(); 
    showGameStatus(); 
});

