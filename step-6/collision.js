// the collision function returns whether the two div objects bump into each other
function collision(gameDiv1, gameDiv2) {
    // Get the top left coords of the first div
    let left1 = gameDiv1.getBoundingClientRect().left;
    let top1 = gameDiv1.getBoundingClientRect().top;
  
    // Get the dimensions of the first div
    let height1 = gameDiv1.clientHeight;
    let width1 = gameDiv1.clientWidth;
  
    let bottom1 = top1 + height1;
    let right1 = left1 + width1;
    let left2 = gameDiv2.getBoundingClientRect().left;
    let top2 = gameDiv2.getBoundingClientRect().top;
    let height2 = gameDiv2.clientHeight;
    let width2 = gameDiv2.clientWidth;
    let bottom2 = top2 + height2;
    let right2 = left2 + width2;
  
    if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2)
      return false;
    return true;
  }