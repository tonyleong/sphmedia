import * as readline from "readline";

interface Position {
  x: number;
  y: number;
}

const direction = ["N", "E", "S", "W"];

// Direction movement map for cleaner movement logic
const directionMovement: { [key: string]: { x: number; y: number } } = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const line =
  "================================================================================================";

let position: Position = { x: 0, y: 0 };
let maxSize: Position = { x: 0, y: 0 };
let heading: string = "N";

const setPosition = (x: string, y: string, h: string) => {
  if (!x || !y || !h || isNaN(+x) || isNaN(+y))
    throw Error("Wrong position input, eg: 0, 0, N");
  if (!direction.includes(h)) throw Error("Wrong direction input!");
  position.x = +x;
  position.y = +y;
  heading = h;
};

const setSize = (x: string, y: string) => {
  if (!x || !y || isNaN(+x) || isNaN(+y))
    throw Error("Wrong size input, eg: 0,0");
  maxSize.x = +x;
  maxSize.y = +y;
};

const move = (x: number = 0, y: number = 0) => {
  let newX = position.x + x;
  let newY = position.y + y;
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxSize.x) newX = maxSize.x;
  if (newY > maxSize.y) newY = maxSize.y;
  position.x = newX;
  position.y = newY;
};

const execute = (command: string) => {
  let index = direction.indexOf(heading);
  if (command === "L") {
    if (index === 0) heading = direction[direction.length - 1];
    else heading = direction[index - 1];
  } else if (command === "R") {
    if (index === direction.length - 1) heading = direction[0];
    else heading = direction[index + 1];
  } else if (command === "M") {
    const movement =
      directionMovement[heading as keyof typeof directionMovement];
    if (movement) {
      move(movement.x, movement.y);
    } else {
      throw Error("Invalid heading: " + heading);
    }
  } else {
    throw Error("Wrong command input");
  }
};

const processInput = (fullCommand: string) => {
  if (!fullCommand || typeof fullCommand !== "string") {
    throw Error("Command must be a non-empty string");
  }

  for (let i = 0; i < fullCommand.length; i++) {
    execute(fullCommand[i]);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask for plateau size
const askPlateauSize = (): void => {
  rl.question("Please enter plateau size: ", (answer: string) => {
    try {
      const [sx, sy] = answer.split(",");
      setSize(sx, sy);
      askRoverPosition();
    } catch (error: any) {
      console.log(error.message);
      rl.close();
    }
  });
};

// Function to ask for rover's initial position
const askRoverPosition = (): void => {
  rl.question(
    "Please enter Mars Rover's initial position: ",
    (answer: string) => {
      try {
        const [px, py, ph] = answer.split(",");
        setPosition(px, py, ph);
        askCommand();
      } catch (error: any) {
        console.log(error.message);
        rl.close();
      }
    }
  );
};

// Function to ask for command
const askCommand = (): void => {
  rl.question("Please enter command: ", (answer: string) => {
    try {
      processInput(answer);
      displayResult();
      askCommand(); // Continue asking for more commands
    } catch (error: any) {
      console.log(error.message);
      rl.close();
    }
  });
};

// Function to display the result
const displayResult = (): void => {
  console.log(
    `The position of the Mars Rover is (x:${position.x}, y:${position.y}), heading to ${heading}`
  );
  console.log(line);
  console.log(
    "          if wish to close the application please use Ctrl + C         "
  );
  console.log(line);
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
};

// Function to start the application
const startApplication = (): void => {
  console.log(line);
  console.log(
    "                                        START                                            "
  );
  console.log(line);
  askPlateauSize();
};

startApplication();
