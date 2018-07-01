var base = {
    colNum: 6,
    rowNum: 6,
    fieldNum: 
        function(){
           return this.colNum * this.rowNum
        },
    numOfShips: 5,
    shipLength: 3,
    winningComb: [],
    missed: new Audio("dropInWater.wav"),
    hit: new Audio("hit.wav"),
    shotShip: new Audio("fanf.wav"),
    cheer: new Audio("cheer.wav")

}

var view = {
    score: document.querySelector("#score"),
    missed: document.querySelector("#missed"),
    scoreNo: 0,
    missedNo: 0,
    tripleShipsShot: 0
}

//Creates a table with all fields to check if the ship is set on the field only once 
var validationTable = []
    for (i = 0; i < base.colNum; i++){
        for(j = 0; j < base.rowNum; j++){

           validationTable.push(`${i}${j}`);
        }
    }

//Setting attributes to all the div elements
function setElements() { 
    var tabl = document.querySelector("#table");
    tabl = tabl.children;
    tabl = [...tabl];
    var k = 0;
        for(i = 0; i < base.colNum; i++){
            for(j = 0; j < base.rowNum; j++){
               
                tabl[k].setAttribute("id", `field${i}${j}`);
                tabl[k].setAttribute("onclick", `fire(${i}${j})`);   
                k++;
            } 
        };
}

//Returning random cell
function randCell(){
        var randCol = (Math.floor(Math.random()*base.colNum)).toString();
        var randRow = (Math.floor(Math.random()*base.rowNum)).toString();
        var fld = (randCol + randRow).split("");
        return fld;
}

//Setting ship in horizontal position
function horizontal(){
           
        var [row, column] = randCell();

        var ship = [row+column, row+(parseInt(column)+1), row+(parseInt(column)+2)];
        var lastCell = ship[ship.length-1];
        var [lastRow, lastColumn] = lastCell.split("");

        if (lastColumn >= 6){
            
              ship = [row+column, row+(parseInt(column)-1), row+(parseInt(column)-2)];                        
        }
    
        validateShip(ship);          
}

//Setting ship in vertical position
function vertical(){
            
        var [row, column] = randCell();

        var ship = [row+column, (parseInt(row)+1)+column, (parseInt(row)+2)+column];
        var lastCell = ship[ship.length-1];
        var [lastRow, lastColumn] = lastCell.split("");

        if(lastRow >= 6){
            
             ship = [row+column, (parseInt(row)-1)+column, (parseInt(row)-2)+column];    
        }
        validateShip(ship);
}

//Choosing whether ship needs to be set in horizontal or vertical position
function setShips(){
                  
    for(i = 0; i < base.numOfShips; i++){
            
        var direction = Math.ceil(Math.random()*2);
        
        //horizontal position
        if(direction===1){
            horizontal();
        }
        
        //vertical position
        if(direction===2){
            vertical();
        }
    }
}

//Chescking if this ship can be set on choosen fields
function validateShip(ship){

        if((validationTable.indexOf(ship[0])> -1) && (validationTable.indexOf(ship[1])> -1) && (validationTable.indexOf(ship[2])> -1)){
            
            validationTable.splice(validationTable.indexOf(ship[0]), 1);
            validationTable.splice(validationTable.indexOf(ship[1]), 1);
            validationTable.splice(validationTable.indexOf(ship[2]), 1);
            
            //Approved, adding ship to winning combination
            base.winningComb.push(ship);
        }
        
        else {
            //Not approved, checking in which position we should choose to set additional ship
            var lastC = (ship[ship.length-1])[1];
            var penultC= (ship[ship.length-2])[1];
            
            if(lastC===penultC){
                
                horizontal();
            }
            else{
                
                vertical();
            }
        }
    return base.winningComb;
}

//Updating the view
function updateView(field){
    
    if(view.missedNo===1){
        view.missed.innerHTML=`${view.missedNo} missed hit`;
    }
    else {
        view.missed.innerHTML=`${view.missedNo} missed hits`;
    
    }
    //If we shot all the ships
    if(view.tripleShipsShot>=5){
        
        base.cheer.currentTime = 0;
        base.cheer.play();
        
        document.querySelector("#table").style.backgroundImage = 'url("victory.jpg")';
        
        view.score.innerHTML=`You shot all ${view.tripleShipsShot} ships,`;
        if(view.missedNo===1){
            
            view.missed.innerHTML=`only ${view.missedNo} shot was missed!`;
        }
        else{
            view.missed.innerHTML=`only ${view.missedNo} shots were missed!`;
        }
            
        for(i=0; i<base.colNum; i++){
            for(j=0; j<base.rowNum; j++){
             
            removeAttr(document.querySelector(`#field${i}${j}`));
            document.querySelector(`#field${i}${j}`).classList.add("grayOut");    
            
            
            }
        }
    }
}

//updating view on the shot ship
function shipSunk(winning){
   
    base.shotShip.currentTime = 0;
    base.shotShip.play();
    
    if(view.tripleShipsShot===1){
        view.score.innerHTML=`Score: ${view.tripleShipsShot} triple ship shot!`;
    }
    else {
        view.score.innerHTML=`Score: ${view.tripleShipsShot} triple ships shot!`; 
    }
    for (i=0 ; i<base.shipLength; i++){
    
        var field = document.querySelector(`#field${winning[i]}`);
        field.style.backgroundImage = "url('shipOnFireGray.gif')";            
    }
    updateView();
}

//onclick function
function fire(id){
 
    if (id < base.rowNum){
        id = "0" + id;
        var field = document.getElementById(`field${id}`);        
    }
    else {
        var field = document.getElementById(`field${id}`);
    }
  
    for (var i = 0; i < base.winningComb.length; i++){
       var winning = base.winningComb[i];
        
        for(var j = 0; j < winning.length; j++){
                    
    if (winning[j].indexOf(id)>-1){
         
        field.style.backgroundImage = "url('shipOnFire.gif')";
        removeAttr(field);
        winning.push("hit");
        base.hit.currentTime=0;
        base.hit.play();
        

        if (winning.length >= 6){
            
            view.tripleShipsShot++;
            shipSunk(winning);
        }

        return;
        }
    }
}
    //if missed
        field.style.backgroundImage = "url('drop.jpg')";
        removeAttr(field);
        base.missed.currentTime=0;
        base.missed.play();
        view.missedNo++;
        updateView(field);
}

//removing Attr
function removeAttr(x){
    x.removeAttribute("onclick");
    x.style.cursor="default";
}

function init(){
    setElements();
    setShips();
}

init();
