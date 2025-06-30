let position = { x: 0, y: 0 };
let maxSize = { x: 0, y: 0 };
let heading = "N";
const direction = ["N", "E", "S", "W"];

const setPosition = (x, y, h) => {
  //handle wrong hdeaing input
  position.x = x;
  position.y = y;
  heading = h;
};

const setSize = (x, y) => {
  maxSize.x = x;
  maxSize.y = y;
};

const move = (x = 0, y = 0) => {
  //handle max size
  let newX = (position.x += x);
  let newY = (position.y += y);
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  position.x = newX;
  position.y = newY;
};

const execute = (command) => {
  // L = direction-1, R = direction +1
  let index = direction.indexOf(heading);
  if (command === "L") {
    if (index === 0) heading = direction[direction.length - 1];
    else heading = direction[index - 1];
  } else if (command === "R") {
    if (index === direction[direction.length - 1]) heading = direction[0];
    else heading = direction[index + 1];
  } else if (command === "M") {
    if (heading === "N") {
      move(0, 1);
    } else if (heading === "E") {
      move(1, 0);
    } else if (heading === "S") {
      move(0, -1);
    } else if (heading === "W") {
      move(-1, 0);
    } else throw Error("Wrong input");
  } else throw Error("Wrong input");
};

const processInput = (fullCommand) => {
  for (let i in fullCommand) {
    execute(fullCommand[i]);
  }
};

setSize(5, 5);
setPosition(1, 2, "N");
processInput("LMLMLMLMM");
console.log(position, heading);
