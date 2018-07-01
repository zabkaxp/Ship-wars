var base = {
    colNum: 6,
    rowNum: 6,
    fieldNum: 
        function(){
           return this.colNum * this.rowNum
        },
    numOfShips:5,
    shipLength:3,
    winningComb:[],
    missed: new Audio("dropInWater.wav"),
    hit: new Audio("hit.wav"),
    shotShip: new Audio("fanf.wav"),
    cheer: new Audio("cheer.wav")

}

var view ={
    score: document.getElementById("#score"),
    missed: document.getElementById("#missed"),
    scoreNo: 0,
    missedNo: 0,
    tripleShipsShot:0
}


var validationTable = []
    for(i=0; i<base.colNum; i++){
        for(j=0; j<base.rowNum; j++){

           validationTable.push(`${i}${j}`);
        }
    }



function setElements() { 
    var tabl = document.querySelector("#table");
    tabl = tabl.children;
    tabl = [...tabl];
    var k = 0;
        for(i=0; i<base.colNum; i++){
            for(j=0; j<base.rowNum; j++){
               
                tabl[k].setAttribute("id", `field${i}${j}`);
                tabl[k].setAttribute("onclick", `fire(${i}${j})`);   
                k++;
            } 
        };
}



function randCell(){
        var randCol = (Math.floor(Math.random()*base.colNum)).toString();
        var randRow = (Math.floor(Math.random()*base.rowNum)).toString();
        var fld = (randCol + randRow).split("");
        return fld;
        }


 function horizontal(){
           
                var [row, column] = randCell();
                
                var ship = [row+column, row+(parseInt(column)+1), row+(parseInt(column)+2)];
                
                var lastCell = ship[ship.length-1];
                
                var [lastRow, lastColumn] = lastCell.split("");
                
                if(lastColumn >= 6){
                      ship = [row+column, row+(parseInt(column)-1), row+(parseInt(column)-2)];                        
                }
                validateShip(ship);          
                }

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
        
function setShips(){
                  
    for(i=0; i<base.numOfShips;i++){
            
        var direction = Math.ceil(Math.random()*2);
        
        //horizontal position
        if(direction===1){
            horizontal();
            }
        //vertical position
        if(direction===2){
          vertical();
        }
}}



function validateShip(ship){

    for(i=0; i<base.shipLength; i++){
        if((validationTable.indexOf(ship[0])> -1) && (validationTable.indexOf(ship[1])> -1) && (validationTable.indexOf(ship[2])> -1)){
            
            validationTable.splice(validationTable.indexOf(ship[0]), 1);
            validationTable.splice(validationTable.indexOf(ship[1]), 1);
            validationTable.splice(validationTable.indexOf(ship[2]), 1);
            parseInt(ship);
            base.winningComb.push(ship);
            
        }
        
        else{
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


function updateView(){
    
    
    var missedId = document.querySelector("#missed");
    missedId.innerHTML=`${view.missedNo} missed hits`;
    //view.missed.innerHTML=`${view.missedNo} missed hits`;
    
    var score = document.querySelector("#score");
    score.innerHTML=`Score: ${view.tripleShipsShot} triple ships shot!`;
    if(view.tripleShipsShot>=5){
        base.cheer.currentTime = 0;
        base.cheer.play();
        document.querySelector("#table").style.backgroundImage = 'url("victory.jpg")';
        score.innerHTML=`You shot all ${view.tripleShipsShot} ships,`;
        missedId.innerHTML=`only ${view.missedNo} shots were missed!`;
            for(i=0; i<base.colNum; i++){
            for(j=0; j<base.rowNum; j++){
             
            document.querySelector(`#field${i}${j}`).removeAttribute("onclick");
            document.querySelector(`#field${i}${j}`).style.cursor="default";
            document.querySelector(`#field${i}${j}`).classList.add("grayOut");
      
    }}
    }
    
}

function shipSunk(winning){
    base.shotShip.currentTime=0;
    base.shotShip.play();
    
    for(i=0 ; i<base.shipLength; i++){
        console.log(winning[i]);
        var field = document.querySelector(`#field${winning[i]}`);
        field.style.backgroundImage = "url('shipOnFireGray.gif')";
        console.log(field);
            
}
    updateView();
}

function fire(id){
 
    if(id < base.rowNum){
        id = "0" + id;
        var field = document.getElementById(`field${id}`);        
    }
    else {
        var field = document.getElementById(`field${id}`);
    }
  
    for(var i = 0; i < base.winningComb.length; i++){
        var winning = base.winningComb[i];
        for(var j = 0; j < winning.length; j++){
            
        
        
    if(winning[j].indexOf(id)>-1){
        
        field.removeAttribute("onclick");
        field.style.cursor="default"; 
        winning.push("hit");
        field.style.backgroundImage = "url('shipOnFire.gif')";
        base.hit.currentTime=0;
        base.hit.play();
        console.log(winning);
        if (winning.length>=6){
            view.tripleShipsShot++;
            shipSunk(winning);

        }
        
        
        
        return;
        }
         
    }
}
        field.style.backgroundImage = "url('drop.jpg')";
        field.removeAttribute("onclick");
        field.style.cursor="default";
        base.missed.currentTime=0;
        base.missed.play();
        view.missedNo++;
        updateView();
   

}




function init(){
setElements();
setShips();
};

init();