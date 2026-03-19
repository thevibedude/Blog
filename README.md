This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment Checklist

## Vercel Settings to Verify Before Launch

[ ] All env vars set in Vercel dashboard
    (Settings → Environment Variables):
      GITHUB_TOKEN
      RESEND_API_KEY
      NEXT_PUBLIC_SITE_URL
      CONTACT_EMAIL

[ ] Production branch is set to 'main'
    (not a dev or staging branch)

[ ] Preview deployments are enabled for
    non-main branches (safe to leave on)

[ ] No sensitive env vars have
    "Preview" environment checked —
    only "Production" for secrets

[ ] Custom domain added and verified
    in Vercel → Settings → Domains

[ ] Force HTTPS enabled (on by default
    in Vercel — verify it is not disabled)

[ ] Vercel Analytics enabled
    (Settings → Analytics → Enable)

## Anonymous Git Commits
To commit without exposing identity:

  git config user.name "thevibedude"
  git config user.email "thevibedude01@gmail.com"
