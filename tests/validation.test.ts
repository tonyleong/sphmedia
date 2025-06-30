// validation.test.ts - Unit tests for validation functions

import {
  validateNumber,
  validateDirection,
  validateCommand,
  validatePlateauInput,
  validatePositionInput,
  validateCommandSequence,
  Direction,
  Command,
} from '../src/validation';

describe('Validation Module', () => {
  
  describe('validateNumber', () => {
    it('should validate positive numbers correctly', () => {
      expect(validateNumber('5', 'Test')).toBe(5);
      expect(validateNumber('0', 'Test')).toBe(0);
      expect(validateNumber('100', 'Test')).toBe(100);
    });

    it('should handle numbers with whitespace', () => {
      expect(validateNumber('  5  ', 'Test')).toBe(5);
      expect(validateNumber('\t10\n', 'Test')).toBe(10);
    });

    it('should throw error for empty or null values', () => {
      expect(() => validateNumber('', 'Test')).toThrow('❌ Test is required and cannot be empty');
      expect(() => validateNumber('   ', 'Test')).toThrow('❌ Test is required and cannot be empty');
      expect(() => validateNumber(undefined as any, 'Test')).toThrow('❌ Test is required and cannot be empty');
    });

    it('should throw error for non-numeric values', () => {
      expect(() => validateNumber('abc', 'Test')).toThrow("❌ Test must be a valid number. You entered: 'abc'");
      expect(() => validateNumber('5.5.5', 'Test')).toThrow("❌ Test must be a valid number. You entered: '5.5.5'");
    });

    it('should throw error for negative numbers', () => {
      expect(() => validateNumber('-5', 'Test')).toThrow('❌ Test must be non-negative (≥ 0). You entered: -5');
      expect(() => validateNumber('-1', 'Test')).toThrow('❌ Test must be non-negative (≥ 0). You entered: -1');
    });

    it('should accept decimal numbers', () => {
      expect(validateNumber('5.5', 'Test')).toBe(5.5);
      expect(validateNumber('0.1', 'Test')).toBe(0.1);
    });
  });

  describe('validateDirection', () => {
    it('should validate correct directions', () => {
      expect(validateDirection('N')).toBe('N');
      expect(validateDirection('E')).toBe('E');
      expect(validateDirection('S')).toBe('S');
      expect(validateDirection('W')).toBe('W');
    });

    it('should handle lowercase directions', () => {
      expect(validateDirection('n')).toBe('N');
      expect(validateDirection('e')).toBe('E');
      expect(validateDirection('s')).toBe('S');
      expect(validateDirection('w')).toBe('W');
    });

    it('should handle directions with whitespace', () => {
      expect(validateDirection('  N  ')).toBe('N');
      expect(validateDirection('\tE\n')).toBe('E');
    });

    it('should throw error for empty direction', () => {
      expect(() => validateDirection('')).toThrow('❌ Direction is required and cannot be empty');
      expect(() => validateDirection('   ')).toThrow('❌ Direction is required and cannot be empty');
      expect(() => validateDirection(undefined as any)).toThrow('❌ Direction is required and cannot be empty');
    });

    it('should throw error for invalid directions', () => {
      expect(() => validateDirection('X')).toThrow("❌ Invalid direction: 'X'. Please use one of: N, E, S, W");
      expect(() => validateDirection('North')).toThrow("❌ Invalid direction: 'NORTH'. Please use one of: N, E, S, W");
      expect(() => validateDirection('1')).toThrow("❌ Invalid direction: '1'. Please use one of: N, E, S, W");
    });
  });

  describe('validateCommand', () => {
    it('should validate correct commands', () => {
      expect(validateCommand('L')).toBe('L');
      expect(validateCommand('R')).toBe('R');
      expect(validateCommand('M')).toBe('M');
    });

    it('should throw error for invalid commands', () => {
      expect(() => validateCommand('X')).toThrow("❌ Invalid command: 'X'");
      expect(() => validateCommand('l')).toThrow("❌ Invalid command: 'l'");
      expect(() => validateCommand('1')).toThrow("❌ Invalid command: '1'");
      expect(() => validateCommand('')).toThrow("❌ Invalid command: ''");
    });
  });

  describe('validatePlateauInput', () => {
    it('should parse valid plateau input', () => {
      expect(validatePlateauInput('5,5')).toEqual(['5', '5']);
      expect(validatePlateauInput('10,20')).toEqual(['10', '20']);
      expect(validatePlateauInput('0,0')).toEqual(['0', '0']);
    });

    it('should handle input with spaces', () => {
      expect(validatePlateauInput('5, 5')).toEqual(['5', ' 5']);
      expect(validatePlateauInput(' 10 , 20 ')).toEqual([' 10 ', ' 20 ']);
    });

    it('should throw error for invalid format', () => {
      expect(() => validatePlateauInput('5')).toThrow("❌ Invalid format: '5'");
      expect(() => validatePlateauInput('5,5,5')).toThrow("❌ Invalid format: '5,5,5'");
      expect(() => validatePlateauInput('')).toThrow("❌ Invalid format: ''");
      expect(() => validatePlateauInput('5;5')).toThrow("❌ Invalid format: '5;5'");
    });
  });

  describe('validatePositionInput', () => {
    it('should parse valid position input', () => {
      expect(validatePositionInput('1,2,N')).toEqual(['1', '2', 'N']);
      expect(validatePositionInput('0,0,S')).toEqual(['0', '0', 'S']);
      expect(validatePositionInput('10,20,E')).toEqual(['10', '20', 'E']);
    });

    it('should handle input with spaces', () => {
      expect(validatePositionInput('1, 2, N')).toEqual(['1', ' 2', ' N']);
      expect(validatePositionInput(' 5 , 10 , W ')).toEqual([' 5 ', ' 10 ', ' W ']);
    });

    it('should throw error for invalid format', () => {
      expect(() => validatePositionInput('1,2')).toThrow("❌ Invalid format: '1,2'");
      expect(() => validatePositionInput('1,2,N,E')).toThrow("❌ Invalid format: '1,2,N,E'");
      expect(() => validatePositionInput('')).toThrow("❌ Invalid format: ''");
      expect(() => validatePositionInput('1;2;N')).toThrow("❌ Invalid format: '1;2;N'");
    });
  });

  describe('validateCommandSequence', () => {
    it('should validate correct command sequences', () => {
      expect(validateCommandSequence('LRM')).toEqual(['L', 'R', 'M']);
      expect(validateCommandSequence('LMLMLMLMM')).toEqual(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
      expect(validateCommandSequence('L')).toEqual(['L']);
      expect(validateCommandSequence('M')).toEqual(['M']);
    });

    it('should handle sequences with whitespace', () => {
      expect(validateCommandSequence('  LRM  ')).toEqual(['L', 'R', 'M']);
      expect(validateCommandSequence('\tLM\n')).toEqual(['L', 'M']);
    });

    it('should throw error for empty sequences', () => {
      expect(() => validateCommandSequence('')).toThrow('🎮 Command Input Error!');
      expect(() => validateCommandSequence('   ')).toThrow('🎮 Command Input Error!');
      expect(() => validateCommandSequence(undefined as any)).toThrow('🎮 Command Input Error!');
    });

    it('should throw error for invalid commands in sequence', () => {
      expect(() => validateCommandSequence('LXM')).toThrow('🎮 Command Sequence Error!');
      expect(() => validateCommandSequence('lrm')).toThrow('🎮 Command Sequence Error!');
      expect(() => validateCommandSequence('L1M')).toThrow('🎮 Command Sequence Error!');
      expect(() => validateCommandSequence('L M')).toThrow('🎮 Command Sequence Error!');
    });
  });
});
