const WBD = 5; //board width
const HBD = 5; //board height
const MVSC = 16; //how many moves it takes to spawn a silver carrot
const WINSCORE = 128;
const SAVEKEY = "ctmcurr"; //the current game
const BESTKEY = "ctmbest"; //highest score and how many moves it took
const WINSKEY = "ctmwins"; //total games won
const FASTKEY = "ctmfast"; //fastest win
const TPTSKEY = "ctmtpts"; //total points ever earned, excluding the current game
const board = document.getElementById("board");
const record = document.getElementById("record");
const guessesText = document.getElementById("guessesText");
const scoreText = document.getElementById("scoreText");
const victoryEffect = document.getElementById("victory-effect");
const restartModal = document.getElementById("restartModal");
const restartTitle = document.getElementById("restartTitle");
const restartAsk = document.getElementById("restartAsk");
const restartYesBtn = document.getElementById("restartYes");
const restartNoBtn = document.getElementById("restartNo");
const statsTitle = document.getElementById("statsTitle");
const statsContent = document.getElementById("statsContent");
const helpTitle = document.getElementById("helpTitle");
const helpContent = document.getElementById("helpContent");
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
const ANIMALS = [RABBIT,CAT,FROG,HORSE,ELEPHANT,DOG,CAMEL,ZEBRA,GECKO];
const FOOD = [CARROT,SCARR,GCARR];
const POSSIBLEOBJ = [RABBIT,CAT,FROG,HORSE,ELEPHANT,DOG,CAMEL,ZEBRA,GECKO,MONSTER,CARROT,SCARR,GCARR];
const CHARR = [ROCK,RABBIT,FROG,CAT,DOG,HORSE,CAMEL,ELEPHANT,GIRAFFE,ZEBRA,MONSTER]
const FRAME = "sprites/selected.png";
const RCIRCLE = "sprites/redcircle.png";
const EMJ = {"sprites/carrot.png":"🥕","sprites/monster.png":"👾","sprites/rock.png":"🪨","sprites/rabbit.png":"🐰","sprites/frog.png":"🐸","sprites/cat.png":"🐱","sprites/dog.png":"🐶","sprites/horse.png":"🐴","sprites/camel.png":"🐫","sprites/elephant.png":"🐘","sprites/giraffe.png":"🦒","sprites/zebra.png":"🦓"}
const EN_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const isInfinite = "Infinite" === window.location.href.split('?')[1];
const honestToggle = document.getElementById("honestToggle");
const ABBR = {
    [RABBIT]:"R", "R":RABBIT,
    [CAT]:"C", "C":CAT,
    [FROG]:"F", "F":FROG,
    [HORSE]:"H", "H":HORSE,
    [ELEPHANT]:"E", "E":ELEPHANT,
    [DOG]:"D", "D":DOG,
    [CAMEL]:"L", "L":CAMEL,
    [ZEBRA]:"Z", "Z":ZEBRA,
    [GECKO]:"G", "G":GECKO,
    [MONSTER]:"M", "M":MONSTER,
    [CARROT]:"A", "A":CARROT,
    [SCARR]:"S", "S":SCARR,
    [GCARR]:"O", "O":GCARR
};
let winning = false;
let gameover = false;
let canselect = true;
let selected = null;
let sq = [[],[],[],[],[]];
let pc = [[],[],[],[],[]];
let hl = [[],[],[],[],[]];
let bd = [[],[],[],[],[]];
let tbd = [[],[],[],[],[]]; //temp board
let tpts = 0; //temp points
let tmvs = 0; //temp moves
let clicked = [[],[],[],[],[]];
let moves = 0;
let points = 0;
let gotsave = false;
//validate savefile
try{
    if(localStorage.getItem(SAVEKEY)!=null){
        const sf = localStorage.getItem(SAVEKEY).split(',');
        if(sf.length!==3)throw new Error("sf.length not 3");
        tpts = parseInt(sf[0]);
        if(!Number.isInteger(tpts))throw new Error("points is NaN");
        tmvs = parseInt(sf[1]);
        if(!Number.isInteger(tmvs))throw new Error("moves is NaN");
        for(let j=0;j<HBD;j++)for(let i=0;i<WBD;i++){
            tbd[i][j] = ABBR[sf[2][j*WBD+i]];
            if(!POSSIBLEOBJ.includes(tbd[i][j]))throw new Error("board record wrong");
        }
        gotsave = true;
        points = tpts; moves = tmvs;
        console.log("parsed savefile");
    }
    else console.log("can't find savefile");
}
catch(e){console.log(`when reading save: ${e}`);}
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

        if(!gotsave)bd[x][HBD-1-y] = rngAnimal();
        else bd[x][HBD-1-y] = tbd[x][HBD-1-y];
    }
}
updateBoard();
if(gotsave){
    if(checkWin())winning = true;
    if(checkGameOver())gameover = true;
}
else{
    saveGame();
}
UpdateUI();
document.addEventListener("click",
    (e)=>{
        for(let i=0;i<WBD;i++)for(let j=0;j<HBD;j++)if(sq[i][j].contains(e.target))return;
        outsideClicked();
    });
function updateBoard(){
    for(let i=0;i<WBD;i++)for(let j=0;j<HBD;j++)pc[i][j].src = bd[i][j];
}
function isHighScoring(){
    let b = localStorage.getItem(BESTKEY)?.split(',') ?? ["-99999999","99999999"];
    if(b.length!=2)b = ["-99999999","99999999"];
    b[0] = parseInt(b[0]); b[1] = parseInt(b[1]);
    if(!Number.isInteger(b[0]) || !Number.isInteger(b[1]) || points>b[0] || (points==b[0]&&moves<=b[1])){
        return true;
    }
    return false;
}
function saveGame(pluswin=false){
    let s = `${points},${moves},`;
    for(let j=0;j<HBD;j++)for(let i=0;i<WBD;i++)s+=ABBR[bd[i][j]];
    localStorage.setItem(SAVEKEY, s);
    if(isHighScoring()){
        localStorage.setItem(BESTKEY, `${points},${moves}`);
    }
    if(pluswin){
        let w = parseInt(localStorage.getItem(WINSKEY));
        localStorage.setItem(WINSKEY, Number.isInteger(w) ? (w+1) : 1);
        let f = parseInt(localStorage.getItem(FASTKEY));
        if(!Number.isInteger(f) || moves<f)localStorage.setItem(FASTKEY, moves);
    }
}
function circleSquares(x, y, a, b){
    let c = 0;
    let d = {};
    for(const i of ANIMALS)d[i]=0;
    for(const i of FOOD)d[i]=0;
    for(let i=0;i<2;i++){
        if(x+a<WBD){
            if(y+b<HBD&&bd[x+a][y+b]!=MONSTER){hl[x+a][y+b].src=RCIRCLE; d[bd[x+a][y+b]]++; c++;}
            if(b!=0&&y-b>=0&&bd[x+a][y-b]!=MONSTER){hl[x+a][y-b].src=RCIRCLE; d[bd[x+a][y-b]]++; c++;}
        }
        if(x-a>=0){
            if(y+b<HBD&&bd[x-a][y+b]!=MONSTER){hl[x-a][y+b].src=RCIRCLE; d[bd[x-a][y+b]]++; c++;}
            if(b!=0&&y-b>=0&&bd[x-a][y-b]!=MONSTER){hl[x-a][y-b].src=RCIRCLE; d[bd[x-a][y-b]]++; c++;}
        }
        if(a==b)break;
        let tmp=a; a=b; b=tmp;
    }
    let first = true;
    let s = "";
    for(const i of ANIMALS)if(d[i]>0){
        if(first)first=false; else s+="<br>";
        s += `${Pic(bd[x][y])}+${Pic(i)}=${Pic(mergeResult(bd[x][y],i))}`;
    }
    guessesText.innerHTML = s;
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
    guessesText.innerHTML="";
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
    let p3 = 0;
    if(moves<32)p3 = moves/320;
    else if(moves<64)p3 = 0.1 + (moves-32)/480;
    else if(moves<128)p3 = 0.166666666667 + (moves-64)/768;
    else if(moves<256)p3 = 0.25 + (moves-128)/256;
    else p3 = 0.9375 - 0.1875*2**(-(moves-256)/16);
    let tmp = Math.random();
    if((x!=2||y!=2) && tmp<p3){
        let l = [DOG, CAMEL, ZEBRA];
        if(x!=2&&y!=2)l.push(GECKO);
        return l[Math.floor(Math.random()*l.length)];
    }
    let p2 = 0.5;
    if(moves<64)p2 = 0.333333333333;
    else if(moves<128)p2 = 0.333333333333 + (moves-64)/384;
    tmp = Math.random();
    if(tmp<p2){
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
    let pluswin = false;
    if(winning==false && checkWin()){
        winning = true;
        pluswin = true;
        victoryEffect.classList.remove("show");
        void victoryEffect.offsetWidth;
        victoryEffect.classList.add("show");
    }
    if(checkGameOver())gameover = true;
    UpdateUI(true);
    saveGame(pluswin);
}
function checkWin(){return points>=WINSCORE;}
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
function Pic(s){
    return `<img src="${s}" style="height: 1.5rem;">`;
}
function MVPic(s){
    return `<img src="sprites/${s}.png" style="height: 7.5rem; margin: 0.25rem;">`;
}
function UpdateUI(scoreOnly=false){
    const scoreTexts = [
        `Score: ${points}&nbsp;&nbsp;&nbsp;Moves: ${moves}`,
        `分數：${points}&nbsp;&nbsp;&nbsp;步數：${moves}`,
        `分数：${points}&nbsp;&nbsp;&nbsp;步数：${moves}`,
        `スコア：${points}&nbsp;&nbsp;&nbsp;手数：${moves}`
    ];
    const highScoreTexts = [
        "&nbsp;&nbsp;&nbsp;High score!",
        "&nbsp;&nbsp;&nbsp;新紀錄！",
        "&nbsp;&nbsp;&nbsp;新纪录！",
        "&nbsp;&nbsp;&nbsp;ハイスコア！"
    ];
    const winningTexts = [
        `YOU WIN! ⭐⭐⭐`,// (Score reached ${WINSCORE})`,
        `勝利！⭐⭐⭐`,//（分數達到${WINSCORE}）`,
        `胜利！⭐⭐⭐`,//（分数达到${WINSCORE}）`,
        `YOU WIN! ⭐⭐⭐`,//（スコア${WINSCORE}到達）`
    ];
    const gameoverTexts = [
        `GAME OVER`,
        `GAME OVER`,
        `GAME OVER`,
        `GAME OVER`
    ];
    let st = scoreTexts[language];
    if(isHighScoring()) st += highScoreTexts[language];
    if(winning)st += `<br>${winningTexts[language]}`;
    if(gameover)st += `<br>${gameoverTexts[language]}`;
    scoreText.innerHTML = st;

    if(scoreOnly)return;

    const restartTexts = ["Restart", "重新開始", "重新开始", "リスタート"];
    const restartAsks = ["Start a new game?", "是否重開一局新遊戲？", "是否重开一局新游戏？", "新しいゲームを始めますか？"];
    const yesTexts = ["Yes", "是", "是", "はい"];
    const noTexts = ["No", "否", "否", "いいえ"];
    restartTitle.innerHTML = restartTexts[language];
    restartAsk.innerHTML = restartAsks[language];
    restartYesBtn.innerHTML = yesTexts[language];
    restartNoBtn.innerHTML = noTexts[language];

    const statsTitles = ["Statistics", "遊玩紀錄", "游玩纪录", "統計情報"];
    let hs = localStorage.getItem(BESTKEY)?.split(',') ?? ["-","-"];
    if(hs.length!=2)hs = ["-","-"];
    for(let i=0;i<2;i++){
        hs[i] = parseInt(hs[i]);
        if(!Number.isInteger(hs[i]))hs[i]="-";
    }
    let fw = parseInt(localStorage.getItem(FASTKEY));
    if(!Number.isInteger(fw))fw = "-";
    let tw = parseInt(localStorage.getItem(WINSKEY));
    if(!Number.isInteger(tw))tw = 0;
    let tso = parseInt(localStorage.getItem(TPTSKEY));
    if(!Number.isInteger(tso))tso = points; else tso += points;
    const statsTexts = [
        `
            High Score: ${hs[0]} (${hs[1]} moves)<br>
            Fastest Win: ${fw} moves<br>
            Total Wins: ${tw}<br>
            Total Score: ${tso}
        `,
        `
            最高分：${hs[0]}（${hs[1]}步）<br>
            最快勝利：${fw}步<br>
            總勝利數：${tw}<br>
            總得分：${tso}
        `,
        `
            最高分：${hs[0]}（${hs[1]}步）<br>
            最快胜利：${fw}步<br>
            总胜利数：${tw}<br>
            总得分：${tso}
        `,
        `
            ハイスコア：${hs[0]}（${hs[1]}手）<br>
            最速勝利：${fw}手<br>
            総勝利数：${tw}<br>
            合計スコア：${tso}
        `
    ];
    statsTitle.innerHTML = statsTitles[language];
    statsContent.innerHTML = statsTexts[language];

    const helpTitles = ["How to Play","遊戲規則","游戏规则","遊び方"];
    const helpContents = [
        `
            Merge animals, eat carrots, get 128 points to win!<br>
            If you merge two identical animals except ${Pic(RABBIT)} and ${Pic(CAT)}, they turn into a ${Pic(CARROT)} if their move doesn't contain the number 3, or a ${Pic(GCARR)} if it does! Each ${Pic(CARROT)} grants 1 point when eaten, and each ${Pic(GCARR)} grants 4.<br>
            Other merges create an animal whose move is the sum of the two animals you use. However, if a number higher than 3 appears in that animal's move, it becomes a ${Pic(MONSTER)} instead! ${Pic(MONSTER)} can't move, and no one can move to it!<br>
            Additionally, a bonus ${Pic(SCARR)} spawns for every 16 moves you make. It grants 2 points when eaten!<br>
            How the animals move:<br>
            ${MVPic("01")} Rabbit: (0,1)<br>
            ${MVPic("11")} Cat: (1,1)<br>
            ${MVPic("02")} Frog: (0,2)<br>
            ${MVPic("12")} Horse: (1,2)<br>
            ${MVPic("22")} Elephant: (2,2)<br>
            ${MVPic("03")} Dog: (0,3)<br>
            ${MVPic("13")} Camel: (1,3)<br>
            ${MVPic("23")} Zebra: (2,3)<br>
            ${MVPic("33")} Gecko: (3,3)
        `,
        `
            結合動物，吃胡蘿蔔，得到128分以勝利！<br>
            若把${Pic(RABBIT)}和${Pic(CAT)}以外的兩隻相同動物結合，只要該動物的走法不含數字3就會合出${Pic(CARROT)}，否則會合出${Pic(GCARR)}！吃到${Pic(CARROT)}可以得1分，而${Pic(GCARR)}則是4分。<br>
            其他結合會合出走法為所使用的兩隻動物走法之和的動物，但若合出的走法含有大於3的數字，則會變成${Pic(MONSTER)}！${Pic(MONSTER)}不能移動，動物也不能移到${Pic(MONSTER)}上！<br>
            此外，每走16步就會生成一根獎勵${Pic(SCARR)}。若吃到就會得2分！<br>
            動物的移動方式：<br>
            ${MVPic("01")} 兔：(0,1)<br>
            ${MVPic("11")} 貓：(1,1)<br>
            ${MVPic("02")} 蛙：(0,2)<br>
            ${MVPic("12")} 馬：(1,2)<br>
            ${MVPic("22")} 象：(2,2)<br>
            ${MVPic("03")} 狗：(0,3)<br>
            ${MVPic("13")} 駱駝：(1,3)<br>
            ${MVPic("23")} 斑馬：(2,3)<br>
            ${MVPic("33")} 守宮：(3,3)
        `,
        `
            结合动物，吃胡萝卜，得到128分以胜利！<br>
            若把${Pic(RABBIT)}和${Pic(CAT)}以外的两只相同动物结合，只要该动物的走法不含数字3就会合出${Pic(CARROT)}，否则会合出${Pic(GCARR)}！吃到${Pic(CARROT)}可以得1分，而${Pic(GCARR)}则是4分。<br>
            其他结合会合出走法为所使用的两只动物走法之和的动物，但若合出的走法含有大于3的数字，则会变成${Pic(MONSTER)}！${Pic(MONSTER)}不能移动，动物也不能移到${Pic(MONSTER)}上！<br>
            此外，每走16步就会生成一根奖励${Pic(SCARR)}。若吃到就会得2分！<br>
            动物的移动方式：<br>
            ${MVPic("01")} 兔：(0,1)<br>
            ${MVPic("11")} 猫：(1,1)<br>
            ${MVPic("02")} 蛙：(0,2)<br>
            ${MVPic("12")} 马：(1,2)<br>
            ${MVPic("22")} 象：(2,2)<br>
            ${MVPic("03")} 狗：(0,3)<br>
            ${MVPic("13")} 骆驼：(1,3)<br>
            ${MVPic("23")} 斑马：(2,3)<br>
            ${MVPic("33")} 守宫：(3,3)
        `,
        `
            動物を合体させて、ニンジンを食べて、128ポイント獲得でWIN！<br>
            ${Pic(RABBIT)}と${Pic(CAT)}以外の同じ動物同士を合体させると、その動物の動きに数字の3が含まれていなければ${Pic(CARROT)}、含まれていれば${Pic(GCARR)}になります！${Pic(CARROT)}を食べると1ポイント、${Pic(GCARR)}を食べると4ポイント獲得できます。<br>
            それ以外の合体では、2匹の動きを足し合わせた動きの動物になります。ただし、その動きに3より大きい数字が含まれる場合は、代わりに${Pic(MONSTER)}になります！${Pic(MONSTER)}は動けず、他の動物もそのマスへ移動できません！<br>
            さらに、16手ごとにボーナスの${Pic(SCARR)}が出現します。食べると2ポイント獲得できます！<br>
            動物の動き方：<br>
            ${MVPic("01")} ウサギ：(0,1)<br>
            ${MVPic("11")} ネコ：(1,1)<br>
            ${MVPic("02")} カエル：(0,2)<br>
            ${MVPic("12")} ウマ：(1,2)<br>
            ${MVPic("22")} ゾウ：(2,2)<br>
            ${MVPic("03")} イヌ：(0,3)<br>
            ${MVPic("13")} ラクダ：(1,3)<br>
            ${MVPic("23")} シマウマ：(2,3)<br>
            ${MVPic("33")} ヤモリ：(3,3)
        `
    ];
    helpTitle.innerHTML = helpTitles[language];
    helpContent.innerHTML = helpContents[language];
}
function restartYes(){
    let totalpoints = parseInt(localStorage.getItem(TPTSKEY));
    if(!Number.isInteger(totalpoints))totalpoints = 0;
    localStorage.setItem(TPTSKEY, totalpoints + points);
    points = 0;
    moves = 0;
    winning = false;
    gameover = false;
    for(i=0;i<WBD;i++)for(j=0;j<HBD;j++)bd[i][j]=rngAnimal();
    updateBoard();
    UpdateUI(true);
    saveGame();
}