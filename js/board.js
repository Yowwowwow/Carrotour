const board = document.getElementById("board");
const record = document.getElementById("record");
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
const EMJ = {CARROT:"🥕",MONSTER:"👾",ROCK:"🪨",RABBIT:"🐰",FROG:"🐸",CAT:"🐱",DOG:"🐶",HORSE:"🐴",CAMEL:"🐫",ELEPHANT:"🐘",GIRAFFE:"🦒",ZEBRA:"🦓"}

sq = [[],[],[],[],[],[],[],[],[],[]];
pc = [[],[],[],[],[],[],[],[],[],[]];
bd = [[],[],[],[],[],[],[],[],[],[]];
clicked = [[],[],[],[],[],[],[],[],[],[]];
const date = new Date();
year = date.getFullYear().toString();
month = (date.getMonth()<9?"0":"")+(date.getMonth()+1).toString();
day = (date.getDate()<10?"0":"")+(date.getDate()).toString();
sd = "CTG"+year+month+day+year+month+day;
rng = isaacCSPRNG(sd);
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
        square.addEventListener("mouseenter", () => {if(!clicked[square.dataset.x][square.dataset.y])square.style.filter="brightness(1.125)";});
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
function squareClicked(x, y){
    console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
    if(clicked[x][y])return;
    clicked[x][y] = true;
    pc[x][y].src = bd[x][y];
    sq[x][y].style.filter="";
    const rec = document.createElement("img");
    rec.src = bd[x][y];
    rec.className = "recimg";
    record.appendChild(rec);
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
        let tmp = Math.floor(rng.random()*7);
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