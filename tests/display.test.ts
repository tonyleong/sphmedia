// display.test.ts - Unit tests for display functions

import {
  getDirectionName,
  displaySeparator,
  displayHeader,
  displayPlateauStep,
  displayRoverPositionStep,
  displayCommandStep,
  displayPlateauSuccess,
  displayRoverPositionSuccess,
  displayMissionComplete,
  displayError,
  PROMPTS
} from '../src/display';
import { Direction } from '../src/validation';

// Mock console.log to capture output
const mockConsoleLog = jest.fn();
console.log = mockConsoleLog;

describe('Display Module', () => {
  
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  describe('getDirectionName', () => {
    it('should return correct direction names', () => {
      expect(getDirectionName('N')).toBe('North');
      expect(getDirectionName('E')).toBe('East');
      expect(getDirectionName('S')).toBe('South');
      expect(getDirectionName('W')).toBe('West');
    });

    it('should handle all valid directions', () => {
      const directions: Direction[] = ['N', 'E', 'S', 'W'];
      const expectedNames = ['North', 'East', 'South', 'West'];
      
      directions.forEach((direction, index) => {
        expect(getDirectionName(direction)).toBe(expectedNames[index]);
      });
    });
  });

  describe('displaySeparator', () => {
    it('should display default number of stars', () => {
      displaySeparator();
      expect(mockConsoleLog).toHaveBeenCalledTimes(7);
      expect(mockConsoleLog).toHaveBeenCalledWith('⭐');
    });

    it('should display custom number of stars', () => {
      displaySeparator(3);
      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
      expect(mockConsoleLog).toHaveBeenCalledWith('⭐');
    });

    it('should handle zero stars', () => {
      displaySeparator(0);
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('should handle large number of stars', () => {
      displaySeparator(10);
      expect(mockConsoleLog).toHaveBeenCalledTimes(10);
    });
  });

  describe('displayHeader', () => {
    it('should display the application header', () => {
      displayHeader();
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "================================================================================================"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "🚀                           MARS ROVER SIMULATOR                           🚀"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });

    it('should call console.log correct number of times', () => {
      displayHeader();
      expect(mockConsoleLog).toHaveBeenCalledTimes(4); // 2 lines + title + empty line
    });
  });

  describe('displayPlateauStep', () => {
    it('should display plateau setup instructions', () => {
      displayPlateauStep();
      
      expect(mockConsoleLog).toHaveBeenCalledWith("📐 STEP 1: Define the Plateau");
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   The plateau is a rectangular grid where the rover will navigate."
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   Enter the maximum coordinates (width,height) - e.g., 5,5 creates a 6x6 grid (0-5)"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });
  });

  describe('displayRoverPositionStep', () => {
    it('should display rover positioning instructions', () => {
      displayRoverPositionStep();
      
      expect(mockConsoleLog).toHaveBeenCalledWith("🤖 STEP 2: Position the Mars Rover");
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   Place your rover on the plateau with starting coordinates and direction."
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   Format: x,y,direction (e.g., 1,2,N means position (1,2) facing North)"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   📍 Directions: N=North, E=East, S=South, W=West"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });
  });

  describe('displayCommandStep', () => {
    it('should display command instructions', () => {
      displayCommandStep();
      
      expect(mockConsoleLog).toHaveBeenCalledWith("🎮 STEP 3: Control the Mars Rover");
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   Send a sequence of commands to move your rover:"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   🔄 L = Turn Left    🔄 R = Turn Right    ⬆️  M = Move Forward"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "   Example: LMLMLMLMM (turn left, move, turn left, move, etc.)"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });
  });

  describe('displayPlateauSuccess', () => {
    it('should display plateau setup success message', () => {
      const maxSize = { x: 5, y: 5 };
      displayPlateauSuccess(maxSize);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "✅ Plateau set to 5x5 (coordinates: 0,0 to 5,5)"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });

    it('should handle different plateau sizes', () => {
      const maxSize = { x: 10, y: 20 };
      displayPlateauSuccess(maxSize);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "✅ Plateau set to 10x20 (coordinates: 0,0 to 10,20)"
      );
    });
  });

  describe('displayRoverPositionSuccess', () => {
    it('should display rover positioning success message', () => {
      const position = { x: 2, y: 3 };
      displayRoverPositionSuccess(position, 'E');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "✅ Rover positioned at (2,3) facing E"
      );
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });

    it('should handle different positions and directions', () => {
      const position = { x: 0, y: 0 };
      displayRoverPositionSuccess(position, 'N');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "✅ Rover positioned at (0,0) facing N"
      );
    });
  });

  describe('displayMissionComplete', () => {
    it('should display mission complete message with all details', () => {
      const position = { x: 1, y: 3 };
      const heading: Direction = 'N';
      const maxSize = { x: 5, y: 5 };
      
      displayMissionComplete(position, heading, maxSize);
      
      expect(mockConsoleLog).toHaveBeenCalledWith("");
      expect(mockConsoleLog).toHaveBeenCalledWith("🎉 MISSION COMPLETE!");
      expect(mockConsoleLog).toHaveBeenCalledWith("🤖 Mars Rover Final Position:");
      expect(mockConsoleLog).toHaveBeenCalledWith("   📍 Coordinates: (1, 3)");
      expect(mockConsoleLog).toHaveBeenCalledWith("   🧭 Direction: N (North)");
      expect(mockConsoleLog).toHaveBeenCalledWith("   🏔️  Plateau: 5x5");
      expect(mockConsoleLog).toHaveBeenCalledWith("🔄 Ready for next mission!");
      expect(mockConsoleLog).toHaveBeenCalledWith("💡 Tip: You can test different plateau sizes and rover positions");
      expect(mockConsoleLog).toHaveBeenCalledWith("⚠️  Press Ctrl + C to exit the simulator");
    });

    it('should include separator stars', () => {
      const position = { x: 1, y: 3 };
      const heading: Direction = 'S';
      const maxSize = { x: 5, y: 5 };
      
      displayMissionComplete(position, heading, maxSize);
      
      // Check that stars are displayed (5 times)
      const starCalls = mockConsoleLog.mock.calls.filter(call => call[0] === '⭐');
      expect(starCalls).toHaveLength(5);
    });
  });

  describe('displayError', () => {
    it('should display error message with retry prompt', () => {
      const error = new Error('Test error message');
      displayError(error);
      
      expect(mockConsoleLog).toHaveBeenCalledWith("");
      expect(mockConsoleLog).toHaveBeenCalledWith('Test error message');
      expect(mockConsoleLog).toHaveBeenCalledWith("");
      expect(mockConsoleLog).toHaveBeenCalledWith("🔄 Let's try again...");
      expect(mockConsoleLog).toHaveBeenCalledWith("");
    });

    it('should handle error objects with message property', () => {
      const error = { message: 'Custom error' };
      displayError(error);
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Custom error');
    });
  });

  describe('PROMPTS', () => {
    it('should contain all required prompts', () => {
      expect(PROMPTS.PLATEAU_SIZE).toBe("🏔️  Enter plateau size (width,height): ");
      expect(PROMPTS.ROVER_POSITION).toBe("🚀 Enter rover's starting position (x,y,direction): ");
      expect(PROMPTS.COMMAND_SEQUENCE).toBe("🎯 Enter command sequence: ");
    });

    it('should have consistent emoji usage', () => {
      expect(PROMPTS.PLATEAU_SIZE).toMatch(/🏔️/);
      expect(PROMPTS.ROVER_POSITION).toMatch(/🚀/);
      expect(PROMPTS.COMMAND_SEQUENCE).toMatch(/🎯/);
    });
  });
});
