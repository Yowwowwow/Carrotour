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
const GECKO = "sprites/gecko.png";
const CHARR = [ROCK,RABBIT,FROG,CAT,DOG,HORSE,CAMEL,ELEPHANT,GIRAFFE,ZEBRA,MONSTER]
const EMJ = {"sprites/carrot.png":"🥕","sprites/monster.png":"👾","sprites/rock.png":"🪨","sprites/rabbit.png":"🐰","sprites/frog.png":"🐸","sprites/cat.png":"🐱","sprites/dog.png":"🐶","sprites/horse.png":"🐴","sprites/camel.png":"🐫","sprites/elephant.png":"🐘","sprites/giraffe.png":"🦒","sprites/zebra.png":"🦓"}
const EN_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const isInfinite = "Infinite" === window.location.href.split('?')[1];
const honestToggle = document.getElementById("honestToggle");
sq = [[],[],[],[],[],[],[],[],[],[]];
pc = [[],[],[],[],[],[],[],[],[],[]];
bd = [[],[],[],[],[],[],[],[],[],[]];
clicked = [[],[],[],[],[],[],[],[],[],[]];
for(let y=0;y<5;y++){
    for(let x=0;x<5;x++){
        const square = document.createElement("div");
        square.className = "square";
        square.dataset.x = x;
        square.dataset.y = 4-y;
        square.addEventListener("mouseenter", () => {square.style.filter="brightness(1.125)";});
        square.addEventListener("mouseleave", () => {square.style.filter="";});

        const bg = document.createElement("img");

        if((x+y)%2===0)bg.src="sprites/ls.png"; else bg.src="sprites/ds.png";

        const piece = document.createElement("img");
        piece.src = BLANK;
        piece.className = "piece";

        square.appendChild(bg);
        square.appendChild(piece);

        square.addEventListener("click", ()=>{squareClicked(x, 4-y);});

        board.appendChild(square);
        sq[x][4-y] = square
        pc[x][4-y] = piece
        clicked[x][4-y] = false;
    }
}
document.addEventListener("click", (e)=>
    {
        for(let i=0;i<5;i++)for(let j=0;j<5;j++)if(sq[i][j].contains(e.target))return;
        console.log("Clicked outside");
    });
for(let i=0;i<5;i++)for(let j=0;j<5;j++)pc[i][j].src = rngAnimal();
function squareClicked(x, y, save=true){
    console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
}
function rngAnimal(n = 0){
    let tmp = Math.floor(Math.random()*9);
    if(tmp<3)return RABBIT;
    if(tmp<6)return CAT;
    if(tmp<7)return FROG;
    if(tmp<8)return HORSE;
    return ELEPHANT;
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