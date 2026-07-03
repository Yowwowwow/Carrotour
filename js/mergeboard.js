const WBD = 5; //board width
const HBD = 5; //board height
const MVSC = 32; //how many moves it takes to spawn a silver carrot
const board = document.getElementById("board");
const record = document.getElementById("record");
const guessesText = document.getElementById("guessesText");
const MAXGUESSES = 10;
const animals = ["sprites/rabbit.png","sprites/frog.png","sprites/cat.png","sprites/dog.png","sprites/horse.png","sprites/camel.png","sprites/elephant.png","sprites/giraffe.png","sprites/zebra.png"]
const BLANK = "sprites/blank.png";
const CARROT = "sprites/carrot.png";
const GCARR = "sprites/gcarrot.png";
const SCARR = "sprites/scarrot.png";
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
let canselect = true;
let selected = null;
let sq = [[],[],[],[],[]];
let pc = [[],[],[],[],[]];
let hl = [[],[],[],[],[]];
let bd = [[],[],[],[],[]];
let clicked = [[],[],[],[],[]];
let moves = 0;
let points = 0;
for(let y=0;y<HBD;y++){
    for(let x=0;x<WBD;x++){
        const square = document.createElement("div");
        const bg = document.createElement("img");
        const piece = document.createElement("img");
        square.className = "square";
        square.dataset.x = x;
        square.dataset.y = HBD-1-y;
        square.dataset.s = (x+y)%2==0 ? "sprites/ls.png" : "sprites/ds.png";
        square.dataset.bs = (x+y)%2==0 ? "sprites/bls.png" : "sprites/bds.png";
        square.addEventListener("mouseenter", () => {bg.src=square.dataset.bs;piece.style.filter="brightness(1.125)";});
        square.addEventListener("mouseleave", () => {bg.src=square.dataset.s;piece.style.filter="";});

        if((x+y)%2===0)bg.src="sprites/ls.png"; else bg.src="sprites/ds.png";

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
        sq[x][HBD-1-y] = square;
        pc[x][HBD-1-y] = piece;
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
    let c = 0;
    for(let i=0;i<2;i++){
        if(x+a<WBD){
            if(y+b<HBD&&bd[x+a][y+b]!=MONSTER){hl[x+a][y+b].src = RCIRCLE; c++;}
            if(b!=0&&y-b>=0&&bd[x+a][y-b]!=MONSTER){hl[x+a][y-b].src = RCIRCLE; c++;}
        }
        if(x-a>=0){
            if(y+b<HBD&&bd[x-a][y+b]!=MONSTER){hl[x-a][y+b].src = RCIRCLE; c++;}
            if(b!=0&&y-b>=0&&bd[x-a][y-b]!=MONSTER){hl[x-a][y-b].src = RCIRCLE; c++;}
        }
        if(a==b)break;
        let tmp=a; a=b; b=tmp;
    }
    return c;
}
function selectSquare(x, y){
    deselectAll();
    selected = [x,y];
    hl[x][y].src = FRAME;
    switch(bd[x][y]){
        case RABBIT: return circleSquares(x,y,0,1);
        case CAT: return circleSquares(x,y,1,1);
        case FROG: return circleSquares(x,y,0,2);
        case HORSE: return circleSquares(x,y,1,2);
        case ELEPHANT: return circleSquares(x,y,2,2);
        case DOG: return circleSquares(x,y,0,3);
        case CAMEL: return circleSquares(x,y,1,3);
        case ZEBRA: return circleSquares(x,y,2,3);
        case GECKO: return circleSquares(x,y,3,3);
        default: return 0;
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
    canselect = false;
    console.log(`Move (${selected}) to (${x},${y})`);
    moves++;
    animateMove(selected[0], selected[1], x, y);
    deselectAll();
}
function squareClicked(x, y, save=true){
    //console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
    if(!canselect)return;
    if(selected == null){
        selectSquare(x, y);
    }
    else{
        if(x==selected[0] && y==selected[1])deselectAll();
        else{
            if(bd[x][y]!=MONSTER&&checkAnimal(x-selected[0], y-selected[1], bd[selected[0]][selected[1]])){
                movePiece(x, y);
            }
            else{
                selectSquare(x, y);
            }
        }
    }
}
function rngAnimal(x=0, y=0){
    if(moves>0&&moves%MVSC==0)return SCARR;
    let tmp = Math.random();
    if((x!=2||y!=2) && tmp<Math.min(1, moves/128)*0.125){
        let l = [DOG, CAMEL, ZEBRA];
        if(x!=2&&y!=2)l.push(GECKO);
        return l[Math.floor(Math.random()*l.length)];
    }
    tmp = Math.random();
    if(tmp<0.333333333333){
        return [FROG, HORSE, ELEPHANT][Math.floor(Math.random()*3)];
    }
    return Math.random()<0.5 ? RABBIT : CAT;
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
function isCarrot(s){return s==CARROT||s==SCARR||s==GCARR;}
function mergeResult(a, b){
    if(isCarrot(b))return a;
    if(a==b){
        if(a==FROG || a==HORSE || a==ELEPHANT)return CARROT;
        if(a==DOG || a==CAMEL || a==ZEBRA || a==GECKO)return GCARR;
    }
    for(let i=0;i<2;i++){
        if(a==RABBIT){
            if(b==RABBIT)return FROG;
            if(b==CAT)return HORSE;
            if(b==FROG)return DOG;
            if(b==HORSE)return CAMEL;
            if(b==ELEPHANT)return ZEBRA;
        }
        else if(a==CAT){
            if(b==CAT)return ELEPHANT;
            if(b==FROG)return CAMEL;
            if(b==HORSE)return ZEBRA;
            if(b==ELEPHANT)return GECKO;
        }
        let tmp=a; a=b; b=tmp;
    }
    return MONSTER;
}
function completeMove(a, b, x, y){
    if(bd[x][y]==CARROT)points += 1;
    else if(bd[x][y]==SCARR)points += 2;
    else if(bd[x][y]==GCARR)points += 4;
    bd[x][y] = mergeResult(bd[a][b], bd[x][y]);
    bd[a][b] = rngAnimal(a, b);
    updateBoard();
    canselect = true;
    console.log(`moves: ${moves}   score: ${points}`);
    if(checkGameOver())alert("game over or something bruhhh");
}
function checkGameOver(){
    for(let i=0;i<WBD;i++){
        for(let j=0;j<HBD;j++){
            if(selectSquare(i, j)>0){
                deselectAll();
                return false;
            }
        }
    }
    deselectAll();
    return true;
}
function animateMove(a, b, x, y){
    piece = pc[a][b];
    target = sq[x][y];
    const start = piece.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    const clone = piece.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.position = "fixed";
    clone.style.left = `${start.left}px`;
    clone.style.top = `${start.top}px`;
    clone.style.width = `${start.width}px`;
    clone.style.height = `${start.height}px`;
    clone.style.transition = "all 0.2236s ease";
    clone.style.zIndex = "999";
    piece.src = BLANK;
    requestAnimationFrame(() => {
        clone.style.left = `${end.left}px`;
        clone.style.top = `${end.top}px`;
    });
    clone.addEventListener("transitionend", () => {
        clone.remove();
        const effect = document.createElement("img");
        if(isCarrot(bd[x][y]))effect.src="sprites/circle.png";
        else if(isCarrot(mergeResult(bd[a][b],bd[x][y])))effect.src="sprites/cmerge.png";
        else effect.src="sprites/merge.png";
        effect.style.setProperty("--rot", "0");
        effect.className = "click-effect";
        sq[x][y].appendChild(effect);
        effect.addEventListener("animationend", ()=>{effect.remove();});
        const e2 = document.createElement("img");
        e2.src = moves>0&&moves%MVSC==0 ? "sprites/cdots.png" : "sprites/dots.png";
        e2.style.setProperty("--rot", `${Math.random()*360}deg`);
        e2.className = "click-effect";
        sq[a][b].appendChild(e2);
        e2.addEventListener("animationend", ()=>{e2.remove();});
        completeMove(a, b, x, y);
    }, { once: true });
}