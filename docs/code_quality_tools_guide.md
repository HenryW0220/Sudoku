
# Code Quality Tools Configuration Guide

This guide outlines the recommended tools and configurations for maintaining code quality in projects using React, Python, and MySQL.

## React (JavaScript/TypeScript)

### Linter: ESLint

- Designed for JavaScript and TypeScript, with support for React.
- Use `eslint-plugin-react` for React-specific rules.

### Formatter: Prettier

- Supports JavaScript, TypeScript, and JSX.

### Installation and Configuration

```bash
npm install eslint eslint-plugin-react prettier --save-dev
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

#### `.eslintrc.json` Example Configuration

```json
{
  "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

#### `.prettierrc` Example Configuration

```json
{
  "semi": true,
  "singleQuote": true
}
```

## Python

### Linter: Flake8 / Pylint

- Flake8 is a good lightweight choice that's easy to get started with.
- Pylint offers more in-depth code analysis but is more complex to configure and use.

### Formatter: Black / autopep8

- Black offers no-configuration code formatting, aiming for code style consistency.
- autopep8 is based on PEP 8, the official Python coding standard, and automatically formats code.

### Installation

```bash
pip install flake8 black
# Or
pip install pylint autopep8
```

### Integration into Development Environment

- Integrate Flake8 and Black into your IDE (e.g., PyCharm, VSCode) for real-time feedback.

## MySQL

For MySQL, traditional linters and formatters are not commonly used. However, adopting SQL coding standards for consistency and readability is recommended. Use migration tools like Flyway or Liquibase for database version control and collaboration.

## Version Control Integration

Use pre-commit hooks in Git to automatically run the above tools before code commits.

### Installing Husky (For JavaScript/TypeScript projects)

```bash
npm install husky --save-dev
```

#### Configure pre-commit hook in `package.json`

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint . && prettier --check . && flake8 && black --check ."
    }
  }
}
```

For Python code, you may need to run `flake8` and `black` within a virtual environment or activate the virtual environment in the Git hook script.

## Continuous Integration (CI)

Add steps in your CI process (e.g., GitHub Actions, GitLab CI/CD) to run these tools, ensuring all commits and pull requests meet coding standards.

## Conclusion

By selecting appropriate tools and standards for each technology stack, you can effectively maintain code quality, facilitate team collaboration, and accelerate development processes. Ensure these tools and standards are integrated and enforced early in the project to build a stable and maintainable code base.
