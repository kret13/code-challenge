# Code Challenge

## Usage

### 1. Prepare Your Input File

Place your grid in the `tests/data/input.txt` file.  

### 2. Run the Application

To build and run the app with the default input file (`input.txt`):

```sh
npm run build      # Compile TypeScript to JavaScript
npm start          # Run the application
```

### 3. Use a Custom Input File

To use a different input file, open `src/main.ts` and update the filename:

```typescript
const { letters, path } = await solvePathFromFile('your-file.txt');
```

Save your changes, then run:

```sh
npm start
```

### 4. Development Mode

To run the app in development mode with automatic reloads:

```sh
npm run dev
```