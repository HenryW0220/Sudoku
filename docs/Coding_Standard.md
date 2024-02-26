# Coding Standard

## Part 0 · Document Log

| Date       | Remarks                                   |
|------------|-------------------------------------------|
| 2024-02-18 | Initial draft of coding standard          |
| 2024-02-25 | Added specific standards for React, Python, and SQL |

## Part 1 · File Format Standards

### File Editing

**File Format:** `UTF-8 with signature`

**File Operation:** Do not use Windows `Notepad` to edit any text files!

### Project Development

**Notice · 1:** It's advisable to prepare the `commit` messages in advance, similar to the rationale behind writing `unit tests`.

**Notice · 2:** If it's found that the work exceeds the anticipated remarks, stash the current changes and start a new branch to address the unexpected issues.

### File Upload

**Upload Instructions:** Use `Readable English` for all remarks.

**Upload Instructions:** For instance, `git commit -m "add Class(TagSystem) > Function(addTag)"`

## Part 2 · Code Style Standards

| Remarks                | Standards                                         |
|------------------------|---------------------------------------------------|
| **Indentation**        | 4 spaces                                          |
| **Line Width**         | 150 characters                                    |
| **Brackets**           | Use brackets to highlight priority in complex expressions |
| **Braces and Whitespace** | Braces should stand alone on their line          |
| **Line Splitting**     | One statement per line, split variable definitions|

## Part 3 · Code Naming Standards

| Remarks        | Standards                                         |
|----------------|---------------------------------------------------|
| **Underscores**| Use underscores to separate scope annotations from variable semantics, member variables `m_` |
| **Case**       | Use **PascalCase** for all types/classes/function names, and **camelCase** for all variable names. |

## Part 4 · Code Design Standards

### Functions

- **Principle:** Do one thing, and do it well.
- **Preference:** Preferably a single exit point.

### Goto

- Can be used for clarity in program logic, but use sparingly.

### Error Handling

- In **Debug** version, validate all parameters for correctness.
- In **Release version,** validate correctness for parameters passed from external sources (external modules, users).

### Virtual Functions

- Use virtual functions to achieve polymorphism.
- Use virtual functions only when necessary.
- For a class implementing polymorphism -> Base class destructor should be virtual (to avoid pitfalls).

### Constructors

- Keep it simple, avoid complex operations.
- Should not return errors.

### Destructors

- Place all cleanup tasks within the destructor.
- Resources that are released early should be set to NULL or 0.
- Should not fail.

### Operators

- Overload operators only when necessary, otherwise, use member functions.

### Exception Handling

- Do not use exceptions as a primary flow control mechanism in the program's logic.

### Type Inheritance

- Inherit only when necessary.
- Use `const` to denote read-only parameters.
- Use `const` to denote functions that do not change the data.

## Part 5 · Language-Specific Standards

### 5.1 React (JavaScript/TypeScript)

### Component Structure
- Organize files using a logical structure, with components in separate files and a clear hierarchy.
- Prefer functional components with hooks for state management and side effects.

### JSX Formatting
- Use PascalCase for component names and camelCase for props.
- Keep JSX as clean and simple as possible, extracting complex logic to functions outside the return statement.

### State Management
- Use `useState` for local state and Context API or Redux for global state management.
- Clearly document the purpose of each state variable.

### Hooks
- Follow the Rules of Hooks: only call hooks at the top level of a function component or custom hook.
- Use `useEffect` for side effects, with dependencies array correctly specified.

### Event Handling
- Name event handlers as `handleSubjectVerb`, e.g., `handleButtonClick`.
- Pass functions directly to event handlers rather than wrapping them in anonymous functions to avoid unnecessary re-renders.

### Styling
- Prefer CSS modules or styled-components for styling to avoid style conflicts and enhance maintainability.

### Code Splitting
- Utilize `React.lazy` for component-level code splitting to improve application loading time.

### Accessibility
- Ensure accessibility by using semantic HTML elements and ARIA attributes where necessary.

### Performance Optimization
- Use `React.memo`, `useCallback`, and `useMemo` wisely to optimize performance, avoiding premature optimization.

### Testing
- Write unit tests for components using libraries like Jest and React Testing Library.

### Documentation
- Document components with PropTypes or TypeScript interfaces for props validation.
- Use JSDoc comments for complex logic and hooks.

#### File Structure

- Organize components into separate folders (e.g., `components/`, `views/`, `utils/`).
- Use a consistent naming convention for files (e.g., `CamelCase` for components).

#### Component Design

- Prefer functional components with hooks over class components.
- Keep components small and focused on a single responsibility.

#### Styling

- Use Tailwind CSS for styling, leveraging utility classes to maintain consistency across the application.

#### State Management

- Manage local component state with React's `useState`.
- For global state, consider using Context API or a state management library like Redux.

#### TypeScript Specific

- Strongly type component props and state.
- Use interfaces for complex data structures.

### 5.2 Python (Flask)


### Style Guide
- Adhere to PEP 8 for code formatting, including the use of 4 spaces for indentation, line length up to 79 characters.

### Docstrings
- Use triple double quotes for docstrings to provide a concise summary of the function or class purpose and parameters.

### Imports
- Group imports into standard library, third-party, and local application/library specific, separated by blank lines.

### Exception Handling
- Use try-except blocks to handle exceptions gracefully, specifying exception types.

### List Comprehensions
- Prefer list comprehensions and generator expressions for concise and readable transformation of lists.

### Type Annotations
- Use type hints for function parameters and return values to improve code clarity.

### Resource Management
- Use the `with` statement for resource management, ensuring resources are properly released even if an error occurs.

### Testing
- Write tests using `unittest` or `pytest`, striving for comprehensive coverage.

### Documentation
- Document public functions, classes, and modules with clear docstrings. Maintain an up-to-date `README.md` for projects.

#### Code Structure

- Follow PEP 8 style guide for Python code.
- Organize the application logic into modules and packages.

#### Flask-Specific

- Use Blueprints for modular application development.
- Apply Flask extensions appropriately (e.g., Flask-SQLAlchemy for ORM).

#### Error Handling

- Use try-except blocks to handle exceptions gracefully.
- Validate request data rigorously before processing.

### 5.3 SQL (MySQL)

#### Schema Design

- Use descriptive names for tables and columns, following a consistent naming convention (e.g., snake_case).
- Define foreign keys for relationships between tables.

#### Queries

- Avoid using `SELECT *`; specify column names to improve query performance.
- Use prepared statements or parameterized queries to prevent SQL injection.

#### Indexing

- Apply indexes judiciously to improve performance on frequent operations.

## Conclusion

Adhering to these coding standards will help ensure our projects are not only consistent and easy to maintain but also secure and efficient. Developers are encouraged to contribute to these standards by suggesting improvements or updates based on new learnings and industry practices.

## End.
