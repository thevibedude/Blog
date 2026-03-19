# Adding Images to Blog Posts

## Setup (one time)
1. Create free account at cloudinary.com
2. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   to .env.local and Vercel env vars

## Adding a screenshot to a post

### Step 1 — Upload to Cloudinary
- Go to cloudinary.com → Media Library
- Create folder: blog/YYYY-MM/
- Upload your screenshot
- Copy the "Public ID" (e.g. blog/2026-03/snapgrok-ui)

### Step 2 — Use in MDX

Option A — Cloudinary image (recommended):
  <BlogImage
    src="blog/2026-03/snapgrok-ui"
    alt="SnapSense AI dashboard screenshot"
    caption="the dashboard after 3 hours of building"
  />

Option B — Standard markdown (also works):
  ![SnapSense AI dashboard](blog/2026-03/snapgrok-ui)

Option C — Local image (only for static assets
that will never change, like the logo):
  ![logo](/images/logo.png)

## Folder naming convention
  blog/YYYY-MM/post-slug-description
  e.g. blog/2026-03/snapsense-first-wireframe

## Never commit images to git
All post screenshots go to Cloudinary.
Only /public/images/logo* and favicon
should be in the git repo.
