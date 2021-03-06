"use strict";

// Save DOM objects to variables
const poles = document.querySelectorAll(".pole");
const gameArea = document.querySelector("#game-area");
const bird = document.querySelector('#bird');
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;
const restartBtn = document.querySelector("#restart-btn");

// make some variables accesible to functions.
const speed = 2;
let animationReq;

function startGame() {
  reset();
  gameLoop();
}

function updatePoles() {
  // Move poles
  let polesCurrentPos = parseFloat(
    window.getComputedStyle(poles[0]).getPropertyValue("right")
  );

  //  Check whether the poles went putside of game area.
  if (polesCurrentPos > containerWidth) {
    // Generate new poles.
    let newHeight = parseInt(Math.random() * 100);
    // Change the poles' height
    poles[0].style.height = `${100 + newHeight}px`;
    poles[1].style.height = `${100 - newHeight}px`;

    // Move poles back to the right-hand side of game area.
    polesCurrentPos = 0; // This is based on the "right" property.
  }

  poles.forEach((pole) => {
    pole.style.right = `${polesCurrentPos + speed}px`;
  });
}

function update() {
  updatePoles();

  let birdTop = parseFloat(window.getComputedStyle(bird).getPropertyValue("top"));
  if (birdTop < containerHeight - bird.clientHeight) {
          bird.style.top = birdTop + 2 + "px";
  }
}

function gameLoop() {
  update();
  animationReq = requestAnimationFrame(gameLoop);
}


function reset() {
  bird.style.top = "20%";
  poles.forEach((pole) => {
    pole.style.right = 0;
  });
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

restartBtn.addEventListener("click", startGame);