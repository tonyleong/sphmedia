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
    throw Error(`❌ ${name} is required and cannot be empty`);
  }
  const num = +value.trim();
  if (isNaN(num)) {
    throw Error(`❌ ${name} must be a valid number. You entered: '${value.trim()}'`);
  }
  if (num < 0) {
    throw Error(`❌ ${name} must be non-negative (≥ 0). You entered: ${num}`);
  }
  return num;
};

const validateDirection = (dir: string): Direction => {
  if (!dir?.trim()) {
    throw Error("❌ Direction is required and cannot be empty");
  }
  const cleanDir = dir.trim().toUpperCase();
  if (!direction.includes(cleanDir as Direction)) {
    throw Error(`❌ Invalid direction: '${cleanDir}'. Please use one of: ${direction.join(', ')}`);
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
    throw Error(`🚀 Mars Rover Position Error!\n   Expected format: x,y,direction (example: 1,2,N)\n   ${error.message}`);
  }
};

const setSize = (x: string, y: string) => {
  try {
    const width = validateNumber(x, "Plateau width");
    const height = validateNumber(y, "Plateau height");

    maxSize.x = width;
    maxSize.y = height;
  } catch (error: any) {
    throw Error(`🏔️  Plateau Size Error!\n   Expected format: width,height (example: 5,5)\n   ${error.message}`);
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
        `🤖 Mars Rover Command Error!\n   Invalid command: '${command}'\n   ✅ Valid commands: L (turn Left), R (turn Right), M (Move forward)`
      );
  }
};

const validateCommand = (command: string): Command => {
  const validCommands: Command[] = ["L", "R", "M"];
  if (!validCommands.includes(command as Command)) {
    throw Error(`❌ Invalid command: '${command}'\n   ✅ Valid commands: L (turn Left), R (turn Right), M (Move forward)`);
  }
  return command as Command;
};

const processInput = (fullCommand: string) => {
  if (!fullCommand?.trim()) {
    throw Error("🎮 Command Input Error!\n   Please enter a command sequence (example: LMLMLMLMM)\n   ❌ Empty commands are not allowed");
  }

  const cleanCommand = fullCommand.trim();

  try {
    for (let i = 0; i < cleanCommand.length; i++) {
      const command = validateCommand(cleanCommand[i]);
      execute(command);
    }
  } catch (error: any) {
    throw Error(`🎮 Command Sequence Error!\n   Input: '${cleanCommand}'\n   ${error.message}`);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask for plateau size
const askPlateauSize = (): void => {
  console.log(line);
  console.log("🚀                           MARS ROVER SIMULATOR                           🚀");
  console.log(line);
  console.log("");
  console.log("📐 STEP 1: Define the Plateau");
  console.log("   The plateau is a rectangular grid where the rover will navigate.");
  console.log("   Enter the maximum coordinates (width,height) - e.g., 5,5 creates a 6x6 grid (0-5)");
  console.log("");
  rl.question("🏔️  Enter plateau size (width,height): ", (answer: string) => {
    try {
      const parts = answer.split(",");
      if (parts.length !== 2) {
        throw Error(`❌ Invalid format: '${answer}'\n   Expected exactly 2 parts separated by comma: width,height\n   Example: 5,5`);
      }
      const [sx, sy] = parts;
      setSize(sx, sy);
      console.log(`✅ Plateau set to ${maxSize.x}x${maxSize.y} (coordinates: 0,0 to ${maxSize.x},${maxSize.y})`);
      console.log("");
      askRoverPosition();
    } catch (error: any) {
      console.log("");
      console.log(error.message);
      console.log("");
      console.log("🔄 Let's try again...");
      console.log("");
      askPlateauSize();
    }
  });
};

// Function to ask for rover's initial position
const askRoverPosition = (): void => {
  console.log("🤖 STEP 2: Position the Mars Rover");
  console.log("   Place your rover on the plateau with starting coordinates and direction.");
  console.log("   Format: x,y,direction (e.g., 1,2,N means position (1,2) facing North)");
  console.log("   📍 Directions: N=North, E=East, S=South, W=West");
  console.log("");
  rl.question("🚀 Enter rover's starting position (x,y,direction): ", (answer: string) => {
    try {
      const parts = answer.split(",");
      if (parts.length !== 3) {
        throw Error(`❌ Invalid format: '${answer}'\n   Expected exactly 3 parts separated by commas: x,y,direction\n   Example: 1,2,N`);
      }
      const [px, py, ph] = parts;
      setPosition(px, py, ph);
      console.log(`✅ Rover positioned at (${position.x},${position.y}) facing ${heading}`);
      console.log("");
      askCommand();
    } catch (error: any) {
      console.log("");
      console.log(error.message);
      console.log("");
      console.log("🔄 Let's try again...");
      console.log("");
      askRoverPosition();
    }
  });
};

// Function to ask for command
const askCommand = (): void => {
  console.log("🎮 STEP 3: Control the Mars Rover");
  console.log("   Send a sequence of commands to move your rover:");
  console.log("   🔄 L = Turn Left    🔄 R = Turn Right    ⬆️  M = Move Forward");
  console.log("   Example: LMLMLMLMM (turn left, move, turn left, move, etc.)");
  console.log("");
  rl.question("🎯 Enter command sequence: ", (answer: string) => {
    try {
      processInput(answer);
      displayResult();
      askPlateauSize(); // Continue asking for more commands
    } catch (error: any) {
      console.log("");
      console.log(error.message);
      console.log("");
      console.log("🔄 Let's try again...");
      console.log("");
      askCommand();
    }
  });
};

// Function to display the result
const displayResult = (): void => {
  console.log("");
  console.log("🎉 MISSION COMPLETE!");
  console.log(line);
  console.log(`🤖 Mars Rover Final Position:`);
  console.log(`   📍 Coordinates: (${position.x}, ${position.y})`);
  console.log(`   🧭 Direction: ${heading} (${getDirectionName(heading)})`);
  console.log(`   🏔️  Plateau: ${maxSize.x}x${maxSize.y}`);
  console.log(line);
  console.log("");
  console.log("🔄 Ready for next mission!");
  console.log("💡 Tip: You can test different plateau sizes and rover positions");
  console.log("⚠️  Press Ctrl + C to exit the simulator");
  console.log("");
  displaySeparator(5);
  console.log("");
};

// Helper function to get direction name
const getDirectionName = (dir: Direction): string => {
  const directionNames = {
    N: "North",
    E: "East",
    S: "South",
    W: "West"
  };
  return directionNames[dir];
};

// Function to display separator stars
const displaySeparator = (count: number = 7): void => {
  for (let i = 0; i < count; i++) {
    console.log("⭐");
  }
};

// Function to start the application
const startApplication = (): void => {
  askPlateauSize();
};

startApplication();
