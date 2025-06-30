// validation.ts - Input validation utilities

// Define specific types for better type safety
export type Direction = "N" | "E" | "S" | "W";
export type Command = "L" | "R" | "M";

export interface Position {
  x: number;
  y: number;
}

export const direction: readonly Direction[] = ["N", "E", "S", "W"];

// Validation helper functions
export const validateNumber = (value: string, name: string): number => {
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

export const validateDirection = (dir: string): Direction => {
  if (!dir?.trim()) {
    throw Error("❌ Direction is required and cannot be empty");
  }
  const cleanDir = dir.trim().toUpperCase();
  if (!direction.includes(cleanDir as Direction)) {
    throw Error(`❌ Invalid direction: '${cleanDir}'. Please use one of: ${direction.join(', ')}`);
  }
  return cleanDir as Direction;
};

export const validateCommand = (command: string): Command => {
  const validCommands: Command[] = ["L", "R", "M"];
  if (!validCommands.includes(command as Command)) {
    throw Error(`❌ Invalid command: '${command}'\n   ✅ Valid commands: L (turn Left), R (turn Right), M (Move forward)`);
  }
  return command as Command;
};

export const validatePlateauInput = (input: string): [string, string] => {
  const parts = input.split(",");
  if (parts.length !== 2) {
    throw Error(`❌ Invalid format: '${input}'\n   Expected exactly 2 parts separated by comma: width,height\n   Example: 5,5`);
  }
  return [parts[0], parts[1]];
};

export const validatePositionInput = (input: string): [string, string, string] => {
  const parts = input.split(",");
  if (parts.length !== 3) {
    throw Error(`❌ Invalid format: '${input}'\n   Expected exactly 3 parts separated by commas: x,y,direction\n   Example: 1,2,N`);
  }
  return [parts[0], parts[1], parts[2]];
};

export const validateCommandSequence = (fullCommand: string): Command[] => {
  if (!fullCommand?.trim()) {
    throw Error("🎮 Command Input Error!\n   Please enter a command sequence (example: LMLMLMLMM)\n   ❌ Empty commands are not allowed");
  }
  
  const cleanCommand = fullCommand.trim();
  const commands: Command[] = [];
  
  try {
    for (let i = 0; i < cleanCommand.length; i++) {
      const command = validateCommand(cleanCommand[i]);
      commands.push(command);
    }
    return commands;
  } catch (error: any) {
    throw Error(`🎮 Command Sequence Error!\n   Input: '${cleanCommand}'\n   ${error.message}`);
  }
};
