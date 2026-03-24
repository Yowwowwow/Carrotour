const board = document.getElementById("board");
const record = document.getElementById("record");
const guessesText = document.getElementById("guessesText");
const MAXGUESSES = 10;
const animals = ["sprites/rabbit.png","sprites/frog.png","sprites/cat.png","sprites/dog.png","sprites/horse.png","sprites/camel.png","sprites/elephant.png","sprites/giraffe.png","sprites/zebra.png"]
const BLANK = "sprites/blank.png";
const CARROT = "sprites/carrot.png";
const MONSTER = "sprites/monster.png";
const ROCK = "sprites/rock.png";
const RABBIT = "sprites/rabbit.png";
const FROG = "sprites/frog.png";
const CAT = "sprites/cat.png";
const DOG = "sprites/dog.png";
const HORSE = "sprites/horse.png";
const CAMEL = "sprites/camel.png";
const ELEPHANT = "sprites/elephant.png";
const GIRAFFE = "sprites/giraffe.png";
const ZEBRA = "sprites/zebra.png";
const CHARR = [ROCK,RABBIT,FROG,CAT,DOG,HORSE,CAMEL,ELEPHANT,GIRAFFE,ZEBRA,MONSTER]
const EMJ = {"sprites/carrot.png":"🥕","sprites/monster.png":"👾","sprites/rock.png":"🪨","sprites/rabbit.png":"🐰","sprites/frog.png":"🐸","sprites/cat.png":"🐱","sprites/dog.png":"🐶","sprites/horse.png":"🐴","sprites/camel.png":"🐫","sprites/elephant.png":"🐘","sprites/giraffe.png":"🦒","sprites/zebra.png":"🦓"}
const EN_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let isInfinite = "Infinite" === window.location.href.split('?')[1];
if(isInfinite)console.log("Infinite Mode");
sq = [[],[],[],[],[],[],[],[],[],[]];
pc = [[],[],[],[],[],[],[],[],[],[]];
bd = [[],[],[],[],[],[],[],[],[],[]];
clicked = [[],[],[],[],[],[],[],[],[],[]];
const date = new Date();
year = date.getFullYear().toString();
month = (date.getMonth()<9?"0":"")+(date.getMonth()+1).toString();
day = (date.getDate()<10?"0":"")+(date.getDate()).toString();
dateid = year+month+day;
saveid = "ctg"+dateid;
dateTexts = [`${EN_month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`, `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`, `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`];
if(isInfinite)dateTexts = ["Infinite Mode","Infinite Mode","Infinite Mode","Infinite Mode"];
winTexts = ["", "", "", ""];
sd = "CTG"+dateid+dateid;
rng = isaacCSPRNG(sd);
if(isInfinite)rng = isaacCSPRNG();
crt = []
let tmp1st = Math.floor(rng.random()*100);
crt[0] = [Math.floor(tmp1st/10), tmp1st%10]
let tmp2nd = Math.floor(rng.random()*99);
if(tmp2nd>=tmp1st)tmp2nd++;
crt[1] = [Math.floor(tmp2nd/10), tmp2nd%10]
for(let y=0;y<10;y++){
    for(let x=0;x<10;x++){
        const square = document.createElement("div");
        square.className = "square";
        square.dataset.x = x;
        square.dataset.y = 9-y;
        square.addEventListener("mouseenter", () => {if(!clicked[square.dataset.x][square.dataset.y] && carrots<2 && guesses<MAXGUESSES)square.style.filter="brightness(1.125)";});
        square.addEventListener("mouseleave", () => {square.style.filter="";});

        const bg = document.createElement("img");

        if((x+y)%2===0)bg.src="sprites/ls.png"; else bg.src="sprites/ds.png";

        const piece = document.createElement("img");
        piece.src = BLANK;
        piece.className = "piece";

        square.appendChild(bg);
        square.appendChild(piece);

        square.addEventListener("click", ()=>{squareClicked(x, 9-y);});

        board.appendChild(square);
        sq[x][9-y] = square
        pc[x][9-y] = piece
        clicked[x][9-y] = false;
        if((x==crt[0][0]&&(9-y)==crt[0][1])||(x==crt[1][0]&&(9-y)==crt[1][1]))bd[x][9-y]=CARROT;
        else bd[x][9-y]=MONSTER;
    }
}
if(!isInfinite){
    let lastplay = localStorage.getItem("ctglastplay");
    let lastwin = localStorage.getItem("ctglastwin");
    let playstreak = parseInt(localStorage.getItem("ctgplaystreak"));
    let winstreak = parseInt(localStorage.getItem("ctgwinstreak"));
    if(lastplay===null || playstreak!==playstreak || Date.parse(lastplay)!==Date.parse(lastplay) || (date - Date.parse(lastplay))>=172800000)localStorage.setItem("ctgplaystreak", 0);
    if(lastwin===null || winstreak!==winstreak || Date.parse(lastwin)!==Date.parse(lastwin) || (date - Date.parse(lastwin))>=172800000)localStorage.setItem("ctgwinstreak", 0);
}
carrots = 0;
guesses = 0;
emojirec = "";
function updateGuesses(){
    guessesText.innerHTML = `<img src="sprites/carrot.png" style="height: 1.5rem;">${carrots}/2&nbsp;&nbsp;&nbsp;${guessesTexts[language]}${guesses}/${MAXGUESSES}`;
}
todaysResult = "unplayed";
function gameComplete(x, y, win, save=false){
    todaysResult = win ? "won" : "played";
    let title = "Carrotour-Guide";
    let stars = "";
    /*if(win){
        stars += " ⭐";
        if(guesses<=MAXGUESSES-1)stars += "⭐";
        if(guesses<=MAXGUESSES-2)stars += "⭐";
    }*/
    let res = `${win?guesses:"X"}/${MAXGUESSES}${stars}`;
    let gameLink = `https://yowwowwow.github.io/Carrotour/Guide${isInfinite?"?Infinite":""}`;
    winTexts[0] = `${title} ${dateTexts[0]} ${res}\n${emojirec}\n${gameLink}`;
    winTexts[1] = `${title} ${dateTexts[1]} ${res}\n${emojirec}\n${gameLink}`;
    winTexts[2] = `${title} ${dateTexts[2]} ${res}\n${emojirec}\n${gameLink}`;
    winTexts[3] = `${title} ${dateTexts[3]} ${res}\n${emojirec}\n${gameLink}`;
    console.log(winTexts[0]);console.log(winTexts[1]);console.log(winTexts[2]);console.log(winTexts[3]);
    for(let i=0;i<10;i++)for(let j=0;j<10;j++){
        if(!clicked[i][j]){
            if(win){
                setTimeout(() => {
                    pc[i][j].style.opacity=0.25;
                    pc[i][j].src = bd[i][j];
                }, 100*Math.sqrt((i-x)*(i-x)+(j-y)*(j-y)));
            }
            else{
                pc[i][j].style.opacity=0;
                pc[i][j].src = bd[i][j];
                for(let t=1;t<=10;t++)setTimeout(()=>{pc[i][j].style.opacity=0.025*t;}, 133*t);
            }
        }
    }
    setTimeout(() => {
        let wt = document.getElementById("winText");
        wt.innerHTML=winTexts[language];
        wt.style.display = "";
        document.getElementById("copyButton").style.display = "";
        let sme = document.getElementById("statsModal");
        if(!sme.classList.contains("show"))document.getElementById("statsButton").click();
    }, 1500);
    if(save && !isInfinite){
        let resultid = `ctgguesses${win?guesses:"X"}`;
        let resrec = localStorage.getItem(resultid);
        if(resrec===null || parseInt(resrec)!==parseInt(resrec))localStorage.setItem(resultid, 1);
        else localStorage.setItem(resultid, parseInt(resrec)+1);
        let lastplay = localStorage.getItem("ctglastplay");
        let lastwin = localStorage.getItem("ctglastwin");
        let playstreak = parseInt(localStorage.getItem("ctgplaystreak"));
        let winstreak = parseInt(localStorage.getItem("ctgwinstreak"));
        if(lastplay===null || playstreak!==playstreak || Date.parse(lastplay)!==Date.parse(lastplay) || (date - Date.parse(lastplay))>=172800000)localStorage.setItem("ctgplaystreak", 1);
        else localStorage.setItem("ctgplaystreak", 1+playstreak);
        localStorage.setItem("ctglastplay", `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        if(!win)localStorage.setItem("ctgwinstreak", 0);
        else if(lastwin===null || winstreak!==winstreak || Date.parse(lastwin)!==Date.parse(lastwin) || (date - Date.parse(lastwin))>=172800000)localStorage.setItem("ctgwinstreak", 1);
        else localStorage.setItem("ctgwinstreak", 1+winstreak);
        if(win)localStorage.setItem("ctglastwin", `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    }
}
function squareClicked(x, y, save=true){
    console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
    if(carrots>=2 || guesses>=MAXGUESSES || clicked[x][y])return;
    guesses++;
    clicked[x][y] = true;
    pc[x][y].src = bd[x][y];
    emojirec += EMJ[bd[x][y]];
    const effect = document.createElement("img");
    if(bd[x][y]==CARROT){
        carrots++;
        effect.src = "sprites/circle.png";
        effect.style.setProperty("--rot", "0");
    }
    else{
        effect.src = "sprites/dots.png";
        effect.style.setProperty("--rot", `${Math.random()*360}deg`);
    }
    effect.className = "click-effect";
    sq[x][y].appendChild(effect);
    effect.addEventListener("animationend", ()=>{effect.remove();});
    sq[x][y].style.filter="";
    updateGuesses();
    const rec = document.createElement("img");
    rec.src = bd[x][y];
    rec.className = "recimg";
    record.appendChild(rec);
    if(carrots>=2)gameComplete(x, y, true, save);
    else if(guesses>=MAXGUESSES)gameComplete(x, y, false, save);
    if(save && !isInfinite){
        let tmpsf = localStorage.getItem(saveid);
        if(tmpsf===null)localStorage.setItem(saveid, `${x}${y}`);
        else localStorage.setItem(saveid, `${tmpsf}${x}${y}`);
    }
}
function getAnimal(x, y){
    let a = Math.abs(x);
    let b = Math.abs(y);
    if(a>b)[a,b]=[b,a];
    if(a==0 && b==0)return ROCK;
    if(a==0 && b==1)return RABBIT;
    if(a==0 && b==2)return FROG;
    if(a==1 && b==1)return CAT;
    if(a==0 && b==3)return DOG;
    if(a==1 && b==2)return HORSE;
    if(a==1 && b==3)return CAMEL;
    if(a==2 && b==2)return ELEPHANT;
    if(a==1 && b==4)return GIRAFFE;
    if(a==2 && b==3)return ZEBRA;
    return MONSTER;
}
for(let y=0;y<10;y++){
    for(let x=0;x<10;x++){
        if(bd[x][y]==CARROT)continue;
        let tmp = Math.floor(rng.random()*10);
        if(tmp>0){
            let a0 = getAnimal(x-crt[0][0], y-crt[0][1]);
            let a1 = getAnimal(x-crt[1][0], y-crt[1][1]);
            if(a0==MONSTER && a1==MONSTER)continue;
            if(a0==MONSTER)bd[x][y]=a1;
            else if(a1==MONSTER || a1==a0)bd[x][y]=a0;
            else{
                let coin = Math.floor(rng.random()*2);
                bd[x][y] = (coin==0)?a0:a1;
            }
        }
        else{
            bd[x][y] = CHARR[Math.floor(rng.random()*CHARR.length)];
        }
    }
}
savefile = localStorage.getItem(saveid);
if(!isInfinite){
    if(savefile===null)console.log("new day");
    else{
        let tmpsf = "";
        try{
            for(let i=0;i<savefile.length;i+=2){
                let x = parseInt(savefile[i]);
                let y = parseInt(savefile[i+1]);
                squareClicked(x, y, false);
                tmpsf += savefile[i] + savefile[i+1];
            }
        }
        catch(error){
            console.log(error);
            localStorage.setItem(saveid, tmpsf);
        }
    }
}