import { solvePathFromFile } from '../src/core/pathSolver';

describe('solvePathFromFile valid path scenarios', () => {
  it('should correctly parse success-basic.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-basic.txt');
    expect(letters).toBe('ACB');
    expect(path).toBe('@---A---+|C|+---+|+-B-x');
  });

  it('should correctly parse success-letters-on-turns.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-letters-on-turns.txt');
    expect(letters).toBe('ACB');
    expect(path).toBe('@---A---+|||C---+|+-B-x');
  });

  it('should correctly parse success-no-double.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-no-double.txt');
    expect(letters).toBe('GOONIES');
    expect(path).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
  });

  it('should correctly parse success-straight-through-intersection.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-straight-through-intersection.txt');
    expect(letters).toBe('ABCD');
    expect(path).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
  });

  it('should correctly parse success-ignore-after-end.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-ignore-after-end.txt');
    expect(letters).toBe('AB');
    expect(path).toBe('@-A--+|+-B--x');
  });

  it('should correctly parse success-keep-direction.txt', async () => {
    const { letters, path } = await solvePathFromFile('success-keep-direction.txt');
    expect(letters).toBe('BLAH');
    expect(path).toBe('@B+++B|+-L-+A+++A-+Hx');
  });
});

describe('solvePathFromFile error handling', () => {
  it('should throw correct error message for broken path', async () => {
    await expect(solvePathFromFile('error-broken.txt')).rejects.toThrow('No valid direction found from position (8, 1). The path may be blocked or the grid is malformed.');
  });

  it('should throw correct error message for fake turn', async () => {
    await expect(solvePathFromFile('error-fake-turn.txt')).rejects.toThrow('No valid direction found from position (6, 0). The path may be blocked or the grid is malformed.');
  });

  it('should throw correct error message for fork in path', async () => {
    await expect(solvePathFromFile('error-fork.txt')).rejects.toThrow('Multiple possible directions (fork) found from position (10, 2). The path must not fork.');
  });

  it('should throw correct error message for missing end', async () => {
    await expect(solvePathFromFile('error-missingEnd.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one end character (x) in the grid.'
    );
  });

  it('should throw correct error message for missing start', async () => {
    await expect(solvePathFromFile('error-missingStart.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one start character (@) in the grid.'
    );
  });

  it('should throw correct error message for multiple endings', async () => {
    await expect(solvePathFromFile('error-multipleEnding.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one end character (x) in the grid.'
    );
  });

  it('should throw correct error message for multiple starts (case 1)', async () => {
    await expect(solvePathFromFile('error-multipleStart1.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one start character (@) in the grid.'
    );
  });

  it('should throw correct error message for multiple starts (case 2)', async () => {
    await expect(solvePathFromFile('error-multipleStart2.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one start character (@) in the grid.'
    );
  });

  it('should throw correct error message for multiple starts (case 3)', async () => {
    await expect(solvePathFromFile('error-multipleStart3.txt')).rejects.toThrow(
      'Invalid grid: There must be exactly one start character (@) in the grid.'
    );
  });
});
