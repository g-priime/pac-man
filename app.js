document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const winDisplay = document.getElementById("win-status");
  const width = 28; //28 x 28 = 784 squares
  const startPauseButton = document.querySelector("#start-pause-button");

  let score = 0;
  let gameInPlay = false;

  //layout of grid and what is in the squares
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2,
    2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    1, 1, 2, 2, 1, 1, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const squares = [];

  //legend
  //0 - pac-dot
  //1 - wall
  //2 - ghost-lair
  //3 - power-pettet
  //4 empty

  //draw the grid and render it
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }
  createBoard();

  //starting position of pac-man
  let pacmanCurrentIndex = 490;

  squares[pacmanCurrentIndex].classList.add("pac-man");

  //move pacman
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");

    switch (e.keyCode) {
      case 37:
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= 1;

        //check if pacman is in the left exit
        if (pacmanCurrentIndex - 1 === 363) {
          pacmanCurrentIndex = 391;
        }

        break;
      case 38:
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= width;
        break;
      case 39:
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += 1;

        //check if pacman is in the right exit
        if (pacmanCurrentIndex + 1 === 392) {
          pacmanCurrentIndex = 364;
        }

        break;
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += width;
        break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver;
    checkForWin();
  }

  //what happens when Pac-man eats a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      score += 10;
      scoreDisplay.innerHTML = score;
      ghosts.forEach((ghost) => (ghost.isScared = true));
      setTimeout(unScareGhosts, 10000);
      squares[pacmanCurrentIndex].classList.remove("power-pellet");
    }
  }

  //make the ghosts stop appearing as aquamarine
  function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  //create our Ghost template
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isScared = false;
      this.prevIndex = startIndex;
    }
  }

  ghosts = [
    new Ghost("blinky", 349, 250),
    new Ghost("pinky", 377, 400),
    new Ghost("inky", 350, 300),
    new Ghost("clyde", 378, 500),
  ];

  //draw my ghosts onto the grid
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });

  //write the function to move the ghosts
  /*
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      //if the next square your ghost is going to go in dowes NOT contain a wall and a ghost, you can go there
      if (
        !squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")
      ) {
        //you can go here
        //remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        //change the current index to the new safe square
        ghost.currentIndex += direction;
        //redraw the ghost in the new safe space
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        //else find a new direction to try
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      //if the ghost is scared and pacman runs into it
      if (
        (ghost.isScared &&
          squares[ghost.currentIndex].classList.contains("pac-man")) ||
        squares[pacmanCurrentIndex].classList.contains("scared-ghost")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.innerHTML = score;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      checkForGameOver();
      checkForWin();
    }, ghost.speed);
  }
*/

  //function for ghosts to chase
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    //let directions = checkPositions(ghost);
    //let direction = directions[Math.floor(Math.random() * directions.length)];
    let direction = checkPositions(ghost);
    let moved = false;

    ghost.timerId = setInterval(function () {
      moved = false;

      direction = checkPositions(ghost);
      console.log(direction)
      if (
        !squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
        !(ghost.currentIndex + direction === ghost.prevIndex) &&
        !moved
      ) {
        //you can go here
        //remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.prevIndex = ghost.currentIndex;
        //change the current index to the new safe square
        ghost.currentIndex += direction;
        //redraw the ghost in the new safe space
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        //else find a new direction to try
        moved = true;
      }

      if (!moved) {
        for (i = 0; i < directions.length; i++) {
          direction = directions[i];
          //if the next square your ghost is going to go in dowes NOT contain a wall and a ghost, you can go there
          if (
            !squares[ghost.currentIndex + direction].classList.contains(
              "wall"
            ) &&
            !squares[ghost.currentIndex + direction].classList.contains(
              "ghost"
            ) &&
            !(ghost.currentIndex + direction === ghost.prevIndex) &&
            !moved
          ) {
            //you can go here
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(
              ghost.className,
              "ghost",
              "scared-ghost"
            );
            ghost.prevIndex = ghost.currentIndex;
            //change the current index to the new safe square
            ghost.currentIndex += direction;
            //redraw the ghost in the new safe space
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            //else find a new direction to try
            moved = true;
          }
        }
      }

      if (!moved) {
        for (i = 0; i < directions.length; i++) {
          direction = directions[i];
          //if the next square your ghost is going to go in dowes NOT contain a wall and a ghost, you can go there
          if (
            !squares[ghost.currentIndex + direction].classList.contains(
              "wall"
            ) &&
            !squares[ghost.currentIndex + direction].classList.contains(
              "ghost"
            ) &&
            !moved
          ) {
            //you can go here
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(
              ghost.className,
              "ghost",
              "scared-ghost"
            );
            ghost.prevIndex = ghost.currentIndex;
            //change the current index to the new safe square
            ghost.currentIndex += direction;
            //redraw the ghost in the new safe space
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            //else find a new direction to try
            moved = true;
          }
        }
      }

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      //if the ghost is scared and pacman runs into it
      if (
        (ghost.isScared &&
          squares[ghost.currentIndex].classList.contains("pac-man")) ||
        squares[pacmanCurrentIndex].classList.contains("scared-ghost")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.innerHTML = score;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      //console.log(directions);

      checkForGameOver();
      checkForWin();
    }, ghost.speed);
  }

  function checkPositions(ghost) {
    const xDifference = checkXPositions(ghost);
    const yDifference = checkYPositions(ghost);

    if (xDifference > 0 && yDifference > 0) {
      if (Math.abs(xDifference) > Math.abs(yDifference)) {
        return -1;
      } else {
        return -width;
      }
    } else if (xDifference > 0 && yDifference < 0) {
      if (Math.abs(xDifference) > Math.abs(yDifference)) {
        return -1;
      } else {
        return width;
      }
    } else if (xDifference < 0 && yDifference < 0) {
      if (Math.abs(xDifference) > Math.abs(yDifference)) {
        return 1;
      } else {
        return width;
      }
    } else if (xDifference < 0 && yDifference > 0) {
      if (Math.abs(xDifference) > Math.abs(yDifference)) {
        return 1;
      } else {
        return -width;
      }
    }

    return -width;
  }

  function checkXPositions(ghost) {
    const ghostXPosition = ghost.currentIndex % width;
    const packmanXPosition = pacmanCurrentIndex % width;
    return ghostXPosition - packmanXPosition;
  }

  function checkYPositions(ghost) {
    const ghostYPosition = Math.trunc(ghost.currentIndex / width);
    const packmanYPosition = Math.trunc(pacmanCurrentIndex / width);
    return ghostYPosition - packmanYPosition;
  }

  //check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      //setTimeout(function () {
      //alert("Game Over!");
      //}, 500);
      winDisplay.innerHTML = "GAME OVER";
    }
  }

  //check for a win
  function checkForWin() {
    if (score >= 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      winDisplay.innerHTML = "YOU WIN!";
    }
  }

  startPauseButton.addEventListener("click", () => {
    if (gameInPlay) {
      document.removeEventListener("keyup", movePacman);
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      gameInPlay = false;
    } else {
      document.addEventListener("keyup", movePacman);
      //move the ghosts randomly
      ghosts.forEach((ghost) => moveGhost(ghost));
      gameInPlay = true;
    }
  });
});
