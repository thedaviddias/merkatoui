# UI Component Generator

This generator creates a new UI component package in the `ui` directory.

## Usage

```bash
npx turbo gen ui-component
```

## Prompts

- **Component Name**: The name of the component in PascalCase (e.g., Button, Dialog, Card)
- **Description**: A brief description of the component
- **Has Icon**: Whether the component uses icons from lucide-react

## Generated Files

The generator creates a new directory in the `ui` folder with the following structure:

```
ui/[componentname]/
├── package.json
├── tsconfig.json
└── index.tsx
```

## Component Structure

The generated component follows a clean and minimal pattern:

- JSDoc documentation for components and props
- Simple TypeScript typing for all components and props
- Optional icon support
- Consistent styling using the `cn` utility
