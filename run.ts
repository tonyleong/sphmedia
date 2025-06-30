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

// Validation helper functions
const validateNumber = (value: string, name: string): number => {
  if (!value?.trim()) {
    throw Error(`${name} is required`);
  }
  const num = +value.trim();
  if (isNaN(num)) {
    throw Error(`${name} must be a valid number`);
  }
  if (num < 0) {
    throw Error(`${name} must be non-negative`);
  }
  return num;
};

const validateDirection = (dir: string): Direction => {
  if (!dir?.trim()) {
    throw Error("Direction is required");
  }
  const cleanDir = dir.trim().toUpperCase();
  if (!direction.includes(cleanDir as Direction)) {
    throw Error(`Invalid direction: ${cleanDir}. Valid directions are: ${direction.join(', ')}`);
  }
  return cleanDir as Direction;
};

const setPosition = (x: string, y: string, h: string) => {
  try {
    const xPos = validateNumber(x, "X coordinate");
    const yPos = validateNumber(y, "Y coordinate");
    const dir = validateDirection(h);

    position.x = xPos;
    position.y = yPos;
    heading = dir;
  } catch (error: any) {
    throw Error(`Invalid position format. Expected: x,y,direction (e.g., 1,2,N). ${error.message}`);
  }
};

const setSize = (x: string, y: string) => {
  try {
    const width = validateNumber(x, "Plateau width");
    const height = validateNumber(y, "Plateau height");

    maxSize.x = width;
    maxSize.y = height;
  } catch (error: any) {
    throw Error(`Invalid plateau size format. Expected: width,height (e.g., 5,5). ${error.message}`);
  }
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

const validateCommand = (command: string): Command => {
  const validCommands: Command[] = ["L", "R", "M"];
  if (!validCommands.includes(command as Command)) {
    throw Error(`Invalid command: '${command}'. Valid commands are: ${validCommands.join(', ')}`);
  }
  return command as Command;
};

const processInput = (fullCommand: string) => {
  if (!fullCommand?.trim()) {
    throw Error("Command sequence is required and cannot be empty");
  }

  const cleanCommand = fullCommand.trim();

  try {
    for (let i = 0; i < cleanCommand.length; i++) {
      const command = validateCommand(cleanCommand[i]);
      execute(command);
    }
  } catch (error: any) {
    throw Error(`Invalid command sequence: '${cleanCommand}'. ${error.message}`);
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
