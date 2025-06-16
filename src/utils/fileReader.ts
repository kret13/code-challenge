import fs from 'fs/promises';
import path from 'path';

export const readFileFrom = async (
  fileName: string,
  baseDir: string = 'tests/data'
): Promise<string> => {
  try {
    const filePath = path.resolve(process.cwd(), baseDir, fileName);
    return fs.readFile(filePath, 'utf8');
  } catch {
    throw new Error(`Unable to read file "${fileName}" from directory "${baseDir}`);
  }
};

export const readFileFromTest = async (fileName: string): Promise<string> => readFileFrom(fileName);
