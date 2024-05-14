var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board =[];
var rows = 9;
var columns = 9;
var score = 0;
var turns = 19;

var currTile;
var otherTile;

window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushCandy();
        slide();
        generateNew();
    },100)
}
function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}
function startGame(){
    for( let r=0; r<rows; r++){
        let row=[];
        for(let c=0; c<columns;c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
           tile.src = "./images2/" + randomCandy() + ".png";

           tile.addEventListener("dragstart" , dragStart);
           tile.addEventListener("dragover" , dragOver);
           tile.addEventListener("dragenter" , dragEnter);
           tile.addEventListener("dragleave" , dragLeave);
           tile.addEventListener("drop" , dragDrop);
           tile.addEventListener("dragend" , dragEnd);

           
           document.getElementById("board").append(tile);
           row.push(tile);
    }
        board.push(row);
}
    console.log(board);
}
function dragStart(){
    currTile=this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){

}
function dragDrop(){
    otherTile=this;
}
function dragEnd(){
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    


    let curCoords = currTile.id.split("-");
    let r = parseInt(curCoords[0]);
    let c = parseInt(curCoords[1]);
    let otherCoords= otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let mL = c2 == c-1 && r == r2;
    let mR = c2 == c+1 && r == r2;

    let mU = r2 == r-1 && c == c2;
    let mD = r2 == r+1 && c == c2;

    let isAdj = mL || mR || mU || mD;

    if(isAdj){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        

        let valid = checkValid();
        if(!valid){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;

        }
        
  
 }
 
 
}
function updateTurns(){
    turns --;
    document.getElementById("turns").innerText = turns;
    if(turns == 0) {
        gameOver();
        turns=19;

    }
     
}
function gameOver(){
    alert("Game over! You are out of moves!!"  );
    
   
}
function crushCandy(){
    crushThree();
    
    document.getElementById("score").innerText = score;
}

function crushThree(){
    for(let r=0; r < rows; r++){
        for(let c=0;c< columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images2/blank.png";
                candy2.src = "./images2/blank.png";
                candy3.src = "./images2/blank.png";
          
                score += 30;
               
                
            }

        }
    }


for(let c = 0; c < columns; c++) {
    for(let r = 0; r < rows-2; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
            candy1.src = "./images2/blank.png";
            candy2.src = "./images2/blank.png";
            candy3.src = "./images2/blank.png";
             
            score += 30;
           
            
        }
    }
}


} 




function checkValid(){
    for(let r=0; r < rows; r++){
        for(let c=0;c< columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                updateTurns();  
                return true;
                
            }

        }
    
    }


for(let c = 0; c < columns; c++) {
    for(let r = 0; r < rows-2; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
            
            updateTurns(); 
            
            return true;
        }
    
    }
   
}

return false;

} 



function slide(){
    for ( let c=0; c< columns; c++){
        let ind = rows -1;
        for (let r = columns -1; r>=0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for(let r=ind;r>=0;r--){
            board[r][c].src = "./images2/blank.png";
        }
    
}
}

function generateNew(){
    for(let c=0; c< columns; c++){
        if (board[0][c].src.includes("blank")){
            board[0][c].src="./images2/" + randomCandy() + ".png";
            
        }
    }
}