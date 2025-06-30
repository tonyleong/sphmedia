// main.ts - Main application entry point

import * as readline from "readline";
import {
  validateNumber,
  validateDirection,
  validatePlateauInput,
  validatePositionInput,
  validateCommandSequence
} from './validation';
import {
  displayHeader,
  displayPlateauStep,
  displayRoverPositionStep,
  displayCommandStep,
  displayPlateauSuccess,
  displayRoverPositionSuccess,
  displayMissionComplete,
  displayError,
  PROMPTS
} from './display';
import { MarsRover } from './rover-logic';

// Create Mars Rover instance
const rover = new MarsRover();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask for plateau size
const askPlateauSize = (): void => {
  displayHeader();
  displayPlateauStep();
  
  rl.question(PROMPTS.PLATEAU_SIZE, (answer: string) => {
    try {
      const [sx, sy] = validatePlateauInput(answer);
      const width = validateNumber(sx, "Plateau width");
      const height = validateNumber(sy, "Plateau height");
      
      rover.setSize(width, height);
      displayPlateauSuccess(rover.getMaxSize());
      askRoverPosition();
    } catch (error: any) {
      displayError(error);
      askPlateauSize();
    }
  });
};

// Function to ask for rover's initial position
const askRoverPosition = (): void => {
  displayRoverPositionStep();
  
  rl.question(PROMPTS.ROVER_POSITION, (answer: string) => {
    try {
      const [px, py, ph] = validatePositionInput(answer);
      const xPos = validateNumber(px, "X coordinate");
      const yPos = validateNumber(py, "Y coordinate");
      const dir = validateDirection(ph);
      
      rover.setPosition(xPos, yPos, dir);
      displayRoverPositionSuccess(rover.getPosition(), rover.getHeading());
      askCommand();
    } catch (error: any) {
      displayError(error);
      askRoverPosition();
    }
  });
};

// Function to ask for command
const askCommand = (): void => {
  displayCommandStep();
  
  rl.question(PROMPTS.COMMAND_SEQUENCE, (answer: string) => {
    try {
      const commands = validateCommandSequence(answer);
      rover.executeCommands(commands);
      displayMissionComplete(rover.getPosition(), rover.getHeading(), rover.getMaxSize());
      askPlateauSize(); // Restart for next mission
    } catch (error: any) {
      displayError(error);
      askCommand();
    }
  });
};

// Start the application
const startApplication = (): void => {
  askPlateauSize();
};

// Export for testing purposes
export { rover, startApplication };

// Start the application if this file is run directly
if (require.main === module) {
  startApplication();
}
