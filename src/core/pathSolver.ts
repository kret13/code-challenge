import { logger } from '../utils/logger';
import {
  getNextStep,
  determineTurnDirection,
  Direction,
  Position,
  findStartingPoint,
} from './pathNavigator';
import { readFileFromTest } from '../utils/fileReader';
import { extractUniqueLetters, normalizeGridLines } from '../utils/path';
import { isLetter } from '../utils/validator';
import { END_CHAR, INTERSECTION_CHAR } from '../utils/constants';

interface PathResult {
  letters: string;
  path: string;
}

export const solvePathFromFile = async (
  inputFileName = 'success-basic.txt',
  debugDelayMs = 0
): Promise<PathResult> => {
  const rawInput = await readFileFromTest(inputFileName);
  const grid = normalizeGridLines(rawInput);
  const { startingPoint } = findStartingPoint(grid);

  let direction: Direction | null = null;
  let position: Position = startingPoint;

  const letters: string[] = [];
  const path: string[] = ['@'];

  mainLoop: while (true) {
    direction = determineTurnDirection(position, grid, direction);
    logger.info(`Changing direction to -> ${direction}`);

    while (true) {
      if (debugDelayMs > 0) await delay(debugDelayMs);
      try {
        const { nextChar, position: newPos } = getNextStep(direction, position, grid);
        position = newPos;
        logger.info(`At [${position}], found '${nextChar}'`);
        path.push(nextChar);

        if (isLetter(nextChar)) {
          letters.push(`${nextChar};${position.toString()}`);
        }

        if (nextChar === END_CHAR) {
          break mainLoop; // End of path reached, exit all loops
        }
        if (nextChar === INTERSECTION_CHAR) {
          break; // Intersection found, exit inner loop to determine new direction
        }
      } catch (err) {
        break;
      }
    }
  }

  return {
    letters: extractUniqueLetters(letters),
    path: path.join(''),
  };
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
