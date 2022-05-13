const playerText = document.getElementById('playerText');
const restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-blocks");
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const O_text = "O";
const X_text = "X";
let currentPlayer = X_text;

let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
}

function boxClicked(e){
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id]=currentPlayer;
        e.target.innerText = currentPlayer;

        if(winner()!=false){
            playerText.innerHTML= `${currentPlayer} has Won!`;
            let winning_blocks= winner();

            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer=currentPlayer == X_text ? O_text : X_text;
        playerText.innerHTML= currentPlayer+"'s turn";
    }

}

restartBtn.addEventListener("click", function(){
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText='';
        box.style.backgroundColor=''
    });

    currentPlayer=X_text;
    playerText.innerHTML = "New Game";
});


function winner(){
    for (const combo of winningCombos) {
        let[a,b,c]=combo;
        if(spaces[a]&&spaces[a]==spaces[b]&& spaces[a]==spaces[c]){
            return [a,b,c];
        }
    }
    return false;
}

startGame();