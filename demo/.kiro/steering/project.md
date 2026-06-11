# Project Overview

This is a modern frontend project built with Vite, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Vite** — build tool and dev server
- **React 18+** — UI library using functional components and hooks
- **TypeScript** — strict typing throughout the codebase
- **Tailwind CSS** — utility-first styling, no CSS modules or custom CSS unless necessary

## Project Structure

```
src/
  assets/        # Static assets (images, fonts, etc.)
  components/    # Reusable UI components
  hooks/         # Custom React hooks
  pages/         # Page-level components (if using routing)
  types/         # Shared TypeScript types and interfaces
  utils/         # Helper functions and utilities
  App.tsx
  main.tsx
```

## Code Conventions

### TypeScript
- Enable strict mode (`"strict": true` in tsconfig)
- Prefer `interface` over `type` for object shapes
- Always type component props — avoid `any`
- Use explicit return types on functions when not obvious

### React
- Use functional components only — no class components
- Co-locate component logic with the component file
- Keep components small and focused
- Use named exports for components, not default exports (except pages/routes)
- Prefer `const` arrow functions for components:
  ```tsx
  export const Button = ({ label }: ButtonProps) => {
    return <button>{label}</button>
  }
  ```

### Tailwind CSS
- Use Tailwind utility classes directly in JSX — avoid inline styles
- Extract repeated class combinations into a component rather than using `@apply`
- Use `cn()` or `clsx()` for conditional class merging
- Respect the configured theme — don't hardcode colors or spacing values that exist in the theme

### File Naming
- Components: `PascalCase.tsx` (e.g., `UserCard.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useAuth.ts`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` or co-located in the relevant file

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Key Principles

- Prefer composition over inheritance
- Keep state as local as possible — lift only when necessary
- Avoid prop drilling more than 2 levels deep — use context or a state manager
- Accessibility: use semantic HTML elements and ARIA attributes where appropriate
