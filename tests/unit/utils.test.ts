import { findStartingPoint } from "../../src/core/pathNavigator";
import { normalizeGridLines } from "../../src/utils/path";
import { extractUniqueLetters } from "../../src/utils/path";
import { isCharValid, isLetter } from "../../src/utils/validator";

describe('normalizeGridLines', () => {
  it('pads all rows to the length of the longest row', () => {
    const rawGrid = [
      'ABC',
      'DE',
      'F'
    ].join('\n');
    const result = normalizeGridLines(rawGrid);
    expect(result).toEqual([
      'ABC',
      'DE ',
      'F  '
    ]);
  });
});

describe('extractUniqueLetters', () => {
  it('returns unique letters in order of first appearance', () => {
    expect(extractUniqueLetters(['A;1,1', 'B;2,2', 'A;3,3'])).toBe('ABA');
    expect(extractUniqueLetters(['X;0,0', 'Y;1,1', 'Z;2,2'])).toBe('XYZ');
    expect(extractUniqueLetters([])).toBe('');
  });
});

describe('isCharValid', () => {
  it('returns true for valid path characters', () => {
    expect(isCharValid('A')).toBe(true);
    expect(isCharValid('Z')).toBe(true);
    expect(isCharValid('x')).toBe(true);
    expect(isCharValid('+')).toBe(true);
    expect(isCharValid('|')).toBe(true);
    expect(isCharValid('-')).toBe(true);
  });

  it('returns false for invalid characters', () => {
    expect(isCharValid(' ')).toBe(false);
    expect(isCharValid('1')).toBe(false);
    expect(isCharValid('@')).toBe(false); // '@' is start, not a path char
    expect(isCharValid('!')).toBe(false);
    expect(isCharValid('a')).toBe(false);
  });
});

describe('isLetter', () => {
  it('returns true for uppercase letters', () => {
    expect(isLetter('A')).toBe(true);
    expect(isLetter('Z')).toBe(true);
  });

  it('returns false for non-letters', () => {
    expect(isLetter('x')).toBe(false);
    expect(isLetter('+')).toBe(false);
    expect(isLetter('-')).toBe(false);
    expect(isLetter('|')).toBe(false);
    expect(isLetter(' ')).toBe(false);
    expect(isLetter('a')).toBe(false);
    expect(isLetter('1')).toBe(false);
  });
});

describe('findStartingPoint', () => {
  it('finds the correct starting point', () => {
    const grid = [
      '   @--A--x',
      '          ',
      '  C-B-+   ',
    ];
    expect(findStartingPoint(grid)).toEqual({ startingPoint: [3, 0] });
  });

  it('throws if there is no start character', () => {
    const grid = [
      '   ---A--x',
      '          ',
      '  x-B-+   ',
    ];
    expect(() => findStartingPoint(grid)).toThrow(/start character/i);
  });

  it('throws if there is more than one start character', () => {
    const grid = [
      '   @--A--x',
      '   @      ',
      '  x-B-+   ',
    ];
    expect(() => findStartingPoint(grid)).toThrow(/one start character/i);
  });

  it('throws if there is no end character', () => {
    const grid = [
      '   @--A---',
      '          ',
      '  C-B-+   ',
    ];
    expect(() => findStartingPoint(grid)).toThrow(/one end character/i);
  });

  it('throws if there is more than one end character', () => {
    const grid = [
      '   @--A--x',
      '      x   ',
      '  x-B-+   ',
    ];
    expect(() => findStartingPoint(grid)).toThrow(/one end character/i);
  });
});
