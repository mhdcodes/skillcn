# skillcn

[![Version][version-badge]][npm]
[![Downloads][downloads-badge]][npm]
[![Github Actions][github-actions-badge]][github-actions]
[![Make a PR][makepr-badge]][makepr]
[![Typescript][typescript-badge]][npm]
[![Formatted with Biome][biome-badge]][biome]

A community-driven library of reusable, modular agent **Skills** for AI agents and automation workflows.

## What are Skills?

Skills are self-contained recipes that give AI agents specific capabilities:

- 📧 **Email handling** - Send, parse, and manage emails
- 📊 **Data processing** - Transform, analyze, and visualize data
- 🌐 **Web interactions** - Scrape, fetch, and interact with websites
- 📝 **Document generation** - Create PDFs, Word docs, presentations
- 🔍 **Search & retrieval** - Query databases, APIs, and knowledge bases
- And many more...

Each Skill is a ready-to-use component that you can install and integrate into your agent workflows with a single command.

## Install

Install a skill with your preferred package manager:

**Using PNPM:**

```bash
pnpm dlx skillcn add [skill]
```

**Using Bun:**

```bash
bunx --bun skillcn add [skill]
```

**Using NPM:**

```bash
npx skillcn add [skill]
```

**Using Yarn:**

```bash
yarn skillcn add [skill]
```

### Usage Examples

**Install a single skill:**

```bash
npx skillcn add frontend-design
```

**Install multiple skills at once:**

```bash
npx skillcn add frontend-design data-analyzer
```

**List available skills:**

```bash
npx skillcn list
```

**Preview installation (dry run):**

```bash
npx skillcn add frontend-design --dry-run
```

## How It Works

When you install a skill:

1. `skillcn` copies the skill files to your project's `.agents/skills` directory
2. Each skill contains its implementation, documentation, and configuration
3. Your AI agent can now use that skill's capabilities

```bash
your-project/
├── .agents/
│   └── skills/
│       └── frontend-design/
│           └── SKILL.md
│       └── web-scraper/
│           └── SKILL.md
├── src/
└── package.json
```

## Available Commands

| Command                         | Description                     |
| ------------------------------- | ------------------------------- |
| `skillcn add <skill> [...]`     | Install one or more skills      |
| `skillcn list` or `skillcn ls`  | List all available skills       |
| `skillcn add <skill> --dry-run` | Preview what would be installed |

## Contributing

We welcome contributions! Whether it's:

- 🆕 Adding new skills
- 🐛 Fixing bugs
- 📖 Improving documentation
- 💡 Suggesting features

Please see [Contributing.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Creating a New Skill

Have an idea for a skill? Check out our [Skill Creation Guide](CONTRIBUTING.md#creating-skills) to learn how to:

1. Structure your skill
2. Write documentation
3. Submit it to the collection

## Security

If you discover any security related issues, please email author instead of using the issue tracker.

## Changelog

Please see the [Changelog](CHANGELOG.md) for more information on what has changed recently.

## Acknowledgments

Built with:

- [tsdown](https://tsdown.dev/) - The Elegant Library Bundler
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Clack](https://github.com/natemoo-re/clack) - Beautiful prompts
- [Picocolors](https://github.com/alexeyraspopov/picocolors) - Tiny colors library

## License

Please see the [LICENSE](LICENSE) for more information.

[npm]: https://www.npmjs.com/package/skillcn
[version-badge]: https://img.shields.io/npm/v/skillcn.svg
[downloads-badge]: https://img.shields.io/npm/dt/skillcn
[github-actions]: https://github.com/mhdcodes/skillcn/actions/workflows/build.yml
[github-actions-badge]: https://github.com/mhdcodes/skillcn/actions/workflows/build.yml/badge.svg?branch=main
[typescript-badge]: https://img.shields.io/npm/types/skillcn
[makepr]: https://makeapullrequest.com
[makepr-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[biome]: https://biomejs.dev
[biome-badge]: https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome
