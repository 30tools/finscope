# Contributing to FinScope

Thank you for your interest in contributing to FinScope! We welcome contributions from the community to help make this project better.

## 🤝 How to Contribute

### 1. Reporting Bugs
If you find a bug, please create a new issue on GitHub describing the problem. Include as much detail as possible:
-   Steps to reproduce
-   Expected behavior
-   Actual behavior
-   Screenshots (if applicable)

### 2. Suggesting Enhancements
Have an idea for a new feature or improvement? Open an issue with the "enhancement" label. Explain why this feature would be useful.

### 3. Pull Requests
We follow the standard GitHub Fork & Pull Request workflow.

1.  **Fork** the repository.
2.  **Clone** your fork locally.
3.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```
4.  **Make your changes**. Ensure you follow the coding standards below.
5.  **Commit** your changes with meaningful messages:
    ```bash
    git commit -m "feat: Add new social share component"
    ```
6.  **Push** to your fork:
    ```bash
    git push origin feature/amazing-feature
    ```
7.  **Open a Pull Request** against the `main` branch of the original repository.

## 💻 Coding Standards

-   **TypeScript**: Use TypeScript for all new components and logic. Avoid `any` types whenever possible.
-   **Tailwind CSS**: Use utility classes for styling. Avoid custom CSS unless absolutely necessary.
-   **Components**: Keep components small, focused, and reusable. Place them in the `components/` directory.
-   **Naming**: Use PascalCase for components (`MyComponent.tsx`) and camelCase for functions/variables.
-   **Linting**: Run `npm run lint` before committing to ensure there are no errors.

## 📝 Content Guidelines

If you are contributing content (MDX files):

-   Ensure frontmatter is complete and correct.
-   Use proper Markdown formatting.
-   Images should be optimized and placed in the `public/images` directory.
-   Verify that the content builds successfully with `npm run build`.

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License of this project.
