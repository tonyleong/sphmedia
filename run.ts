import * as readline from "readline";

interface Position {
  x: number;
  y: number;
}

// Define specific types for better type safety
type Direction = "N" | "E" | "S" | "W";
type Command = "L" | "R" | "M";

const direction: readonly Direction[] = ["N", "E", "S", "W"];

// Direction movement map for cleaner movement logic
const directionMovement: Record<Direction, Position> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const line =
  "================================================================================================";

let position: Position = { x: 0, y: 0 };
let maxSize: Position = { x: 0, y: 0 };
let heading: Direction = "N";

const setPosition = (x: string, y: string, h: string) => {
  if (!x || !y || !h || isNaN(+x) || isNaN(+y))
    throw Error("Wrong position input, eg: 0, 0, N");
  if (!direction.includes(h as Direction)) throw Error("Wrong direction input!");
  position.x = +x;
  position.y = +y;
  heading = h as Direction;
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

const execute = (command: Command) => {
  const index = direction.indexOf(heading);

  switch (command) {
    case "L":
      heading =
        index === 0 ? direction[direction.length - 1] : direction[index - 1];
      break;
    case "R":
      heading =
        index === direction.length - 1 ? direction[0] : direction[index + 1];
      break;
    case "M":
      const movement = directionMovement[heading];
      move(movement.x, movement.y);
      break;
    default:
      throw Error(
        "Invalid command: " + command + ". Valid commands are: L, R, M"
      );
  }
};

const processInput = (fullCommand: string) => {
  if (!fullCommand || typeof fullCommand !== "string") {
    throw Error("Command must be a non-empty string");
  }

  const validCommands: Command[] = ["L", "R", "M"];

  for (let i = 0; i < fullCommand.length; i++) {
    const char = fullCommand[i];
    if (!validCommands.includes(char as Command)) {
      throw Error(`Invalid command: ${char}. Valid commands are: L, R, M`);
    }
    execute(char as Command);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask for plateau size
const askPlateauSize = (): void => {
  console.log(line);
  console.log(
    "                                        START                                            "
  );
  console.log(line);
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
      askPlateauSize(); // Continue asking for more commands
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
  askPlateauSize();
};

startApplication();
