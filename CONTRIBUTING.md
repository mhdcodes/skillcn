# 👨🏼‍💻 Contributing

I would love your help to improve this project! Here are a few ways to contribute, and some guidelines to help you along the way.

## 🐛 Issues

If you come across any bugs or something that doesn't seem right, please [open an issue](https://github.com/mhdcodes/skillcn/issues). Also, if you have an idea for the project, open an issue to start the discussion.

When possible, please include a link to a `git` repository or a CodeSandbox which illustrates the problem you're facing. This is especially important when you find a bug.

## 🔃 Pull requests

Yes, I accept pull requests! You can submit a pull request to fix a bug, implement a feature, add tests, or improve the documentation.

## Working on your first Pull Request?

You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request)

## 🦋 Changesets

We use the [Changesets](https://github.com/changesets/changesets) library to manage versioning in this project. As part of your pull request (PR) submission, it is essential to include a corresponding changeset detailing the modifications made. Changesets help us keep track of version updates and ensure transparent communication regarding changes introduced to the codebase.

To include a changeset in your PR:

1. Create a changeset using the following command within your project directory:

   ```bash
   pnpm changesets
   ```

2. Follow the prompts to describe the changes introduced in your PR. Ensure the changeset adheres to our contribution guidelines.

3. Commit the changeset file(s) along with your code changes.

Including changesets in your PR demonstrates transparency and facilitates smoother version management. PRs lacking corresponding changesets may be subject to additional review or may not be merged until changesets are provided.

For more information on using Changesets, refer to the official documentation.

## 🛠️ Creating Skills

This guide will help you create and submit a new skill to the `skillcn` collection.

### What is a Skill?

A skill is a reusable, modular component that provides AI agents with specific capabilities. Each skill is self-contained and includes documentation, configuration, and implementation details.

### Skill Structure

Each skill should be placed in the `./src/skills/` directory with the following structure:

```bash
./src/skills/
└── your-skill-name/
    ├── SKILL.md          # Documentation and usage instructions
    └── ...               # Any additional files needed by the skill
```

### Creating a New Skill

1. **Create the skill directory**

   Create a new folder under `./src/skills/` with a descriptive, kebab-case name:

   ```bash
   mkdir ./src/skills/my-new-skill
   ```

2. **Write the SKILL.md file**

   Every skill must have a `SKILL.md` file that includes:
   - **Description**: What the skill does and when to use it
   - **Requirements**: Any prerequisites or dependencies
   - **Usage**: How to use the skill with examples
   - **Configuration**: Available options and parameters
   - **Examples**: Practical examples demonstrating the skill

   Example SKILL.md structure:

   ```markdown
   # My New Skill

   Brief description of what this skill does.

   ## Requirements

   - List any dependencies
   - System requirements
   - API keys needed

   ## Usage

   Explain how to use the skill.

   ## Configuration

   | Option | Type   | Default | Description |
   | ------ | ------ | ------- | ----------- |
   | option | string | -       | Description |

   ## Examples

   ### Example 1: Basic Usage

   Show a simple example.

   ### Example 2: Advanced Usage

   Show a more complex example.
   ```

3. **Test your skill**

   Before submitting, test that your skill:
   - Follows the documentation correctly
   - Works as described
   - Has clear and accurate examples

4. **Submit your skill**
   - Fork the repository
   - Create a new branch for your skill
   - Add your skill files
   - Include a changeset describing your new skill
   - Submit a pull request

### Best Practices

- **Be descriptive**: Use clear names and detailed documentation
- **Keep it focused**: Each skill should do one thing well
- **Provide examples**: Include practical, real-world examples
- **Document thoroughly**: Explain all configuration options
- **Follow conventions**: Use kebab-case for skill names
- **Test before submitting**: Ensure everything works as documented

### Review Process

Submitted skills will be reviewed for:

- Code quality and best practices
- Documentation completeness
- Accuracy of examples
- Adherence to project conventions

Once approved, your skill will be available for the community to use!
