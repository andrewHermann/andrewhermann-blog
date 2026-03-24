# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### For Non-Critical Vulnerabilities
- Create a GitHub issue using the "Security Vulnerability" template
- Include as much detail as possible about the vulnerability
- We will respond within 48 hours

### For Critical Vulnerabilities
- **DO NOT** create a public GitHub issue
- Email the repository owner directly at: andrew.hermann76@gmail.com
- Include "SECURITY VULNERABILITY" in the subject line
- Provide detailed information about the vulnerability
- We will respond within 24 hours

## Security Measures

This project implements the following security measures:

### Authentication & Authorization
- Session-based authentication for admin access
- Role-based access control (RBAC) — admin, blogger, reader
- Password hashing using bcrypt
- Session cookie hardened: `httpOnly`, `sameSite: strict`, `secure` in production
- Persistent session store (SQLite) — no in-memory session data loss on restart

### API Security
- Input validation and sanitization on all write endpoints
- SQL injection prevention (parameterised queries throughout)
- CORS configured to allowed origins only
- Rate limiting: 10 req/15min on login, 100 req/15min on admin endpoints
- CSRF defense-in-depth: `X-Requested-With` custom header required on all state-changing requests

### Infrastructure Security
- Nginx reverse proxy with security headers
- SSL/TLS encryption
- Fail2ban for intrusion prevention
- Regular security updates

### Development Security
- Dependency vulnerability scanning
- Code security analysis
- Automated security testing in CI/CD

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. 

- Critical vulnerabilities: Patch released within 24-48 hours
- High severity vulnerabilities: Patch released within 1 week
- Medium/Low severity vulnerabilities: Included in next regular release

## Contact

For security-related questions or concerns:
- Email: andrew.hermann76@gmail.com
- GitHub: @andrewHermann

Thank you for helping keep our project secure!
