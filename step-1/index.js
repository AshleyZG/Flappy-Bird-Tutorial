// Save DOM objects to variables
const poles = document.querySelectorAll(".pole");
const gameArea = document.querySelector("#game-area");
const restartBtn = document.querySelector("#restart-btn");
const containerWidth = gameArea.clientWidth;

const speed = 2;
let animationReq;

function startGame() {
    reset();
    gameLoop();
}

function gameLoop() {
    updatePoles();
    animationReq = requestAnimationFrame(gameLoop);
}

function updatePoles() {
    // Move poles
    let polesCurrentPos = parseFloat(
        window.getComputedStyle(poles[0]).getPropertyValue("right")
    );
    
    //  Check whether the poles went putside of game area.
    if (polesCurrentPos > containerWidth) {
        // Generate new poles
        let newHeight = parseInt(Math.random() * 100);
        // Change the poles' height
        //The middle gap of the pole is 100px
        poles[0].style.height = `${100 + newHeight}px`;
        poles[1].style.height = `${100 - newHeight}px`;

        // Move poles back to the right-hand side of game area.
        polesCurrentPos = 0; // This is based on the "right" property.
    }

    poles.forEach((pole) => {
        pole.style.right = `${polesCurrentPos + speed}px`;
    });
}

function reset() {
    poles.forEach((pole) => {
        pole.style.right = 0;
    });
    if (animationReq) {
        cancelAnimationFrame(animationReq);
    }
}

restartBtn.addEventListener('click', startGame);