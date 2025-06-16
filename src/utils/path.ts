export const normalizeGridLines = (rawGrid: string): string[] => {
  const rows = rawGrid.split(/\r?\n/);
  const maxRowLength = Math.max(...rows.map((row) => row.length));
  return rows.map((row) => row.padEnd(maxRowLength, ' '));
};

export const extractUniqueLetters = (entries: string[]): string => {
  const unique = [...new Set(entries)].map((entry) => entry.split(';')[0]);
  return unique.join('');
};