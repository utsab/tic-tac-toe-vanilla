
document.addEventListener("DOMContentLoaded", function(event) { 
  
    var squares = document.getElementsByClassName('square');

    // get the number of selected elements
    console.log("num squares: " + squares.length);
    
    // iterate over elements and add a click handler
    
    function handleSquareClick(e) {
        alert("clicked on square!"); 
    }
    
 
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', handleSquareClick);
    }
});