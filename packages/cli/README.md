# Merkato UI CLI

A CLI tool for easily adding Merkato UI components to your React projects. Merkato UI is a React component library that provides a set of reusable components for building beautiful ecommerce and marketplace applications.

## Features

- 🚀 Easily add pre-built UI components to your project
- 🧩 Based on [shadcn/ui](https://ui.shadcn.com/) architecture
- 🎨 Fully customizable components
- 📦 Optimized for your bundle size (only import what you use)
- 🔄 Seamless integration with Next.js, React, and other frameworks

## Prerequisites

- Node.js 20 or higher
- A React project (works great with Next.js)
- shadcn/ui setup in your project (components will use your theme)

## Installation

```bash
# You don't need to install the package locally
# Just run it directly with npx
```

## Usage

To add components to your project:

```bash
npx merkatoui add <component-name> [<component-name>...]
```

### Examples

Add a single component:

```bash
npx merkatoui add banner
```

Add multiple components at once:

```bash
npx merkatoui add banner product-card price
```


> **Note**: More components are being added regularly. Check our [website](https://merkatoui.com) for the complete and up-to-date list.

## How It Works

The CLI tool fetches component definitions from the Merkato UI registry and uses shadcn's CLI to add them to your project. This means all components:

1. Are added directly to your codebase (not as dependencies)
2. Use your project's existing theme and styling
3. Can be fully customized to match your needs
4. Follow best practices for React and TypeScript

## Integration with Shadcn UI

Merkato UI builds upon the excellent architecture provided by [shadcn/ui](https://ui.shadcn.com/). All our components:

- Follow the same patterns and best practices
- Use the same styling system
- Can be combined seamlessly with standard shadcn/ui components

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/yourusername/merkatoui/blob/main/CONTRIBUTING.md) for more details.

## License

MIT © David Dias

---

Built with ♥ by the Merkato UI team.
