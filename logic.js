var ship1=Math.floor((Math.random()*34)+1);

var ship2=Math.floor((Math.random()*34)+1);
if (ship1=ship2){
	var ship2=Math.floor((Math.random()*34)+1);
}
var ship21, ship22;
if (((ship2+1)%6==0) || ((ship2+1)%5==0)){
	ship21=parseInt(ship2-1);
	ship22=parseInt(ship21-1);
}
else{
	ship21=parseInt(ship2+1);
	ship22=parseInt(ship21+1);
	
}
var ship3=Math.floor((Math.random()*34)+1);
var nr;
var tries=0;
var hits=0;
var yes=new Audio("hit.wav");
var no=new Audio("no.wav");
var fanf=new Audio("fanf.wav");
var clicked=false;


function check(nr){
	if(hits<5){
	document.getElementById(nr).setAttribute("onclick",";");
	document.getElementById(nr).style.cursor="default";
	document.getElementById(nr).style.background = "#c6cad0";
	
	tries++;
	if(nr==ship1||nr==ship2||nr==ship3 ||nr==ship21 ||nr==ship22){
	hits++;
	yes.play();
	document.getElementById("info").innerHTML="Hurray! Additional goal for you: "+hits+" / "+tries+".";
	}
	else{
	no.play();
	document.getElementById("info").innerHTML="Oh no:(! Keep trying: "+hits+" / "+tries+".";
	}
	if(hits==5){
	fanf.play();
	document.getElementById("hmain").innerHTML="";
	document.getElementById("info").innerHTML=
	"<br/><br/>CONGRATULATIONS!! Here is your score: "+hits+" / "+tries+". <br/><br/><span class='reset' onclick='location.reload()'>ONCE AGAIN?</span><br/><br/>";
	setImg();
	}}}

	function setImg(){	
	var el=document.getElementById("table1").innerHTML="<img src='victory.jpg'>";

	}
	