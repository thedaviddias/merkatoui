# Merkato UI

<p align="center">
  <strong>Beautiful UI components for ecommerce and marketplace applications</strong>
</p>

<p align="center">
  <a href="https://merkatoui.com">Website</a> ·
  <a href="https://merkatoui.com/docs">Documentation</a> ·
  <a href="https://merkatoui.com/docs/components">Components</a> ·
  <a href="https://github.com/Merkato-UI/merkatoui/blob/main/.github/CONTRIBUTING.md">Contributing</a>
</p>

Merkato UI is a collection of reusable React components specifically designed for building modern ecommerce and marketplace applications. Powered by Tailwind CSS and following the shadcn/ui architecture, our components aim to streamline the development of ecommerce interfaces.

## Features

- 🛍️ **Ecommerce-focused**: Specialized components for building marketplace applications
- 🧩 **Based on shadcn/ui**: Building on a proven component architecture
- 🎨 **Fully customizable**: Design components to match your brand
- 📦 **Optimized**: Streamlined components with performance in mind
- 🔄 **Framework agnostic**: Compatible with Next.js, React, and other frameworks
- 🌙 **Dark mode support**: Built with theming capabilities for light and dark modes

## Getting Started

### Using the Merkato UI CLI

The easiest way to add Merkato UI components to your project is using our CLI:

```bash
# Add a single component
npx merkatoui add banner

# Add multiple components at once
npx merkatoui add banner product-card price
```

### Using shadcn/ui CLI directly

You can also install Merkato UI components using the shadcn/ui CLI directly by pointing to our component registry:

```bash
# Make sure you have shadcn/ui installed
npx shadcn-ui@latest init

# Add a component from Merkato UI registry
npx shadcn-ui@latest add --from=https://merkatoui.com/r/banner.json

# You can also add multiple components
npx shadcn-ui@latest add --from=https://merkatoui.com/r/product-card.json
npx shadcn-ui@latest add --from=https://merkatoui.com/r/price.json
```

This method is useful if you're already using shadcn/ui in your project and want to integrate Merkato UI components into your existing workflow.

## Component Development

Merkato UI is in active development. We're currently working on a range of specialized components for ecommerce applications, including:

- Product display components
- Cart and checkout interfaces
- Pricing and promotion elements
- Marketplace-specific navigation elements
- User review and feedback systems

Check back soon as we release our first set of production-ready components!

## Integration with Shadcn UI

Merkato UI builds upon the architecture provided by [shadcn/ui](https://ui.shadcn.com/). Our components:

- Follow the same patterns and best practices
- Use the same styling system
- Can be combined seamlessly with standard shadcn/ui components

This means if you're already using shadcn/ui, integrating Merkato UI components will feel familiar.

## Project Structure

```
merkatoui/
├── apps/           # Demo applications and documentation site
├── packages/       # Core packages including the CLI tool
│   ├── cli/        # The npm-published CLI for adding components
│   ├── shadcn-ui/  # shadcn component configurations
│   └── typescript/ # TypeScript configurations
└── components/             # The UI components
```

## Contributing

We welcome contributions! Whether it's adding new components, improving existing ones, or fixing bugs, your help is appreciated.

See our [Contributing Guide](https://github.com/Merkato-UI/merkatoui/blob/main/.github/CONTRIBUTING.md) for more details on how to get started.

## License

MIT © David Dias

---

<p align="center">
  Built with ♥ by the Merkato UI team.
</p>
