
document.addEventListener("DOMContentLoaded", function(event) { 

    let isXTurn = true; 
    
    var squares = document.getElementsByClassName('square');

    // get the number of selected elements
    console.log("num squares: " + squares.length);
    
    // iterate over elements and add a click handler
    
    function handleSquareClick(e) {
        
        if (e.target.innerHTML) 
            return; 
            
        alert("clicked on square: " + e.target.dataset.position); 
        e.target.innerHTML = isXTurn ? "X" : "O";
        isXTurn = !isXTurn; 
    }
    
 
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', handleSquareClick);
    }
});