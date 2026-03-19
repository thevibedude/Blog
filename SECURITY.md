# Security

## Reporting a Vulnerability

If you find a security issue in this project,
please email: thevibedude01@gmail.com

Do not open a public GitHub issue for
security vulnerabilities.

## Implemented Security Measures

- Security headers via next.config.ts
- Contact form rate limiting (3 req/hour/IP)
- Input validation and sanitisation
- Honeypot spam protection
- No sensitive data in client components
- Path traversal protection on MDX routes
- CORS protection on API routes
- Environment variables never committed to git
