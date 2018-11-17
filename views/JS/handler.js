var time = 0;
var visited = 0;
var game_arr = [];
var vis_arr = [];
var adjacent_empty = [];
var flag = 0;/* 
var flag_arr=[]; */
var socket=io();
var timer;
function myTimer() {
    time++;
    var elem = document.getElementById("time");
    elem.innerHTML = getFormattedTime(time);
}
function getFormattedTime(time) {
    var res;
    var minutes = Math.floor(time / 60), seconds = time % 60;
    if (minutes < 10) {
        if (seconds < 10)
            res = "Time: 0" + minutes + ":0" + seconds;
        if (seconds >= 10)
            res = "Time: 0" + minutes + ":" + seconds;
    }
    if (minutes >= 10) {
        if (seconds < 10)
            res = "Time: " + minutes + ":0" + seconds;
        if (seconds >= 10)
            res = "Time: " + minutes + ":" + seconds;
    }
    // console.log(res);
    return res;
}
function newGame() {
    clearInterval(timer);
    time = 0;
    visited = 0;
    document.getElementById("time").innerHTML = "Time: 00:00";
    for (var i = 1; i <= 8; i++) {
        game_arr[i] = [];
        vis_arr[i] = [];
        // flag_arr[i]=[];
        for (var j = 1; j <= 8; j++) {
            let myElem = _("button" + i + "" + j)
            game_arr[i][j] = "";
            vis_arr[i][j] = false;
            // flag_arr[i][j]=false;
            myElem.innerHTML = "";
            myElem.style.backgroundColor = "#444";
        }
    }
}
function getBombs() {
    let locations = [];
    let i = 0;
    while (i != 10) {
        let rand = Math.floor(Math.random() * 64) + 1;
        if (locations.indexOf(rand) == -1) {
            locations[i] = rand;
            i++;
        }
        else {
            continue;
        }
    }
    // console.log("Completed the loop with locations as=",locations);
    return locations;
}
function startGame() {
    var bomblocations = getBombs();
    timer=setInterval(myTimer, 1000);
    for (var i of bomblocations) {
        // console.log("The bomb is at location number",i);
        let row, col;
        if (i % 8 == 0) {
            col = 8;
            row = parseInt(i / 8);
        }
        else {
            col = i % 8;
            row = parseInt(i / 8) + 1;
        }
        // console.log("In start game row is:"+row+" and col is:"+col);
        game_arr[row][col] = "-1";
        let r1 = row - 1, r2 = row + 1, c1 = col - 1, c2 = col + 1;
        if (r1 >= 1 && c1 >= 1) {
            // console.log('The id in cond 1 is: ');
            if (game_arr[r1][c1] != "-1") {
                let oldval = +(game_arr[r1][c1]);
                let val = +(oldval) + 1;
                game_arr[r1][c1] = val;
                // console.log("Just updated value at arr[r1][c1]",r1,c1);
                // console.log("The final value is "+game_arr[r1][c1]);
            }
        }
        if (r1 >= 1 && c2 <= 8) {
            // console.log('The id in cond 2 is: ');
            if (game_arr[r1][c2] != "-1") {
                let oldval = +(game_arr[r1][c2]);
                let val = +(oldval) + 1;
                game_arr[r1][c2] = val;
                // console.log("Just updated value at arr[r1][c2]",r1,c2);
                // console.log("The final value is "+game_arr[r1][c2]);
            }
        }
        if (r2 <= 8 && c1 >= 1) {
            res = "res" + r2 + "" + c1;
            // console.log('The id in cond 3 is: ');
            if (game_arr[r2][c1] != "-1") {
                let oldval = +(game_arr[r2][c1]);
                let val = +(oldval) + 1;
                game_arr[r2][c1] = val;
                // console.log("Just updated value at arr[r2][c1]",r2,c1);
                // console.log("The final value is "+game_arr[r2][c1]);
            }
        }
        if (r2 <= 8 && c2 <= 8) {
            // console.log('The id in cond 4 is: ');
            if (game_arr[r2][c2] != "-1") {
                let oldval = +(game_arr[r2][c2]);
                let val = +(oldval) + 1;
                game_arr[r2][c2] = val;
                // console.log("Just updated value at arr[r2][c2]",r2,c2);
                // console.log("The final value is "+game_arr[r2][c2]);
            }
        }
        if (r1 >= 1) {
            // console.log('The id in cond 5 is: ');
            if (game_arr[r1][col] != "-1") {
                let oldval = +(game_arr[r1][col]);
                let val = +(oldval) + 1;
                game_arr[r1][col] = val;
                // console.log("Just updated value at arr[r1][col]",r1,col);
                // console.log("The final value is "+game_arr[r1][col]);
            }
        }
        if (r2 <= 8) {
            // console.log('The id in cond 6 is: ');
            if (game_arr[r2][col] != "-1") {
                let oldval = +(game_arr[r2][col]);
                let val = +(oldval) + 1;
                game_arr[r2][col] = val;
                // console.log("Just updated value at arr[r2][col]",r2,col);
                // console.log("The final value is "+game_arr[r2][col]);
            }
        }
        if (c1 >= 1) {
            // console.log('The id in cond 7 is: ');
            if (game_arr[row][c1] != "-1") {
                let oldval = +(game_arr[row][c1]);
                let val = +(oldval) + 1;
                game_arr[row][c1] = val;
                // console.log("Just updated value at arr[row][c1]",row,c1);
                // console.log("The final value is "+game_arr[row][c1]);
            }
        }
        if (c2 <= 8) {
            // console.log('The id in cond 8 is: ');
            if (game_arr[row][c2] != "-1") {
                let oldval = +(game_arr[row][c2]);
                let val = +(oldval) + 1;
                game_arr[row][c2] = val;
                // console.log("Just updated value at arr[row][c2]",row,c2);
                // console.log("The final value is "+game_arr[row][c2]);
            }
        }
    }
    console.log(getcurrentStatus());

}
function getcurrentStatus() {
    let str = "[";
    for (let i in game_arr) {
        for (let j in game_arr[i]) {
            if (j == 8) {
                if (game_arr[i][j])
                    str += game_arr[i][j];
                else
                    str += "E";
            }
            else if (game_arr[i][j] == "") {
                str += "E,";
            }
            else
                str += game_arr[i][j] + ",";
        }
        str += "\n";
    }
    return str + "]";
}
var _ = (id) => {
    return document.getElementById(id)
}
function gameOver() {
    var t = time;
    clearInterval(timer);
    var res = confirm("Game ended!!\n " + getFormattedTime(t - 1) + "\n" + " Do you want to play again?");
    if (res) {
        newGame();
        console.log("THE TIME IS:",time);
        startGame();
        console.log("THE TIME:",time);
    }
    if (!res) {
        //window.location.assign("/pages/Home.ejs");
        clearInterval(time);
        window.location = '/'
    }
}
function display_upd(i, j) {
    if (vis_arr[i][j]) {
        return;
    }
    else {
        console.log("Here to display", i, j);
        let btn = _("button" + i + "" + j);
        btn.style.backgroundColor = "#C0C0C0";
        /* if(flag[i][j]){
            flag--;
            flag[i][j]=false;
        } */
        btn.innerHTML = game_arr[i][j];
        vis_arr[i][j] = true;
        visited++;
        if (game_arr[i][j] == "") {
            adjacent_empty.push({ r: i, c: j });
        }
        return;
    }
}
function display(i, j) {
    if (vis_arr[i][j]) {
        return;
    }
    else {
        console.log("Here to display", i, j);
        let btn = _("button" + i + "" + j);
        btn.style.backgroundColor = "#C0C0C0";
        btn.innerHTML = game_arr[i][j];
        vis_arr[i][j] = true;
        visited++;
        return;
    }
}
function handlingRight(evt){
    console.log("Here in handling reight")
    var evt = window.event || evt;
    var e = evt.target || evt.srcElement;
    console.log("e is",e);
    console.log(e.tagName);
    console.log(e.style.backgroundColor);
    if(e.style.backgroundColor=="#COCOCO" || e.style.backgroundColor=="rgb(192, 192, 192)"){
        console.log("1");
        evt.preventDefault();
        return;
    }
    else if(e.tagName=="IMG"){
        console.log("Hi there",e.parentElement.id);
        flag--;
        let par=e.parentElement;
        let r=par.id.substring(par.id.length-2,par.id.length-1),c=par.id.substring(par.id.length-1);
        // flag_arr[r][c]=false;
        e.parentElement.innerHTML = "";
        var elem = document.getElementById("flag");
        elem.innerHTML = flag;
        evt.preventDefault();
        return;
    }
    else if(e.innerHTML==""){
        console.log("3");
        if(flag==10)
            return;
        console.log("Hi 2there",e.id.substring(length));
        let r=e.id.substring(e.id.length-2,e.id.length-1),c=e.id.substring(e.id.length-1);
        // flag_arr[r][c]=true;
        e.innerHTML = "<img src='flag.png' height=40px width=40px>"
        flag++;
        var elem = document.getElementById("flag");
        elem.innerHTML = flag;
        evt.preventDefault();
        return;
    }
}
function changeState(evt) {
    var evt = window.event || evt;
    var e = evt.target || evt.srcElement;
    var id = e.id;
    if (e.style.backgroundColor == "rgb(192, 192, 192)") {
        console.log("Already clicked");
        return;
    }
    console.log("I am in the new method");
    let r = id.substring(id.length - 2, id.length - 1), c = id.substring(id.length - 1);
    if (game_arr[r][c] == "-1") {
        e.innerHTML = "<img src='bomb.png' height=40px width=40px>"
        setTimeout(gameOver, 100);
        return;
    }
    else if (game_arr[r][c] != "-1" && game_arr[r][c] != "") {
        console.log("calling the display method")
        display(r, c);
    }
    if (game_arr[r][c] == "") {
        let i = +r, j = +c;
        console.log("Checking the value of visited", visited);
        console.log("Sending this in checkadjacent", i, j);
        adjacent_empty.push({ r: i, c: j });
        checkAll().then(() => {
        });
    }
    console.log("Visited is", visited)
    if (visited == 54) {
        let res = confirm("Winner Winner CHICKEN DINNER!!\n " + getFormattedTime(time) + "\n" + " Do you want to play again?");
        clearInterval(time);
        if (res) {
            newGame();
            startGame();
        }
        if (!res) {
            //window.location.assign("/pages/Home.ejs");
            window.location = '/'
        }
    }
    return;
}
async function checkAll() {
    console.log("HERE IN CA", adjacent_empty[0].r);
    while (adjacent_empty.length > 0) {
        await checkadjacent8(adjacent_empty[0].r, adjacent_empty[0].c);
        adjacent_empty.shift();
    }
    return;
}
function checkadjacent8(x, y) {
    return new Promise(function (resolve) {
        if ((x >= 1 && x <= 8) && (y >= 1 && y <= 8))
            display(x, y);
        let r = x, c = y;
        if (r - 1 >= 1 && r - 1 <= 8) {
            if (c - 1 >= 1 && c - 1 <= 8) {
                display_upd(r - 1, c - 1);
            }

            display_upd(r - 1, c);

            if (c + 1 >= 1 && c + 1 <= 8) {
                display_upd(r - 1, c + 1);
            }
        }
        if (r + 1 >= 1 && r + 1 <= 8) {
            if (c - 1 >= 1 && c - 1 <= 8) {
                display_upd(r + 1, c - 1);
                display_upd(r, c - 1);
            }

            display_upd(r + 1, c);

            if (c + 1 >= 1 && c + 1 <= 8) {
                display_upd(r + 1, c + 1);
                display_upd(r, c + 1);
            }
        }
        resolve("msg");
    })

}
