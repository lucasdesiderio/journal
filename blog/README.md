# Blog Structure

This folder is now wired into an Eleventy static site while staying Markdown-first and portable.

## Goals
- Keep content portable and easy to read in plain Markdown.
- Separate published posts from drafts.
- Use front matter so future static site generators can read metadata.
- Keep URLs stable with a `slug`.

## Structure
- `posts/`: published articles
- `drafts/`: work in progress
- `pages/`: evergreen pages like `about` or `now`
- `tags/`: optional tag landing pages
- `templates/`: reusable content templates

## Naming Convention
- Prefer one file per post.
- Use kebab-case filenames.
- Keep the date in the front matter instead of the filename so the content stays portable across generators.

Example:

```text
blog/posts/my-first-post.md
```

## Front Matter
Each content file starts with YAML front matter:

```yaml
---
title: My First Post
slug: my-first-post
date: 2026-04-12
updated:
status: published
summary: A short one-sentence description of the post.
tags:
  - writing
  - notes
series:
canonical_url:
cover_image:
---
```

Suggested fields:
- `title`: post title
- `slug`: future URL segment
- `date`: publication date
- `updated`: optional last update date
- `status`: `published` or `draft`
- `summary`: short description for indexes and social cards
- `tags`: list of related topics
- `series`: optional grouping for multi-part posts
- `canonical_url`: optional canonical URL when cross-posting
- `cover_image`: optional hero image path or URL

## Writing Flow
1. Start in `drafts/`.
2. Refine the content.
3. Move the file to `posts/` when it is ready.
4. Update `status` to `published`.

## Eleventy Wiring
- `package.json`: project scripts and the Eleventy dependency
- `.eleventy.js`: collections, filters, passthrough copy, and directory config
- `posts/posts.11tydata.js`: applies the post layout and `/posts/<slug>/` permalinks
- `pages/pages.11tydata.js`: applies the page layout and `/<slug>/` permalinks
- `drafts/drafts.11tydata.js`: keeps drafts out of production output
- `_includes/layouts/`: shared Nunjucks layouts
- `assets/site.css`: site styling
- `index.njk`: homepage listing posts and pages

## Run It
1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Build the site with `npm run build`

The generated site goes to `_site/`.
