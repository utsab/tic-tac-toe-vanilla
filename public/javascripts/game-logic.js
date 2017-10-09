

class Model {
    constructor(onChangeHandler) {
        this._isXTurn = true; 
        this._allBoardStates = []; 
        this._curBoardState = Array(9).fill(null); 
        this._allBoardStates.push(this._curBoardState); 
        this._onChangeHandler = onChangeHandler; 
    }
    
    toggleTurn() {
        this._isXTurn = !this._isXTurn; 
    }
    
    getIsXTurn() {
        return this._isXTurn; 
    }
    
    setMove(index, val) {
        let newBoardState = this._curBoardState.slice(); 
        this._allBoardStates.push(newBoardState); 
        this._curBoardState = newBoardState; 
        this._curBoardState[index] = val;
        this.toggleTurn(); 
        this._onChangeHandler(); 
    }
    
    getSquareValues() {
        return this._curBoardState; 
    }
}

/*
    * represent History as an ordered list 
    * each ol is clickable.  
    * when clicked, should change the state of the board 
*/
class History {
    constructor(model) {
        this.model = model; 
    }
    
    render() {
        var historyDiv = document.createElement('div');
        historyDiv.className = "game-info"; 
        var listOfStates = document.createElement('ol'); 
        historyDiv.appendChild(listOfStates); 
        
        // for ()
    }
}

class Game {
    
    constructor(model) {
        this.model = model; 
        this.board = new Board(this.model); 
    }
    
    render() {
        
        var gameDiv = document.createElement('div');
        gameDiv.className = 'game';
        gameDiv.appendChild(this.board.render()); 
        return gameDiv; 
    } 
    
}





class Board {

    constructor(model) {
        this.model = model; 
    }
    
    getGameStatus() {
        var winner = calculateWinner(this.model.getSquareValues()); 

        if (winner) {
            return "Winner: " + winner; 
        } else {
            return  "Next player: " + (this.model.getIsXTurn() ? "X" : "O"); 
        }
    }


    


    render() {
        // add game status to the game-board
        var containerDiv = document.createElement('div'); 
        
        var gameStatusDiv = document.createElement('div');
        gameStatusDiv.className = 'status';
        gameStatusDiv.innerHTML = this.getGameStatus(); //TODO: uncomment this
        containerDiv.appendChild(gameStatusDiv); 
        
        // add 3 rows with 3 buttons each to make the board
        
        for (var i = 0; i < 3; i++) {
            var boardRowDiv = document.createElement('div');
            boardRowDiv.className = 'board-row';
            containerDiv.appendChild(boardRowDiv);
            
            for (var j = 0; j < 3; j++) {
                var squareButton = new Square(this.model, j*3 + i); 
                boardRowDiv.appendChild(squareButton.render());
            }
        }
        
        return containerDiv; 
    }
}


class Square {
    constructor(model, position) {
        this.model = model; 
        this.position = position; 
    }
    
    handleSquareClick(e) {
        var squareValues = this.model.getSquareValues(); 

        if (e.target.innerHTML || calculateWinner(squareValues)) 
            return; 
         

        var isXTurn = this.model.getIsXTurn(); 
        
        this.model.setMove([e.target.dataset.position], isXTurn ? "X" : "O"); 
        console.log("in handleSquareSlick: setting position " + e.target.dataset.position + " to " + squareValues[e.target.dataset.position]); 
        console.log(squareValues); 
        
        //isXTurn = !isXTurn; 
        //renderBoardView(); 
    }
    
    assignClickHandler(squareButton) {
        squareButton.addEventListener('click', this.handleSquareClick.bind(this));
    
    }

    
    render() {
        var squareButton = document.createElement('button');
        squareButton.className = 'square';
        squareButton.dataset.position = this.position; 
        squareButton.innerHTML = this.model.getSquareValues()[squareButton.dataset.position]; 
        this.assignClickHandler(squareButton);  
        return squareButton; 
    }
}


document.addEventListener("DOMContentLoaded", function(event) { 
    // assignClickHandlers(); 
    // showGameStatus(); 
    //renderBoardView(); 
    
    var model = new Model(function() {
        detachViewsFromDOM(); 
        attachViewsToDOM(game); 
    })
    
    var game = new Game(model); 
    attachViewsToDOM(game); 
});

function detachViewsFromDOM() {
    var rootDiv = document.getElementById("root");
    
    while (rootDiv.childElementCount > 0) {
        rootDiv.removeChild(rootDiv.firstChild);
    }
     
}

function attachViewsToDOM(game) {
    var rootDiv = document.getElementById("root");
    rootDiv.appendChild(game.render()); 
}


function calculateWinner(squareValues) {
        
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
    