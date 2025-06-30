const readline = require("readline");

let position = { x: 0, y: 0 };
let maxSize = { x: 0, y: 0 };
let heading = "N";
const direction = ["N", "E", "S", "W"];
const line =
  "================================================================================================";

const setPosition = (x, y, h) => {
  if (!x || !y || !h || isNaN(+x) || isNaN(+y))
    throw new Error("Wrong position input, eg: 0, 0, N");
  if (!direction.includes(h)) throw new Error("Wrong direction input!");
  position.x = +x;
  position.y = +y;
  heading = h;
};

const setSize = (x, y) => {
  if (!x || !y || isNaN(+x) || isNaN(+y))
    throw new Error("Wrong size input, eg: 0,0");
  maxSize.x = +x;
  maxSize.y = +y;
};

const move = (x = 0, y = 0) => {
  let newX = (position.x += x);
  let newY = (position.y += y);
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxSize.x) newX = maxSize.x;
  if (newY > maxSize.y) newY = maxSize.y;
  position.x = newX;
  position.y = newY;
};

const execute = (command) => {
  let index = direction.indexOf(heading);
  if (command === "L") {
    if (index === 0) heading = direction[direction.length - 1];
    else heading = direction[index - 1];
  } else if (command === "R") {
    if (index === direction.length - 1) heading = direction[0];
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
    } else throw Error("Wrong command input");
  } else throw Error("Wrong command input");
};

const processInput = (fullCommand) => {
  for (let i in fullCommand) {
    execute(fullCommand[i]);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userInput = () => {
  console.log(line);
  console.log("                                        START                                            ");
  console.log(line);
  rl.question("Please enter plateau size: ", (answer) => {
    try {
      setSize(...answer.split(","));
      rl.question("Please enter Mars Rover's initial position: ", (answer) => {
        setPosition(...answer.split(","));
        rl.question("Please enter command: ", (answer) => {
          processInput(answer);
          console.log(
            `The position of the Mars Rover is (x:${position.x}, y:${position.y}, heading to ${heading})`
          );
          console.log(line);

          console.log(
            "          if wish to close the application please use Ctrl + C         "
          );
          console.log(line);
          console.log('*')
          console.log('*')
          console.log('*')
          console.log('*')
          console.log('*')
          console.log('*')
          console.log('*')
          userInput();
        });
      });
    } catch (error) {
      console.log(error.message);
      rl.close();
    }
  });
};

userInput();
