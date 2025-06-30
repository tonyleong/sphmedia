// rover-logic.ts - Mars Rover core logic

import { Direction, Command, Position } from './validation';

// Direction movement map for cleaner movement logic
const directionMovement: Record<Direction, Position> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const direction: readonly Direction[] = ["N", "E", "S", "W"];

// Mars Rover state management
export class MarsRover {
  private position: Position = { x: 0, y: 0 };
  private maxSize: Position = { x: 0, y: 0 };
  private heading: Direction = "N";

  // Getters for current state
  getPosition(): Position {
    return { ...this.position };
  }

  getMaxSize(): Position {
    return { ...this.maxSize };
  }

  getHeading(): Direction {
    return this.heading;
  }

  // Set plateau size
  setSize(width: number, height: number): void {
    this.maxSize.x = width;
    this.maxSize.y = height;
  }

  // Set rover position and heading
  setPosition(x: number, y: number, heading: Direction): void {
    this.position.x = x;
    this.position.y = y;
    this.heading = heading;
  }

  // Move rover with boundary checking
  private move(deltaX: number = 0, deltaY: number = 0): void {
    let newX = this.position.x + deltaX;
    let newY = this.position.y + deltaY;
    
    // Boundary checking
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > this.maxSize.x) newX = this.maxSize.x;
    if (newY > this.maxSize.y) newY = this.maxSize.y;
    
    this.position.x = newX;
    this.position.y = newY;
  }

  // Execute a single command
  execute(command: Command): void {
    const index = direction.indexOf(this.heading);

    switch (command) {
      case "L":
        this.heading = index === 0 ? direction[direction.length - 1] : direction[index - 1];
        break;
      case "R":
        this.heading = index === direction.length - 1 ? direction[0] : direction[index + 1];
        break;
      case "M":
        const movement = directionMovement[this.heading];
        this.move(movement.x, movement.y);
        break;
      default:
        throw Error(
          `🤖 Mars Rover Command Error!\n   Invalid command: '${command}'\n   ✅ Valid commands: L (turn Left), R (turn Right), M (Move forward)`
        );
    }
  }

  // Execute a sequence of commands
  executeCommands(commands: Command[]): void {
    for (const command of commands) {
      this.execute(command);
    }
  }

  // Reset rover to initial state
  reset(): void {
    this.position = { x: 0, y: 0 };
    this.maxSize = { x: 0, y: 0 };
    this.heading = "N";
  }
}
