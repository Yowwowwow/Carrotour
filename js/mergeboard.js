const WBD = 5;
const HBD = 5;
const board = document.getElementById("board");
const record = document.getElementById("record");
const guessesText = document.getElementById("guessesText");
const MAXGUESSES = 10;
const animals = ["sprites/rabbit.png","sprites/frog.png","sprites/cat.png","sprites/dog.png","sprites/horse.png","sprites/camel.png","sprites/elephant.png","sprites/giraffe.png","sprites/zebra.png"]
const BLANK = "sprites/blank.png";
const CARROT = "sprites/carrot.png";
const MONSTER = "sprites/tmonster.png";
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
const FRAME = "sprites/selected.png";
const RCIRCLE = "sprites/redcircle.png";
const EMJ = {"sprites/carrot.png":"🥕","sprites/monster.png":"👾","sprites/rock.png":"🪨","sprites/rabbit.png":"🐰","sprites/frog.png":"🐸","sprites/cat.png":"🐱","sprites/dog.png":"🐶","sprites/horse.png":"🐴","sprites/camel.png":"🐫","sprites/elephant.png":"🐘","sprites/giraffe.png":"🦒","sprites/zebra.png":"🦓"}
const EN_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const isInfinite = "Infinite" === window.location.href.split('?')[1];
const honestToggle = document.getElementById("honestToggle");
let selected = null;
sq = [[],[],[],[],[]];
pc = [[],[],[],[],[]];
hl = [[],[],[],[],[]];
bd = [[],[],[],[],[]];
clicked = [[],[],[],[],[]];
for(let y=0;y<HBD;y++){
    for(let x=0;x<WBD;x++){
        const square = document.createElement("div");
        square.className = "square";
        square.dataset.x = x;
        square.dataset.y = HBD-1-y;
        square.addEventListener("mouseenter", () => {square.style.filter="brightness(1.125)";});
        square.addEventListener("mouseleave", () => {square.style.filter="";});

        const bg = document.createElement("img");

        if((x+y)%2===0)bg.src="sprites/ls.png"; else bg.src="sprites/ds.png";

        const piece = document.createElement("img");
        piece.src = BLANK;
        piece.className = "piece";

        const highlight = document.createElement("img");
        highlight.src = BLANK;
        highlight.className = "piece";

        square.appendChild(bg);
        square.appendChild(piece);
        square.appendChild(highlight);

        square.addEventListener("click", ()=>{squareClicked(x, HBD-1-y);});

        board.appendChild(square);
        sq[x][HBD-1-y] = square
        pc[x][HBD-1-y] = piece
        hl[x][HBD-1-y] = highlight;
        clicked[x][HBD-1-y] = false;

        bd[x][HBD-1-y] = rngAnimal();
    }
}
updateBoard();
document.addEventListener("click",
    (e)=>{
        for(let i=0;i<WBD;i++)for(let j=0;j<HBD;j++)if(sq[i][j].contains(e.target))return;
        outsideClicked();
    });
function updateBoard(){
    for(let i=0;i<WBD;i++)for(let j=0;j<HBD;j++)pc[i][j].src = bd[i][j];
}
function circleSquares(x, y, a, b){
    for(let i=0;i<2;i++){
        if(x+a<WBD){
            if(y+b<HBD)hl[x+a][y+b].src = RCIRCLE;
            if(y-b>=0)hl[x+a][y-b].src = RCIRCLE;
        }
        if(x-a>=0){
            if(y+b<HBD)hl[x-a][y+b].src = RCIRCLE;
            if(y-b>=0)hl[x-a][y-b].src = RCIRCLE;
        }
        if(a==b)break;
        let tmp=a; a=b; b=tmp;
    }
}
function selectSquare(x, y){
    deselectAll();
    selected = [x,y];
    hl[x][y].src = FRAME;
    switch(bd[x][y]){
        case RABBIT: circleSquares(x,y,0,1); break;
        case CAT: circleSquares(x,y,1,1); break;
        case FROG: circleSquares(x,y,0,2); break;
        case HORSE: circleSquares(x,y,1,2); break;
        case ELEPHANT: circleSquares(x,y,2,2); break;
        case DOG: circleSquares(x,y,0,3); break;
        case CAMEL: circleSquares(x,y,1,3); break;
        case ZEBRA: circleSquares(x,y,2,3); break;
        case GECKO: circleSquares(x,y,3,3); break;
        default: break;
    }
}
function deselectAll(){
    selected = null;
    for(let i=0;i<WBD;i++)for(let j=0;j<HBD;j++)hl[i][j].src = BLANK;
}
function outsideClicked(){
    console.log("Clicked outside");
    deselectAll();
}
function movePiece(x, y){
    console.log(`Move (${selected}) to (${x},${y})`)
    deselectAll();
}
function squareClicked(x, y, save=true){
    console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
    if(selected == null){
        selectSquare(x, y);
    }
    else{
        if(x==selected[0] && y==selected[1])deselectAll();
        else{
            if(checkAnimal(x-selected[0], y-selected[1], bd[selected[0]][selected[1]])){
                movePiece(x, y);
            }
            else{
                selectSquare(x, y);
            }
        }
    }
}
function rngAnimal(n = 0){
    let tmp = Math.floor(Math.random()*9);
    if(tmp<3)return RABBIT;
    if(tmp<6)return CAT;
    if(tmp<7)return FROG;
    if(tmp<8)return HORSE;
    return ELEPHANT;
}
function checkAnimal(a, b, T){
    if(a<0)a=-a;
    if(b<0)b=-b;
    if(a>b){let tmp=a; a=b; b=tmp;}
    switch(T){
        case RABBIT: return a==0 && b==1;
        case CAT: return a==1 && b==1;
        case FROG: return a==0 && b==2;
        case HORSE: return a==1 && b==2;
        case ELEPHANT: return a==2 && b==2;
        case DOG: return a==0 && b==3;
        case CAMEL: return a==1 && b==3;
        case ZEBRA: return a==2 && b==3;
        case GECKO: return a==3 && b==3;
        default: return false;
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