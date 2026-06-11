# Build Instructions

## Prerequisites
- **Runtime**: Node.js 18+
- **Package Manager**: npm 9+
- **OS**: macOS, Linux, or Windows (with terminal supporting ANSI colors)
- **Terminal**: Minimum 80x24, recommended 120x40

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build (Compile TypeScript)
```bash
npm run build
```

### 3. Run the Game
```bash
# Development (direct from TypeScript):
npm run dev

# Production (from compiled JS):
npm start
```

### 4. Verify Build Success
- **Expected Output**: `dist/` directory with compiled `.js` and `.d.ts` files
- **Entry Point**: `dist/index.js`
- **No errors** in compilation output

## Troubleshooting

### Build fails with type errors
- Run `npm run typecheck` to see detailed type errors
- Ensure all dependencies are installed (`npm install`)

### Game doesn't render properly
- Ensure terminal supports ANSI escape codes
- Try resizing terminal to at least 80x24
- Check that `blessed` is installed correctly
