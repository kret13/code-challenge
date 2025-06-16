import {
  getCharAt,
  getNextStep,
  determineTurnDirection,
  Position,
  Direction,
} from '../../src/core/pathNavigator';

const grid = [
  '   @--A--x',
  '          ',
  '  x-B-+   ',
  '      |   ',
  '      @   ',
  '          ',
  '       |  ',
  '      -+  ',
  '       |  ',
];

describe('getCharAt', () => {
  it('returns the correct character at given coordinates', () => {
    expect(getCharAt(grid, 9, 0)).toBe('x'); // 'x'
    expect(getCharAt(grid, 2, 2)).toBe('x'); // 'x'
    expect(getCharAt(grid, 4, 2)).toBe('B'); // 'B'
    expect(getCharAt(grid, 6, 2)).toBe('+'); // '+'
    expect(getCharAt(grid, 6, 3)).toBe('|'); // '|'
  });

  it('throws if character is invalid or out of bounds', () => {
    expect(() => getCharAt(grid, 10, 10)).toThrow();
    expect(() => getCharAt(['   '], 1, 0)).toThrow();
    expect(() => getCharAt(grid, 0, 1)).toThrow(); // empty space
  });
});

describe('getNextStep', () => {
  it('returns the next character and position for RIGHT', () => {
    const start: Position = [4, 0]; // '@'
    const { nextChar, position } = getNextStep('RIGHT', start, grid);
    expect(nextChar).toBe('-');
    expect(position).toEqual([5, 0]);
  });

  it('returns the next character and position for DOWN', () => {
    const start: Position = [6, 2]; // '+'
    const { nextChar, position } = getNextStep('DOWN', start, grid);
    expect(nextChar).toBe('|');
    expect(position).toEqual([6, 3]);
  });
});

describe('determineTurnDirection', () => {
  it('finds the correct turn direction from a corner', () => {
    // From (6,2) going UP, should turn LEFT
    expect(determineTurnDirection([6, 2], grid, 'UP')).toEqual('LEFT');
  });

  it('throws if no valid direction is found', () => {
    expect(() => determineTurnDirection([0, 2], grid, 'LEFT')).toThrow();
  });

  it('throws if multiple valid directions (fork) are found', () => {
    const forkGrid = [
      '   @--A--x',
      '      |   ',
      '  x-B-+   ',
      '      |   ',
      '      @   ',
      '          ',
      '       |  ',
      '      -+  ',
      '       |  ',
    ];
    // From (6,2) with no previous direction, should fork
    expect(() => determineTurnDirection([6, 2], forkGrid, null)).toThrow(/fork/i);
  });
});
