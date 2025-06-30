// display.ts - UI/UX display utilities

import { Direction, Position } from './validation';

const line = "================================================================================================";

// Helper function to get direction name
export const getDirectionName = (dir: Direction): string => {
  const directionNames = {
    N: "North",
    E: "East", 
    S: "South",
    W: "West"
  };
  return directionNames[dir];
};

// Function to display separator stars
export const displaySeparator = (count: number = 7): void => {
  for (let i = 0; i < count; i++) {
    console.log("⭐");
  }
};

// Display functions for each step
export const displayHeader = (): void => {
  console.log(line);
  console.log("🚀                           MARS ROVER SIMULATOR                           🚀");
  console.log(line);
  console.log("");
};

export const displayPlateauStep = (): void => {
  console.log("📐 STEP 1: Define the Plateau");
  console.log("   The plateau is a rectangular grid where the rover will navigate.");
  console.log("   Enter the maximum coordinates (width,height) - e.g., 5,5 creates a 6x6 grid (0-5)");
  console.log("");
};

export const displayRoverPositionStep = (): void => {
  console.log("🤖 STEP 2: Position the Mars Rover");
  console.log("   Place your rover on the plateau with starting coordinates and direction.");
  console.log("   Format: x,y,direction (e.g., 1,2,N means position (1,2) facing North)");
  console.log("   📍 Directions: N=North, E=East, S=South, W=West");
  console.log("");
};

export const displayCommandStep = (): void => {
  console.log("🎮 STEP 3: Control the Mars Rover");
  console.log("   Send a sequence of commands to move your rover:");
  console.log("   🔄 L = Turn Left    🔄 R = Turn Right    ⬆️  M = Move Forward");
  console.log("   Example: LMLMLMLMM (turn left, move, turn left, move, etc.)");
  console.log("");
};

export const displayPlateauSuccess = (maxSize: Position): void => {
  console.log(`✅ Plateau set to ${maxSize.x}x${maxSize.y} (coordinates: 0,0 to ${maxSize.x},${maxSize.y})`);
  console.log("");
};

export const displayRoverPositionSuccess = (position: Position, heading: Direction): void => {
  console.log(`✅ Rover positioned at (${position.x},${position.y}) facing ${heading}`);
  console.log("");
};

export const displayMissionComplete = (position: Position, heading: Direction, maxSize: Position): void => {
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

export const displayError = (error: any): void => {
  console.log("");
  console.log(error.message);
  console.log("");
  console.log("🔄 Let's try again...");
  console.log("");
};

// Input prompts
export const PROMPTS = {
  PLATEAU_SIZE: "🏔️  Enter plateau size (width,height): ",
  ROVER_POSITION: "🚀 Enter rover's starting position (x,y,direction): ",
  COMMAND_SEQUENCE: "🎯 Enter command sequence: "
};
