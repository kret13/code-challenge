import { END_MATCH, START_CHAR, START_MATCH } from '../utils/constants';
import { isCharValid } from '../utils/validator';

type RowIndex = number;
type ColumnIndex = number;
export type Position = readonly [RowIndex, ColumnIndex];
export type Direction = 'RIGHT' | 'DOWN' | 'LEFT' | 'UP';

export const getCharAt = (grid: string[], columnIndex: number, rowIndex: number): string => {
  const char = grid[rowIndex]?.charAt(columnIndex);
  if (!isCharValid(char)) {
    throw new Error(
      `Invalid or inaccessible character '${char}' at position (${rowIndex}, ${columnIndex}). Ensure the path does not go out of bounds and only valid characters are used.`
    );
  }
  return char;
};

const directionOffsets: Record<Direction, Position> = {
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  UP: [0, -1],
};
export const getNextStep = (
  direction: Direction,
  currentPosition: Position,
  grid: string[]
): { nextChar: string; position: Position } => {
  const [offsetX, offsetY] = directionOffsets[direction];
  const [currentX, currentY] = currentPosition;
  const nextPosition: Position = [currentX + offsetX, currentY + offsetY];
  const nextChar = getCharAt(grid, nextPosition[0], nextPosition[1]);

  return { nextChar, position: nextPosition };
};

export const determineTurnDirection = (
  currentPosition: Position,
  grid: string[],
  lastDirection: Direction | null
): Direction => {
  const [rowIndex, columnIndex] = currentPosition;

  let candidates: [RowIndex, ColumnIndex, Direction][];
  if (lastDirection === 'LEFT' || lastDirection === 'RIGHT') {
    candidates = [
      [rowIndex, columnIndex - 1, 'UP'],
      [rowIndex, columnIndex + 1, 'DOWN'],
    ];
  } else if (lastDirection === 'UP' || lastDirection === 'DOWN') {
    candidates = [
      [rowIndex - 1, columnIndex, 'LEFT'],
      [rowIndex + 1, columnIndex, 'RIGHT'],
    ];
  } else {
    candidates = [
      [rowIndex + 1, columnIndex, 'RIGHT'],
      [rowIndex, columnIndex + 1, 'DOWN'],
      [rowIndex - 1, columnIndex, 'LEFT'],
      [rowIndex, columnIndex - 1, 'UP'],
    ];
  }

  const validDirections = candidates.filter(([cRowIndex, cColumnIndex]) => {
    const char = grid[cColumnIndex]?.charAt(cRowIndex);
    return isCharValid(char);
  });

  if (validDirections.length === 0) {
    throw new Error(
      `No valid direction found from position (${rowIndex}, ${columnIndex}). The path may be blocked or the grid is malformed.`
    );
  }
  if (validDirections.length > 1) {
    throw new Error(
      `Multiple possible directions (fork) found from position (${rowIndex}, ${columnIndex}). The path must not fork.`
    );
  }

  return validDirections[0][2];
};

export interface StartPositionResult {
  startingPoint: readonly [number, number];
}

export const findStartingPoint = (gridLines: string[]): StartPositionResult => {
  const allGridChars = gridLines.join('');
  const hasExactlyOneStartChar = START_MATCH.test(allGridChars);
  if (!hasExactlyOneStartChar) {
    throw new Error('Invalid grid: There must be exactly one start character (@) in the grid.');
  }
  const hasExactlyOneEndChar = END_MATCH.test(allGridChars);
  if (!hasExactlyOneEndChar) {
    throw new Error('Invalid grid: There must be exactly one end character (x) in the grid.');
  }
  for (let rowIndex = 0; rowIndex < gridLines.length; rowIndex++) {
    const columnIndex = gridLines[rowIndex].indexOf(START_CHAR);
    if (columnIndex !== -1) return { startingPoint: [columnIndex, rowIndex] };
  }

  throw new Error(
    'Start character (@) not found in any grid line. Please ensure the grid contains a start character.'
  );
};
