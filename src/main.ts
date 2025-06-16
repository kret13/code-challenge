import { logger } from './utils/logger';
import { solvePathFromFile } from './core/pathSolver';

const main = async () => {
  const { letters, path } = await solvePathFromFile('input.txt');
  logger.warn(`Collected letters: "${letters}"`);
  logger.warn(`Full path taken: "${path}"`);
};

main();
