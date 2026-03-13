const board = document.getElementById("board");
const animals = ["sprites/rabbit.png","sprites/frog.png","sprites/cat.png","sprites/dog.png","sprites/horse.png","sprites/camel.png","sprites/elephant.png","sprites/giraffe.png","sprites/zebra.png"]
sq = [[],[],[],[],[],[],[],[],[],[]]
pc = [[],[],[],[],[],[],[],[],[],[]]
for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {

        const square = document.createElement("div");
        square.className = "square";
        square.dataset.x = x;
        square.dataset.y = y;

        const bg = document.createElement("img");

        if ((x + y) % 2 === 0) {
            bg.src = "sprites/ls.png";
        } else {
            bg.src = "sprites/ds.png";
        }

        const piece = document.createElement("img");
        piece.src = animals[Math.floor(Math.random() * animals.length)];
        piece.className = "piece";

        square.appendChild(bg);
        square.appendChild(piece);

        square.addEventListener("click", () => {
            squareClicked(x, 9-y);
        });

        board.appendChild(square);
        sq[x][9-y] = square
        pc[x][9-y] = piece
    }
}

function squareClicked(x, y) {
    console.log("Clicked square:", String.fromCharCode(97 + x)+(y+1), `(${x}${y})`);
}