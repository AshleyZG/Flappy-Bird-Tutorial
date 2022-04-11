"use strict";

// Save DOM objects to variables
const poles = document.querySelectorAll(".pole");
const gameArea = document.querySelector("#game-area");
const bird = document.querySelector('#bird');
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;
const restartBtn = document.querySelector("#restart-btn");

const scoreSpan = document.querySelector('#score');
let score;
let scoreUpdated;
const speedSpan = document.querySelector('#speed');
let speed;


// make some variables accesible to functions.
// const speed = 2;
let animationReq;

//Add a new variable to capture whether the bird is flapping or not
let flapping;
let playing;

// Start flapping with mousedown
gameArea.addEventListener("mousedown", function (e) {
    if (playing) {
        flapping = true;
    }
});
// stop flapping with mousedown
gameArea.addEventListener("mouseup", function (e) {
    if (playing) {
        flapping = false;
    }
});

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


    // Update speed
    speed += 0.25;
    speedSpan.textContent = parseInt(speed);
    scoreUpdated = false;

  }

  poles.forEach((pole) => {
    pole.style.right = `${polesCurrentPos + speed}px`;
  });
}

function update() {
  updatePoles();

  let birdTop = parseFloat(window.getComputedStyle(bird).getPropertyValue("top"));
  if (flapping) {
      bird.style.top = birdTop + -2 + "px";
  } else if (birdTop < containerHeight - bird.clientHeight) {
      bird.style.top = birdTop + 2 + "px";
  }

  // Check for collisions
  if (collision(bird, poles[0]) || collision(bird, poles[1]) || birdTop <= 0 || birdTop > containerHeight - bird.clientHeight) {
    gameOver();
  }

}


function gameOver() {
  playing = false;
  restartBtn.addEventListener('click', startGame);
}


function gameLoop() {
  update();
  if (playing) {
      animationReq = requestAnimationFrame(gameLoop);
  }
}

function reset() {

  speed = 2;
  score = 0;
  speedSpan.textContent = "";
  scoreSpan.textContent = score;
  scoreUpdated = false;

  flapping = false;
  playing = true;
  bird.style.top = "20%";
  poles.forEach((pole) => {
    pole.style.right = 0;
  });
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}


restartBtn.addEventListener("click", startGame);