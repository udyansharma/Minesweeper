var time=0;
var visited=0;
var score=0;
var game_arr=[];
function myTimer(){
    time++;
    // console.log("In my time",time);
    var elem=document.getElementById("time");
    elem.innerHTML=getFormattedTime(time);
}
function getFormattedTime(time){
    var res;
    var minutes=Math.floor(time/60),seconds=time%60;
    if(minutes<10){
        if(seconds<10)
            res="Time: 0"+minutes+":0"+seconds;
        if(seconds>10)
            res="Time: 0"+minutes+":"+seconds;
    }
    if(minutes>10){
        if(seconds<10)
            res="Time: "+minutes+":0"+seconds;
        if(seconds>10)
            res="Time: "+minutes+":"+seconds;
    }
    // console.log(res);
    return res;
}
function newGame(){
    console.log("Buttons are");
    score=0;
    time=0;
    for(var i=1;i<=8;i++){
        game_arr[i]=[];
        for(var j=1;j<=8;j++){
            let myVar = "res"+i+""+j
            game_arr[i][j]="";
            document.getElementById(myVar).innerHTML="";
        }
    }
}
function getBombs(){
    var locations=[];
    for(var i=0;i<9;i++){
        locations[i]=Math.floor(Math.random()*64)+1;
    }
    return locations;
}
function startGame(){
    time=setInterval(myTimer,1000);
    var bomblocations=getBombs();
    for(var i of bomblocations){
        let row,col;
        if(i%8==0){
            col=8;
            row=parseInt(i/8);
        }
        else{
            col=i%8;
            row=parseInt(i/8)+1;
        }
        console.log("row is:"+row+" and col is:"+col);
        game_arr[row][col]="-1";
        let r1=row-1,r2=row+1,c1=col-1,c2=col+1;
        if(r1>=1 && c1>=1){
            console.log('The id in cond 1 is: ');
            if(game_arr[r1][c1]!="-1"){
                let oldval=+(game_arr[r1][c1]);
                let val=+(oldval)+1;
                game_arr[r1][c1]=val;
            console.log("The final value is "+game_arr[r1][c1]);
            }
        }
        if(r1>=1 && c2<=8){
            console.log('The id in cond 2 is: ');
            if(game_arr[r1][c2]!="-1"){
                let oldval=+(game_arr[r1][c2]);
                let val=+(oldval)+1;
                game_arr[r1][c2]=val;
            console.log("The final value is "+game_arr[r1][c2]);
            }

        }
        if(r2<=8 && c1>=1){
            res="res"+r2+""+c1;
            console.log('The id in cond 3 is: ');
            if(game_arr[r2][c1]!="-1"){
                let oldval=+(game_arr[r2][c1]);
                let val=+(oldval)+1;
                game_arr[r2][c1]=val;
            console.log("The final value is "+game_arr[r2][c1]);
            }

        }
        if(r2<=8 && c2<=8){
            console.log('The id in cond 4 is: ');
            if(game_arr[r2][c2]!="-1"){
                let oldval=+(game_arr[r2][c2]);
                let val=+(oldval)+1;
                game_arr[r2][c2]=val;
            console.log("The final value is "+game_arr[r2][c2]);
            }
        }
        if(r1>=1){
            console.log('The id in cond 5 is: ');
            if(game_arr[r1][col]!="-1"){
                let oldval=+(game_arr[r1][col]);
                let val=+(oldval)+1;
                game_arr[r1][col]=val;
            console.log("The final value is "+game_arr[r1][col]);
            }
        }
        if(r2<=8){
            console.log('The id in cond 6 is: ');
            if(game_arr[r2][col]!="-1"){
                let oldval=+(game_arr[r2][col]);
                let val=+(oldval)+1;
                game_arr[r2][col]=val;
            console.log("The final value is "+game_arr[r2][col]);
            }
        }
        if(c1>=1){
            console.log('The id in cond 7 is: ');
            if(game_arr[row][c1]!="-1"){
                let oldval=+(game_arr[row][c1]);
                let val=+(oldval)+1;
                game_arr[row][c1]=val;
            console.log("The final value is "+game_arr[row][c1]);
            }
        }
        if(c2<=8){
            console.log('The id in cond 8 is: ');
            if(game_arr[row][c2]!="-1"){
                let oldval=+(game_arr[row][c1]);
                let val=+(oldval)+1;
                game_arr[row][c2]=val;
            console.log("The final value is "+game_arr[row][c2]);
            }
        }   
    }
}
var _ = (id)=>{
    return document.getElementById(id)
}
function gameOver(t){
    clearInterval(time);
    var res=confirm("Game ended!! Score: "+score+"\t"+" "+getFormattedTime(t)+" Do you want to play again?");
    if(res){
        newGame();
        startGame();
    }
    if(!res){
        window.close();
    }         
}
function setScore(){
    score++;
    document.getElementById("score").innerHTML="Score: "+score;
}
function changeState(e){
    console.log("Here in change state",e);
    console.log("This is the element's value",e.innerHTML);
    var id=e.id;
    var r=id.substring(id.length-2,id.length-1),c=id.substring(id.length-1);
    console.log("The row number is"+r+" and the column is"+c);
    if(game_arr[r][c]=="-1" || visited==10){
        e.innerHTML="<img src='bomb.png' height='30' width='30'>"
        return gameOver(time);
    }
    setScore();
    let col=e.id.substring(e.id.length-1); 
    let c1=col-1,c2=col+1;
    for(let i=1;i<=8;i++){
        if(c1>=1){
            var elem=game_arr[i][c1];
            var mem=_("res"+""+i+""+c1);
            if(elem=="-1"){
                visited++;
                break;
            }
            else{
                mem.innerHTML=game_arr[i][c1];
            }
        }
        if(c2<=8){
            var elem=game_arr[i][c2];
            var mem=_("res"+""+i+""+c2);
            if(elem=="-1"){
                visited++;
                break;
            }
            else{
               mem.innerHTML=game_arr[i][c2];
            }
        }
         elem=game_arr[i][col];
            if(elem=="-1"){
                visited++;
                break;
            }
            else{
                var mem=_("res"+""+i+""+col);
                mem.innerHTML=game_arr[i][col];
            }
    }
    return;
}
