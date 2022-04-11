# Flappy Bird Tutorial, Part 2
Great job so far. Your game should now start when you click “Restart”: the poles move, but your bird just stays in plays, passing through the poles. In Part 2, we are going to fill in everything that needs filling in: Our bird falling, flapping, colliding with poles, and restarting. Let’s jump in!

----------
## Step 1: Bird falls

This is pretty easy to add.
We’ll just add this to **update()** in **index.js.** 

```javascript
let birdTop = parseFloat(window.getComputedStyle(bird).getPropertyValue("top"));
if (birdTop < containerHeight - bird.clientHeight) {
        bird.style.top = birdTop + 2 + "px";
}
```
let’s also update `reset()` to look like this. The bird’s style will come in handy later on

```javascript
function reset() {
  bird.style.top = "20%";
  poles.forEach((pole) => {
    pole.style.right = 0;
  });
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}
```
`birdTop` is the screen position of the top of the bird’s body. The `if()` statement is saying, as long as the bird is higher than the very bottom of the screen, it should fall.

Remember, When we add to the height, we are actually going down, because the top left of the screen is 0, 0. So, because we are adding this to update(), every frame, our bird moves down. However, if the bird is at the bottom of the screen, it shouldn’t fall any more.

If we run this, we’ll see the bird fall until it hits the bottom of the window, then it just hangs out. Great!

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-1/) | [Github repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-1) . 

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615165391_chrome-capture-2022-3-10+1.gif)

## Step 2: Bird flaps

Because we want the bird to flap every time the user clicks, we can use event listeners to build the flap mechanism. Let’s add this to **index.js**

```javascript
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
```
Next, let’s replace our previous statement that added gravity with a new one. We want the bird to fall, unless it is flapping. So let’s say this:

```javascript
if (flapping) {
    bird.style.top = birdTop + -2 + "px";
} else if (birdTop < containerHeight - bird.clientHeight) {
    bird.style.top = birdTop + 2 + "px";
}
```
Finally, in reset(), let’s reset these two variables. The playing variable will come in handy later on, when we are figuring out how to implement “game over” and “reset”

```javascript
function reset() {
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
```
Now try running the game again. Our bird should fly when we click! Nice!

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-2/) | [Github Repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-2) 

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615236667_chrome-capture-2022-3-10+2.gif)

## Step 3: Colliding with Poles

Now, that the bird is falling and flapping, we have to make it collide with the poles (Unfortunately!).

Let’s start by adding the final piece of this, and then work backwards. In the `update()` function, let’s add an if() statement that checks if our bird has collided with any of the poles. It will look like this

```javascript
// Check for collisions
if (collision(bird, poles[0]) || collision(bird, poles[1]) || birdTop <= 0 || birdTop > containerHeight - bird.clientHeight) {
  gameOver();
}
```
This is saying: Game Over if

- The bird hits the top pole
- The bird hits the bottom pole
- The bird hits the top of the frame
- The bird hits the bottom of the frame

That makes sense for the rules of game, but we don’t have a `collision()` function yet, and we don’t have a `gameOver()` function either.

Let’s add a placeholder for `gameOver()` to **index.js**

```javascript
function gameOver() {
  console.log("game over");
}
```
We’ll see what triggers this function, but it won’t actually cause the game to end. We’ll update the body of it later.

We use the `collision(``)` function to determine whether the bird hits the poles by checking whether the bird’s boundary and the pole’s boundary are overlapping. Remember, this is a collision() function, so if it returns true, we’re saying, “Yes, something is colliding”. 

In this session, we don’t need to implement the `collision()`  function. It is provided in **collision.js**. 

Let’s test this out. Open up the console for this one. When you hit the bottom of the screen, fly past the top of the screen, or hit the poles, you should see `game over` printing to the console. This means that all of the rules are working correctly! Good job.

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-3/) | [Github Repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-3)

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615367975_chrome-capture-2022-3-10+3.gif)
![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615384919_image.png)

## Step 4: Game Over Functionality

Next, let’s make the `gameOver()` function more serious. First, let’s replace our current version with this

```javascript
function gameOver() {
    playing = false;
    restartBtn.addEventListener('click', startGame);
}
```
Now, we’re changing the value of `playing`. However, we don’t have that variable doing anything. Let’s give it more functionality. Let’s update `gameLoop()` so that the game only progressing when playing is set to true

```javascript
function gameLoop() {
    update();
    if (playing) {
        animationReq = requestAnimationFrame(gameLoop);
    }
}
```
Alright, test it out again. When the bird hits a pole, the top of the area, or the bottom of the area, the game should end. If you click Restart, you should be able to restart.

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-4/) | [Github Repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-4)

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615472953_chrome-capture-2022-3-10+4.gif)

## Step 5: Updating Speed

Basically, it’s working! Great job. But we can add more stuff to make the game more fully-featured. The two big things we can add are: a Score counter, and a changing speed.

Let’s add a “Score” element to the screen, and also implement an increasing speed. In **Index.html**, add 2 `<p>` elements within the `#game-info` div. The new version will look like that

```html
<div id="game-info">
  <p>Score:<span id="score">3</span></p>
  <button id="restart-btn">Restart</button>
  <p>Speed:<span id="speed">2</span></p>
</div>
```
At the top of index.js, let’s add some values

```javascript
const scoreSpan = document.querySelector('#score');
let score;
let scoreUpdated;
const speedSpan = document.querySelector('#speed');
let speed;
```
We are changing speed from a const to a let, because now it will be changing! We will assign it a value lower in the file.

Let’s add some more functionality to **index.js**. Let’s add score and speed info to `reset()`

```javascript
speed = 2;
score = 0;
speedSpan.textContent = "";
scoreSpan.textContent = score;
scoreUpdated = false;
```
Now, let’s add some pieces to `updatePoles()`. Within the `if(polesCurrentPos > containerWidth) {}`, add these lines

```javascript
// Update speed
speed += 0.25;
speedSpan.textContent = parseInt(speed);
scoreUpdated = false;
```
These lines will run every time time the poles leave the screen, so, because of addition to speed, the game will get progressively faster.

We’re manipulating the speed variable, but where does it actually affect the scene? Look in `updatePoles()`, where it says `pole.style.right = ${polesCurrentPos + speed}px`; Because this function runs every frame, the speed variable determines how far the poles move every frame. As speed increases, the faster the poles move across the screen.

Let’s test it out!

You should see “0” for score now, and “2” for speed. However, once 4 poles pass by you, you should see the speed increase to 3, and you should feel the game getting faster. That is because the game speed increases by 0.25 every time they pass!

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-5/) | [Github Repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-5)

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615582954_chrome-capture-2022-3-10+5.gif)

## Step 6: Updating Score

Cool! Finally, let’s add a working scoreboard. This will just require one piece added to the `updatePoles()` function. Here is the new version with the “Update Score" section added

```javascript
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
    // Update score
    score += 1;
    scoreSpan.textContent = score;
  }
  poles.forEach((pole) => {
    pole.style.right = `${polesCurrentPos + speed}px`;
  });
}
```
All this is saying is: Once the poles are across the screen, increase the score by 1. 

Let’s test it out. 

Now, the game is running, and we see the score update every time our bird passes through the poles. Nice! Great job.

[Webpage Demo](https://gezhangrp.com/Flappy-Bird-Tutorial/step-6/) | [Github Repository](https://github.com/AshleyZG/Flappy-Bird-Tutorial/tree/master/step-6)

![](https://paper-attachments.dropbox.com/s_A49239764BBBAFE775CE15C3203E48CCB0F33C24DFDB8160547E018C696442FF_1649615656614_chrome-capture-2022-3-10+6.gif)

