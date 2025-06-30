// rover-logic.test.ts - Unit tests for Mars Rover logic

import { MarsRover } from '../src/rover-logic';
import { Direction, Command } from '../src/validation';

describe('MarsRover', () => {
  let rover: MarsRover;

  beforeEach(() => {
    rover = new MarsRover();
  });

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
      expect(rover.getMaxSize()).toEqual({ x: 0, y: 0 });
      expect(rover.getHeading()).toBe('N');
    });
  });

  describe('setSize', () => {
    it('should set plateau size correctly', () => {
      rover.setSize(5, 5);
      expect(rover.getMaxSize()).toEqual({ x: 5, y: 5 });
    });

    it('should handle different plateau sizes', () => {
      rover.setSize(10, 20);
      expect(rover.getMaxSize()).toEqual({ x: 10, y: 20 });
      
      rover.setSize(0, 0);
      expect(rover.getMaxSize()).toEqual({ x: 0, y: 0 });
    });
  });

  describe('setPosition', () => {
    beforeEach(() => {
      rover.setSize(5, 5);
    });

    it('should set rover position and heading correctly', () => {
      rover.setPosition(2, 3, 'E');
      expect(rover.getPosition()).toEqual({ x: 2, y: 3 });
      expect(rover.getHeading()).toBe('E');
    });

    it('should handle all valid directions', () => {
      const directions: Direction[] = ['N', 'E', 'S', 'W'];
      
      directions.forEach(direction => {
        rover.setPosition(1, 1, direction);
        expect(rover.getHeading()).toBe(direction);
      });
    });
  });

  describe('execute - Turn Commands', () => {
    beforeEach(() => {
      rover.setSize(5, 5);
      rover.setPosition(2, 2, 'N');
    });

    describe('Left Turn (L)', () => {
      it('should turn left correctly from all directions', () => {
        // N -> W
        rover.setPosition(2, 2, 'N');
        rover.execute('L');
        expect(rover.getHeading()).toBe('W');

        // W -> S
        rover.execute('L');
        expect(rover.getHeading()).toBe('S');

        // S -> E
        rover.execute('L');
        expect(rover.getHeading()).toBe('E');

        // E -> N
        rover.execute('L');
        expect(rover.getHeading()).toBe('N');
      });

      it('should not change position when turning', () => {
        const initialPosition = rover.getPosition();
        rover.execute('L');
        expect(rover.getPosition()).toEqual(initialPosition);
      });
    });

    describe('Right Turn (R)', () => {
      it('should turn right correctly from all directions', () => {
        // N -> E
        rover.setPosition(2, 2, 'N');
        rover.execute('R');
        expect(rover.getHeading()).toBe('E');

        // E -> S
        rover.execute('R');
        expect(rover.getHeading()).toBe('S');

        // S -> W
        rover.execute('R');
        expect(rover.getHeading()).toBe('W');

        // W -> N
        rover.execute('R');
        expect(rover.getHeading()).toBe('N');
      });

      it('should not change position when turning', () => {
        const initialPosition = rover.getPosition();
        rover.execute('R');
        expect(rover.getPosition()).toEqual(initialPosition);
      });
    });
  });

  describe('execute - Move Command (M)', () => {
    beforeEach(() => {
      rover.setSize(5, 5);
    });

    it('should move forward correctly in all directions', () => {
      // Move North
      rover.setPosition(2, 2, 'N');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 2, y: 3 });

      // Move East
      rover.setPosition(2, 2, 'E');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 3, y: 2 });

      // Move South
      rover.setPosition(2, 2, 'S');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 2, y: 1 });

      // Move West
      rover.setPosition(2, 2, 'W');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
    });

    it('should not change heading when moving', () => {
      rover.setPosition(2, 2, 'N');
      rover.execute('M');
      expect(rover.getHeading()).toBe('N');
    });
  });

  describe('Boundary Checking', () => {
    beforeEach(() => {
      rover.setSize(5, 5);
    });

    it('should prevent moving below minimum boundaries', () => {
      // Test X boundary
      rover.setPosition(0, 2, 'W');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 0, y: 2 });

      // Test Y boundary
      rover.setPosition(2, 0, 'S');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 2, y: 0 });
    });

    it('should prevent moving beyond maximum boundaries', () => {
      // Test X boundary
      rover.setPosition(5, 2, 'E');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 5, y: 2 });

      // Test Y boundary
      rover.setPosition(2, 5, 'N');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 2, y: 5 });
    });

    it('should allow movement within boundaries', () => {
      rover.setPosition(1, 1, 'N');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 1, y: 2 });

      rover.setPosition(1, 1, 'E');
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 2, y: 1 });
    });
  });

  describe('executeCommands', () => {
    beforeEach(() => {
      rover.setSize(5, 5);
      rover.setPosition(1, 2, 'N');
    });

    it('should execute a sequence of commands correctly', () => {
      const commands: Command[] = ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'];
      rover.executeCommands(commands);
      
      expect(rover.getPosition()).toEqual({ x: 1, y: 3 });
      expect(rover.getHeading()).toBe('N');
    });

    it('should handle empty command sequence', () => {
      const initialPosition = rover.getPosition();
      const initialHeading = rover.getHeading();
      
      rover.executeCommands([]);
      
      expect(rover.getPosition()).toEqual(initialPosition);
      expect(rover.getHeading()).toBe(initialHeading);
    });

    it('should execute complex movement patterns', () => {
      // Test case: MMRMMRMRRM starting from (1,2,N)
      // M: (1,3,N), M: (1,4,N), R: (1,4,E), M: (2,4,E), M: (3,4,E)
      // R: (3,4,S), M: (3,3,S), R: (3,3,W), R: (3,3,N), M: (3,4,N)
      const commands: Command[] = ['M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'];
      rover.executeCommands(commands);

      expect(rover.getPosition()).toEqual({ x: 3, y: 4 });
      expect(rover.getHeading()).toBe('N');
    });
  });

  describe('reset', () => {
    it('should reset rover to initial state', () => {
      // Set up rover with custom state
      rover.setSize(10, 10);
      rover.setPosition(5, 5, 'E');
      rover.execute('M');

      // Reset
      rover.reset();

      // Check if back to initial state
      expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
      expect(rover.getMaxSize()).toEqual({ x: 0, y: 0 });
      expect(rover.getHeading()).toBe('N');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero-sized plateau', () => {
      rover.setSize(0, 0);
      rover.setPosition(0, 0, 'N');

      // Any movement should keep rover at (0,0)
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
    });

    it('should handle single-cell plateau', () => {
      rover.setSize(1, 1);
      rover.setPosition(0, 0, 'N');

      // Movement should be limited to the single cell
      rover.execute('M');
      expect(rover.getPosition()).toEqual({ x: 0, y: 1 });

      rover.execute('M'); // Should stay at boundary
      expect(rover.getPosition()).toEqual({ x: 0, y: 1 });
    });
  });
});
