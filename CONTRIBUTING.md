# Contributing to Andrew Hermann Blog

Thank you for considering contributing to this project! Here's how you can help.

## Code of Conduct

This project adheres to a professional code of conduct. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs
- Use the "Bug Report" issue template
- Include detailed steps to reproduce the issue
- Provide browser and system information
- Include relevant error messages or screenshots

### Suggesting Features
- Use the "Feature Request" issue template
- Clearly describe the problem you're trying to solve
- Explain why this feature would be useful
- Consider the scope and complexity of the request

### Security Vulnerabilities
- Follow the security policy in SECURITY.md
- Do NOT create public issues for critical security vulnerabilities
- Contact the repository owner directly for sensitive issues

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher
- SQLite 3

### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/andrewhermann-blog.git`
3. Install dependencies: `npm install`
4. Start development server: `npm start`
5. Start backend server: `npm run start-backend`

### Project Structure
```
├── src/                 # Frontend React application
├── backend/            # Node.js API server
├── public/             # Static assets
├── build/              # Production build output
└── .github/            # GitHub configuration
```

## Development Guidelines

### Code Style
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (add, fix, update, remove)
- Reference issue numbers when applicable
- Example: "Fix admin login port configuration (#8)"

### Branch Naming
- `feature/issue-number-short-description`
- `bugfix/issue-number-short-description`
- `hotfix/critical-issue-description`

### Testing
- Test your changes thoroughly
- Verify functionality across different browsers
- Check both frontend and backend components
- Ensure no regressions in existing features

## Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/123-new-feature
   ```

2. **Make Changes**
   - Follow the coding guidelines
   - Test your changes locally
   - Update documentation if needed

3. **Submit Pull Request**
   - Use the pull request template
   - Link related issues
   - Provide clear description of changes
   - Include screenshots for UI changes

4. **Review Process**
   - Address review feedback promptly
   - Make requested changes in separate commits
   - Ensure CI checks pass

## Issue Labels

We use the following labels to organize issues:

- **Priority**: `urgent`, `enhancement`
- **Type**: `bug`, `security`, `investigation`
- **Component**: `frontend`, `backend`, `admin`, `database`
- **Category**: `ui/ux`, `styling`, `architecture`, `seo`

## Release Process

This project follows semantic versioning (SemVer):
- **Patch** (1.0.x): Bug fixes, security patches
- **Minor** (1.x.0): New features, enhancements
- **Major** (x.0.0): Breaking changes

## Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Contact the repository owner

Thank you for contributing! 🚀
